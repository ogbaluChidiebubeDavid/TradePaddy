"""Historical backtest path for TradePaddy Adaptive Regime Playbook."""
import json
import math
from pathlib import Path
from typing import Any

from getagent import backtest, data, runtime


def _sanitize(value: Any) -> Any:
    if isinstance(value, float) and not math.isfinite(value):
        return None
    return value


def _sanitize_metrics(metrics: dict[str, Any]) -> dict[str, Any]:
    return {key: _sanitize(val) for key, val in metrics.items()}


def _write_equity_curve(out_dir: Path, raw: dict[str, Any], starting_balance: float) -> None:    reports = raw.get("reports") or {}
    curve = reports.get("equity_curve") or raw.get("equity_curve") or []
    lines = ["timestamp,value,nav"]
    if isinstance(curve, list) and curve:
        for point in curve:
            if not isinstance(point, dict):
                continue
            ts = point.get("timestamp") or point.get("time") or ""
            value = point.get("value") or point.get("equity") or point.get("balance")
            nav = point.get("nav")
            if nav is None and value is not None and starting_balance:
                try:
                    nav = float(value) / starting_balance
                except (TypeError, ValueError):
                    nav = ""
            lines.append(f"{ts},{value},{nav if nav is not None else ''}")
    else:
        lines.append(f"{raw.get('period_start', '')},{starting_balance},1.0")
    (out_dir / "equity_curve.csv").write_text("\n".join(lines) + "\n", encoding="utf-8")


def run() -> None:
    cfg = runtime.manifest.get("strategy_config", {}) or {}
    symbols = cfg.get("trading_symbols") or ["BTCUSDT"]
    symbol = symbols[0]
    margin_budget = float(cfg.get("margin_budget") or 100)

    spec = runtime.backtest_spec or {}

    bars = data.crypto.futures.kline(
        symbol=symbol,
        interval="1h",
        limit=1000,
    )
    replay_frame = backtest.prepare_frame(bars, datetime_index="date")

    if replay_frame.empty:
        runtime.emit_signal(
            action="watch",
            symbol=symbol,
            confidence=0.0,
            metrics={"rows": 0},
            meta={"reason": "no historical bars returned"},
        )
        return

    instrument_key = f"{symbol}.BINANCE"
    result = backtest.run(
        ohlcv_data={instrument_key: replay_frame},
        spec=runtime.backtest_spec,
    )

    chart_path = backtest.generate_chart(result)
    summary = result.summary or {}
    raw = dict(result.raw or {})
    reports = dict(raw.get("reports") or {})
    reports.pop("equity_curve", None)
    raw["reports"] = reports

    starting_balance = float(summary.get("starting_balance") or margin_budget)
    net_pnl_raw = summary.get("net_pnl", 0)
    try:
        net_pnl = float(net_pnl_raw or 0)
    except (TypeError, ValueError):
        net_pnl = 0.0

    strategy_return_pct = (net_pnl / margin_budget * 100.0) if margin_budget else 0.0
    raw["net_pnl"] = round(net_pnl, 4)
    raw["total_return_pct"] = round(strategy_return_pct, 4)
    raw["starting_balance"] = starting_balance

    out_dir = Path("/workspace/output")
    out_dir.mkdir(parents=True, exist_ok=True)
    (out_dir / "backtest_report.json").write_text(json.dumps(raw, default=str), encoding="utf-8")
    _write_equity_curve(out_dir, dict(result.raw or {}), starting_balance)

    action = "long" if net_pnl > 0 else "watch"
    metrics = _sanitize_metrics(
        {
            "total_return_pct": round(strategy_return_pct, 4),
            "net_pnl": round(net_pnl, 4),
            "starting_balance": starting_balance,
            "sharpe_ratio": result.sharpe_ratio,
            "max_drawdown_pct": result.max_drawdown_pct,
            "win_rate": result.win_rate,
            "total_trades": result.total_trades,
            "profit_factor": result.profit_factor,
            "rows": len(replay_frame),
        }
    )

    runtime.emit_signal(
        action=action,
        symbol=symbol,
        confidence=_sanitize(result.win_rate) or 0.0,
        metrics=metrics,
        meta={
            "chart_path": chart_path,
            "fast_period": cfg.get("fast_period"),
            "slow_period": cfg.get("slow_period"),
            "bb_period": cfg.get("bb_period"),
            "bb_std": cfg.get("bb_std"),
            "adx_period": cfg.get("adx_period"),
            "trend_threshold": cfg.get("trend_threshold"),
            "range_threshold": cfg.get("range_threshold"),
            "rsi_period": cfg.get("rsi_period"),
            "rsi_overbought": cfg.get("rsi_overbought"),
            "rsi_oversold": cfg.get("rsi_oversold"),
        },
    )
