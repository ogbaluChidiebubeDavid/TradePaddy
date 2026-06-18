from decimal import Decimal
from typing import Optional
import numpy as np

from nautilus_trader.config import StrategyConfig
from nautilus_trader.model.data import Bar, BarType
from nautilus_trader.model.enums import OrderSide, TimeInForce
from nautilus_trader.model.identifiers import InstrumentId
from nautilus_trader.model.instruments import Instrument
from nautilus_trader.model.objects import Quantity
from nautilus_trader.trading.strategy import Strategy


class AdaptiveRegimeStrategyConfig(StrategyConfig):
    instrument_id: Optional[InstrumentId] = None
    bar_type: Optional[BarType] = None
    instrument_ids: tuple[InstrumentId, ...] = ()
    bar_types: tuple[BarType, ...] = ()
    trade_size: str = "0.1"
    fast_period: int = 10
    slow_period: int = 30
    bb_period: int = 20
    bb_std: float = 2.0
    adx_period: int = 14
    trend_threshold: float = 25.0
    range_threshold: float = 20.0
    rsi_period: int = 14
    rsi_overbought: float = 70.0
    rsi_oversold: float = 30.0


class AdaptiveRegimeStrategy(Strategy):
    def __init__(self, config: AdaptiveRegimeStrategyConfig) -> None:
        super().__init__(config)
        self.cfg = config
        self._closes: list[float] = []
        self._highs: list[float] = []
        self._lows: list[float] = []
        self._position: str = "NONE"  # NONE, LONG, SHORT
        self._instrument: Optional[Instrument] = None

    def on_start(self) -> None:
        bar_type = self.cfg.bar_type or (
            self.cfg.bar_types[0] if self.cfg.bar_types else None
        )
        instrument_id = self.cfg.instrument_id or (
            self.cfg.instrument_ids[0] if self.cfg.instrument_ids else None
        )
        if bar_type is None or instrument_id is None:
            raise RuntimeError("bar_type and instrument_id must be set")
        self._instrument = self.cache.instrument(instrument_id)
        self.subscribe_bars(bar_type)

    def on_bar(self, bar: Bar) -> None:
        close = float(bar.close)
        high = float(bar.high)
        low = float(bar.low)
        self._closes.append(close)
        self._highs.append(high)
        self._lows.append(low)

        # Warm up period to have enough data for slow_ma, Bollinger Bands, and ADX
        warmup = max(self.cfg.slow_period, self.cfg.bb_period, self.cfg.adx_period * 2 + 10)
        if len(self._closes) < warmup:
            return

        # Technical Indicators calculation
        fast_ma = sum(self._closes[-self.cfg.fast_period:]) / self.cfg.fast_period
        slow_ma = sum(self._closes[-self.cfg.slow_period:]) / self.cfg.slow_period
        
        bb_mean = sum(self._closes[-self.cfg.bb_period:]) / self.cfg.bb_period
        bb_std_val = float(np.std(self._closes[-self.cfg.bb_period:]))
        bb_upper = bb_mean + self.cfg.bb_std * bb_std_val
        bb_lower = bb_mean - self.cfg.bb_std * bb_std_val

        rsi = self._calculate_rsi(self._closes[-self.cfg.rsi_period - 10:])
        adx = self._calculate_adx(
            self._highs[-self.cfg.adx_period * 3:],
            self._lows[-self.cfg.adx_period * 3:],
            self._closes[-self.cfg.adx_period * 3:]
        )

        is_trending = adx > self.cfg.trend_threshold
        is_ranging = adx < self.cfg.range_threshold

        target_position = "NONE"

        if is_trending:
            # Trend-following regime
            if fast_ma > slow_ma:
                target_position = "LONG"
            elif fast_ma < slow_ma:
                target_position = "SHORT"
        elif is_ranging:
            # Mean-reversion regime
            if rsi < self.cfg.rsi_oversold or close < bb_lower:
                target_position = "LONG"
            elif rsi > self.cfg.rsi_overbought or close > bb_upper:
                target_position = "SHORT"
            else:
                # Standard mean reversion exit: close when price reverts back to mean
                if self._position == "LONG" and close >= bb_mean:
                    target_position = "NONE"
                elif self._position == "SHORT" and close <= bb_mean:
                    target_position = "NONE"
                else:
                    target_position = self._position
        else:
            # Unclear market regime (stay flat)
            target_position = "NONE"

        # Trading executions
        instrument = self._instrument
        if instrument is None:
            return
        qty = Quantity(Decimal(self.cfg.trade_size), instrument.size_precision)

        if self._position != target_position:
            # Close active positions
            if self._position == "LONG":
                self._close_open(instrument.id, OrderSide.SELL)
            elif self._position == "SHORT":
                self._close_open(instrument.id, OrderSide.BUY)
            self._position = "NONE"

            # Open new positions
            if target_position == "LONG":
                self._submit(instrument.id, OrderSide.BUY, qty)
                self._position = "LONG"
            elif target_position == "SHORT":
                self._submit(instrument.id, OrderSide.SELL, qty)
                self._position = "SHORT"

    def _calculate_rsi(self, prices: list[float]) -> float:
        period = self.cfg.rsi_period
        if len(prices) < period + 1:
            return 50.0

        gains = []
        losses = []
        for i in range(1, len(prices)):
            diff = prices[i] - prices[i - 1]
            if diff > 0:
                gains.append(diff)
                losses.append(0.0)
            else:
                gains.append(0.0)
                losses.append(-diff)

        # Initial Wilder's average
        avg_gain = sum(gains[:period]) / period
        avg_loss = sum(losses[:period]) / period

        for i in range(period, len(gains)):
            avg_gain = (avg_gain * (period - 1) + gains[i]) / period
            avg_loss = (avg_loss * (period - 1) + losses[i]) / period

        if avg_loss == 0.0:
            return 100.0
        rs = avg_gain / avg_loss
        return 100.0 - (100.0 / (1.0 + rs))

    def _calculate_adx(self, highs: list[float], lows: list[float], closes: list[float]) -> float:
        period = self.cfg.adx_period
        n = len(closes)
        if n < period * 2 + 1:
            return 20.0

        tr_all = []
        dm_plus_all = []
        dm_minus_all = []

        for i in range(1, n):
            h = highs[i]
            l = lows[i]
            pc = closes[i - 1]
            ph = highs[i - 1]
            pl = lows[i - 1]

            tr = max(h - l, abs(h - pc), abs(l - pc))
            tr_all.append(tr)

            dp = h - ph
            dm = pl - l

            if dp > dm and dp > 0:
                dm_plus_all.append(dp)
            else:
                dm_plus_all.append(0.0)

            if dm > dp and dm > 0:
                dm_minus_all.append(dm)
            else:
                dm_minus_all.append(0.0)

        # Smoothed averages
        tr_smooth = sum(tr_all[:period])
        dm_plus_smooth = sum(dm_plus_all[:period])
        dm_minus_smooth = sum(dm_minus_all[:period])

        dx_all = []
        for i in range(period - 1, len(tr_all)):
            if i >= period:
                tr_smooth = tr_smooth - (tr_smooth / period) + tr_all[i]
                dm_plus_smooth = dm_plus_smooth - (dm_plus_smooth / period) + dm_plus_all[i]
                dm_minus_smooth = dm_minus_smooth - (dm_minus_smooth / period) + dm_minus_all[i]

            if tr_smooth == 0:
                di_plus = 0.0
                di_minus = 0.0
            else:
                di_plus = 100.0 * (dm_plus_smooth / tr_smooth)
                di_minus = 100.0 * (dm_minus_smooth / tr_smooth)

            denom = di_plus + di_minus
            if denom == 0:
                dx = 0.0
            else:
                dx = 100.0 * abs(di_plus - di_minus) / denom
            dx_all.append(dx)

        if len(dx_all) < period:
            return 20.0

        adx = sum(dx_all[:period]) / period
        for i in range(period, len(dx_all)):
            adx = (adx * (period - 1) + dx_all[i]) / period

        return adx

    def _submit(
        self,
        instrument_id: InstrumentId,
        side: OrderSide,
        quantity: Quantity,
    ) -> None:
        order = self.order_factory.market(
            instrument_id=instrument_id,
            order_side=side,
            quantity=quantity,
            time_in_force=TimeInForce.GTC,
        )
        self.submit_order(order)

    def _close_open(self, instrument_id: InstrumentId, side: OrderSide) -> None:
        for position in self.cache.positions_open(instrument_id=instrument_id):
            self._submit(instrument_id, side, position.quantity)

    def on_stop(self) -> None:
        if self._instrument is not None:
            self.cancel_all_orders(self._instrument.id)
            self.close_all_positions(self._instrument.id)
