"""Live / scheduled signal path for TradePaddy Adaptive Regime Playbook."""
from getagent import data, runtime


def run() -> None:
    cfg = runtime.manifest.get("strategy_config", {}) or {}
    symbols = cfg.get("trading_symbols") or ["BTCUSDT"]
    symbol = symbols[0]

    bars = data.crypto.futures.kline(symbol=symbol, interval="1h", limit=120)
    if not bars:
        runtime.emit_signal(
            action="watch",
            symbol=symbol,
            confidence=0.0,
            metrics={"rows": 0},
            meta={"reason": "no live bars returned"},
        )
        return

    runtime.emit_signal(
        action="watch",
        symbol=symbol,
        confidence=0.5,
        metrics={"rows": len(bars), "mode": "live"},
        meta={
            "message": "Adaptive regime strategy active — run historical backtest for full metrics",
            "fast_period": cfg.get("fast_period"),
            "slow_period": cfg.get("slow_period"),
        },
    )
