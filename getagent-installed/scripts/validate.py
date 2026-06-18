#!/usr/bin/env python3
"""Playbook package Local validation script。

Usage:
    conda activate get_agent_test
    python scripts/validate.py ./my-strategy/

Checks:
    1. Directory structure complete（manifest.yaml, src/main.py）
    2. manifest.yaml Required fields and public contract
    3. optional backtest.yaml shape
    4. all Python files under src/ compile and pass the import allowlist
    5. Nautilus lifecycle calls match the runner's installed API
    6. local-only directories are not included in the upload package
"""

from __future__ import annotations

import ast
import re
import sys
from datetime import datetime
from pathlib import Path, PurePosixPath
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError

try:
    import yaml
except ImportError:
    print("WARNING: PyYAML not installed, falling back to basic parsing")
    yaml = None  # type: ignore[assignment]


REQUIRED_FILES = [
    "README.md",
    "manifest.yaml",
    "src/main.py",
]

MANIFEST_REQUIRED_FIELDS = [
    "name",
    "display_name",
    "version",
    "description",
    "long_description",
    "market_type",
    "trading_symbols",
    "decision_mode",
    "backtest_support",
    "runtime_profile",
    "execution_mode",
    "follow_trade_supported",
]

NAME_PATTERN = re.compile(r"^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$")
BACKTEST_BAR_FIELD_PATTERN = re.compile(r"^[a-z][a-z0-9_]*$")
PUBLIC_SYMBOL_TOKEN_PATTERN = re.compile(r"\b[A-Z0-9]{2,20}(?:USDT|USDC|USD|BTC|ETH)\b")
CRON_EVERY_MINUTES_PATTERN = re.compile(r"^\*/(\d+)$")
MIN_SCHEDULE_INTERVAL_MINUTES = 10
DEFAULT_SCHEDULE_TZ = "Asia/Shanghai"
DECISION_MODES = {"deterministic", "llm_assisted", "agentic"}
BACKTEST_SUPPORT_VALUES = {"full", "none"}
RUNTIME_PROFILES = {"deterministic", "llm_bounded", "agentic"}
EXECUTION_MODES = {"signal_only", "follow_trade"}
LOCAL_ONLY_TOP_LEVEL = {
    "tests",
    "notebooks",
    "research",
    "data",
    "backtest_results",
    "logs",
    "output",
    ".venv",
    "__pycache__",
    ".pytest_cache",
}

ALLOWED_IMPORTS = {
    "getagent", "getclaw", "nautilus_trader", "pandas", "numpy", "json", "math",
    "datetime", "pathlib", "asyncio", "typing",
    "dataclasses", "collections", "functools",
    "re", "decimal", "statistics", "itertools",
    "operator", "copy", "enum", "abc", "numbers",
    "fractions",
}

BACKTEST_INSTRUMENT_KINDS = {"spot", "currency_pair", "perpetual", "perpetual_contract", "perp"}
NAUTILUS_INSTRUMENT_REQUIRED_METHODS = {"cancel_all_orders", "close_all_positions"}
README_REQUIRED_PHRASES = ("策略", "开仓", "平仓", "风险")

LONG_DESCRIPTION_MIN_WORDS = 250
LONG_DESCRIPTION_MAX_WORDS = 500
LONG_DESCRIPTION_TARGET_RANGE = (300, 400)

LONG_DESCRIPTION_SECTION_KEYWORDS: tuple[tuple[str, tuple[str, ...]], ...] = (
    (
        "what it captures (§1 thesis)",
        (
            "capture", "captures", "tries to", "thesis", "aim", "aims",
            "objective", "designed", "seeks", "intended", "goal", "approach",
            "built on", "assumption", "purpose",
        ),
    ),
    (
        "entry logic (§2 entry)",
        (
            "enter", "enters", "entry", "entering", "opens", "go long",
            "go short", "going long", "going short", "long position",
            "short position",
        ),
    ),
    (
        "exit / stop logic (§3 exit)",
        (
            "exit", "exits", "close", "closes", "closing", "stop",
            "take profit", "take-profit", "stop-loss", "stop loss",
        ),
    ),
    (
        "tunable parameters (§4 tunables)",
        (
            "parameter", "parameters", "tunable", "leverage", "margin",
            "configurable", "adjust", "adjusts", "tune", "subscriber",
            "subscribers",
        ),
    ),
    (
        "risks / unsuitable conditions (§5 risks)",
        (
            "risk", "risks", "drawdown", "drawdowns", "lose money",
            "loses money", "lost money", "loss", "losses", "underperform",
            "underperforms", "unsuitable", "fails", "weakness", "worst",
            "warning",
        ),
    ),
)

LONG_DESCRIPTION_FORBIDDEN_PATTERNS: tuple[tuple[re.Pattern[str], str], ...] = (
    (
        re.compile(
            r"\b(?:EMA|SMA|WMA|MA|RSI|MACD|ATR|VWAP|ADX|Stoch(?:astic)?|Bollinger|MFI|CCI|OBV|DMI|TRIX|KDJ)"
            r"[\s_/-]*\d+",
            re.IGNORECASE,
        ),
        "indicator with a numeric period (e.g. 'EMA 12', 'RSI 14') leaks strategy parameters; "
        "describe the indicator category instead",
    ),
    (
        re.compile(
            r"\b\d+(?:\.\d+)?[\s/-]*"
            r"(?:bar|bars|candle|candles|period|periods|day|days|hour|hours|"
            r"minute|minutes|week|weeks|second|seconds|tick|ticks)\b",
            re.IGNORECASE,
        ),
        "numeric lookback window (e.g. '14 bars', '20 days', '5-minute') leaks strategy parameters; "
        "describe the timeframe qualitatively",
    ),
    (
        re.compile(r"(?<![\w.])(?:>=|<=|>|<|==)\s*-?\d"),
        "explicit numeric threshold (e.g. '> 30', '<= 0.7') leaks decision boundaries; "
        "describe direction without numbers",
    ),
    (
        re.compile(r"\b\d+(?:\.\d+)?\s*%"),
        "explicit percentage threshold (e.g. '3%', '10%') leaks decision boundaries; "
        "describe direction without numbers",
    ),
    (
        re.compile(r"\b\d+(?:\.\d+)?\s*x\b", re.IGNORECASE),
        "explicit multiplier (e.g. '1.5x', '10x') leaks parameter; describe behavior qualitatively",
    ),
    (
        re.compile(r"\b\d+\s*:\s*\d+\b"),
        "explicit ratio (e.g. '3:1', '2:1') leaks decision boundary; describe behavior qualitatively",
    ),
)
POSITION_SELECTION_HELPERS = {"select_contract_position", "find_contract_position"}
POSITION_SELECTION_INVALID_ATTRS = {
    "open_price",
    "openPrice",
    "entry_price",
    "entryPrice",
    "avg_price",
    "avgPrice",
    "average_open_price",
    "averageOpenPrice",
}
CONTRACT_ORDER_HELPERS = {
    "open_long_market",
    "open_short_market",
}
CONTRACT_TPSL_HELPER = "resolve_contract_tpsl"
CONTRACT_TPSL_HELPER_KEYWORDS = {
    "symbol",
    "side",
    "leverage",
    "tp_trigger_price",
    "sl_trigger_price",
    "reference_price",
    "product_type",
}
TRADE_MUTATION_METHODS = {
    "cancel_order",
    "change_leverage",
    "close_position",
    "market_buy",
    "market_sell",
    "modify_limit_order",
    "modify_stop_loss",
    "modify_take_profit",
    "open_long_limit",
    "open_long_market",
    "open_short_limit",
    "open_short_market",
    "place_order",
    "transfer",
}
CONTRACT_TRIGGER_PRICE_KEYWORDS = {"tp_trigger_price", "sl_trigger_price"}

BLOCKED_IMPORTS = {
    "requests", "httpx", "trade_sdk", "ccxt", "subprocess",
    "os", "sys", "importlib", "socket", "urllib",
    "http", "ftplib", "smtplib", "shutil",
    "sqlalchemy", "redis", "pymongo", "fastapi", "flask",
    "telegram", "slack_sdk", "discord", "multiprocessing",
}


class ValidationResult:
    def __init__(self) -> None:
        self.errors: list[str] = []
        self.warnings: list[str] = []

    def error(self, msg: str) -> None:
        self.errors.append(msg)

    def warn(self, msg: str) -> None:
        self.warnings.append(msg)

    @property
    def passed(self) -> bool:
        return len(self.errors) == 0


def _load_yaml(path: Path) -> dict | None:
    if yaml is None:
        return {}
    try:
        with open(path) as f:
            return yaml.safe_load(f) or {}
    except Exception:
        return None


def validate_structure(pkg_dir: Path, result: ValidationResult) -> None:
    for rel in REQUIRED_FILES:
        if not (pkg_dir / rel).exists():
            result.error(f"Missing required file: {rel}")

    for child in pkg_dir.iterdir():
        if child.name in LOCAL_ONLY_TOP_LEVEL:
            result.error(f"Local-only path must not be included in upload package: {child.name}")

    readme_path = pkg_dir / "README.md"
    if readme_path.exists():
        text = readme_path.read_text(encoding="utf-8", errors="ignore").strip()
        if len(text) < 200:
            result.error("README.md: must be a human-readable strategy explanation of at least 200 characters")
        missing = [phrase for phrase in README_REQUIRED_PHRASES if phrase not in text]
        if missing:
            result.error(f"README.md: missing required plain-language sections or keywords: {', '.join(missing)}")


def _validate_long_description(
    raw_value: object,
    description: str,
    result: ValidationResult,
) -> None:
    """Hard-fail manifest.long_description authoring rules.

    Rules:
      - present, string, non-empty
      - 250..500 words (target 300..400)
      - covers all 5 required sections by keyword cluster
      - does not leak indicator periods, lookback windows, numeric thresholds,
        percentages, multipliers, or ratios
      - is not a near-duplicate of `description`
    """

    if raw_value is None:
        return

    if not isinstance(raw_value, str):
        result.error("manifest.yaml: 'long_description' must be a string")
        return

    text = raw_value.strip()
    if not text:
        result.error("manifest.yaml: 'long_description' must not be empty")
        return

    word_count = len(text.split())
    if word_count < LONG_DESCRIPTION_MIN_WORDS:
        result.error(
            f"manifest.yaml: 'long_description' is {word_count} words; "
            f"must be at least {LONG_DESCRIPTION_MIN_WORDS} (target "
            f"{LONG_DESCRIPTION_TARGET_RANGE[0]}-{LONG_DESCRIPTION_TARGET_RANGE[1]})"
        )
    elif word_count > LONG_DESCRIPTION_MAX_WORDS:
        result.error(
            f"manifest.yaml: 'long_description' is {word_count} words; "
            f"must be at most {LONG_DESCRIPTION_MAX_WORDS} (target "
            f"{LONG_DESCRIPTION_TARGET_RANGE[0]}-{LONG_DESCRIPTION_TARGET_RANGE[1]})"
        )
    elif not (
        LONG_DESCRIPTION_TARGET_RANGE[0] <= word_count <= LONG_DESCRIPTION_TARGET_RANGE[1]
    ):
        result.warn(
            f"manifest.yaml: 'long_description' is {word_count} words; "
            f"target range is {LONG_DESCRIPTION_TARGET_RANGE[0]}-{LONG_DESCRIPTION_TARGET_RANGE[1]}"
        )

    for label, keywords in LONG_DESCRIPTION_SECTION_KEYWORDS:
        keyword_re = re.compile(
            r"\b(?:" + "|".join(re.escape(k) for k in keywords) + r")\b",
            re.IGNORECASE,
        )
        if not keyword_re.search(text):
            result.error(
                f"manifest.yaml: 'long_description' is missing required section coverage: {label}. "
                f"At least one of these must appear: {', '.join(keywords)}"
            )

    for pattern, reason in LONG_DESCRIPTION_FORBIDDEN_PATTERNS:
        match = pattern.search(text)
        if match:
            snippet = match.group(0)
            result.error(
                f"manifest.yaml: 'long_description' contains forbidden content {snippet!r}: {reason}"
            )

    if description and isinstance(description, str):
        d_norm = " ".join(description.lower().split())
        l_norm = " ".join(text.lower().split())
        if d_norm and (d_norm in l_norm) and len(d_norm) > 30 and len(l_norm) < 2 * len(d_norm):
            result.error(
                "manifest.yaml: 'long_description' appears to be a near-duplicate of 'description'; "
                "rewrite it as a 300-400 word strategy summary covering thesis, entry, exit, "
                "tunables, and risks"
            )


def validate_manifest(pkg_dir: Path, result: ValidationResult) -> dict:
    path = pkg_dir / "manifest.yaml"
    if not path.exists():
        return {}

    data = _load_yaml(path)
    if data is None:
        result.error("manifest.yaml: invalid YAML syntax")
        return {}

    for field in MANIFEST_REQUIRED_FIELDS:
        if field not in data:
            result.error(f"manifest.yaml: missing required field '{field}'")

    name = data.get("name", "")
    if name and not NAME_PATTERN.match(name):
        result.error(
            f"manifest.yaml: 'name' must be lowercase alphanumeric with hyphens "
            f"(DNS label format), got: '{name}'"
        )

    market_type = data.get("market_type", "")
    if market_type and market_type not in ("spot", "contract"):
        result.error(f"manifest.yaml: 'market_type' must be 'spot' or 'contract', got: '{market_type}'")

    symbols = data.get("trading_symbols", [])
    if not isinstance(symbols, list) or not all(isinstance(item, str) and item.strip() for item in symbols):
        result.error("manifest.yaml: 'trading_symbols' must be a non-empty list of strings")
    else:
        normalized_symbols = {str(item).strip().upper() for item in symbols}
        for field in ("display_name", "description"):
            text = str(data.get(field, "") or "")
            unknown_symbols = sorted(
                token
                for token in PUBLIC_SYMBOL_TOKEN_PATTERN.findall(text.upper())
                if token not in normalized_symbols
            )
            if unknown_symbols:
                result.error(
                    f"manifest.yaml: '{field}' mentions symbols {unknown_symbols} "
                    f"outside trading_symbols {sorted(normalized_symbols)}; "
                    "if you corrected a typo or changed the fallback symbol, update all display text"
                )

    decision_mode = data.get("decision_mode", "")
    if decision_mode and decision_mode not in DECISION_MODES:
        result.error(f"manifest.yaml: 'decision_mode' must be one of {sorted(DECISION_MODES)}")

    backtest_support = data.get("backtest_support", "")
    if backtest_support and backtest_support not in BACKTEST_SUPPORT_VALUES:
        result.error(
            f"manifest.yaml: 'backtest_support' must be one of {sorted(BACKTEST_SUPPORT_VALUES)}"
        )

    runtime_profile = data.get("runtime_profile", "")
    if runtime_profile and runtime_profile not in RUNTIME_PROFILES:
        result.error(
            f"manifest.yaml: 'runtime_profile' must be one of {sorted(RUNTIME_PROFILES)}"
        )

    execution_mode = data.get("execution_mode", "")
    if execution_mode and execution_mode not in EXECUTION_MODES:
        result.error(
            f"manifest.yaml: 'execution_mode' must be one of {sorted(EXECUTION_MODES)}"
        )

    follow_trade_supported = data.get("follow_trade_supported")
    if follow_trade_supported is not None and not isinstance(follow_trade_supported, bool):
        result.error("manifest.yaml: 'follow_trade_supported' must be a boolean")

    if decision_mode == "agentic" and runtime_profile != "agentic":
        result.error("manifest.yaml: 'decision_mode=agentic' requires 'runtime_profile=agentic'")
    if runtime_profile == "llm_bounded" and backtest_support == "full":
        result.error("manifest.yaml: 'runtime_profile=llm_bounded' requires 'backtest_support=none'")

    if execution_mode == "follow_trade" and follow_trade_supported is not True:
        result.error("manifest.yaml: 'execution_mode=follow_trade' requires 'follow_trade_supported=true'")

    if backtest_support == "none" and execution_mode == "follow_trade":
        result.error("manifest.yaml: live-only playbooks cannot default to 'execution_mode=follow_trade'")

    schedule = data.get("schedule")
    if isinstance(schedule, dict):
        cron_expr = str(schedule.get("cron", "") or "").strip()
        schedule_tz = str(schedule.get("tz") or schedule.get("timezone") or "").strip()
        if cron_expr:
            if not schedule_tz:
                result.error(
                    "manifest.yaml.schedule.tz: scheduled Playbooks must declare "
                    f"an instance-default IANA timezone, e.g. {DEFAULT_SCHEDULE_TZ}"
                )
            else:
                try:
                    ZoneInfo(schedule_tz)
                except (ZoneInfoNotFoundError, KeyError):
                    result.error(
                        "manifest.yaml.schedule.tz: must be a valid IANA timezone "
                        f"(for example {DEFAULT_SCHEDULE_TZ})"
                    )
            parts = cron_expr.split()
            if len(parts) not in (5, 6):
                result.error("manifest.yaml.schedule.cron: must be a 5- or 6-field cron expression")
            else:
                minute_field = parts[0]
                match = CRON_EVERY_MINUTES_PATTERN.fullmatch(minute_field)
                if match and int(match.group(1)) < MIN_SCHEDULE_INTERVAL_MINUTES:
                    result.error(
                        "manifest.yaml.schedule.cron: scheduled Playbooks must not run more often "
                        f"than every {MIN_SCHEDULE_INTERVAL_MINUTES} minutes"
                    )
                elif minute_field == "*":
                    result.error(
                        "manifest.yaml.schedule.cron: scheduled Playbooks must not run every minute; "
                        f"minimum interval is {MIN_SCHEDULE_INTERVAL_MINUTES} minutes"
                    )

    _validate_long_description(
        data.get("long_description"),
        str(data.get("description") or ""),
        result,
    )

    return data


def validate_backtest_yaml(pkg_dir: Path, manifest: dict, result: ValidationResult) -> None:
    def _is_number(value: object) -> bool:
        return isinstance(value, (int, float)) and not isinstance(value, bool)

    def _string_field(payload: dict, field: str, *, prefix: str) -> None:
        if not str(payload.get(field, "") or "").strip():
            result.error(f"{prefix}: missing '{field}'")

    def _parse_backtest_datetime(value: object) -> datetime | None:
        text = str(value or "").strip()
        if not text:
            return None
        try:
            return datetime.fromisoformat(text.replace("Z", "+00:00"))
        except ValueError:
            return None

    def _instrument_symbol(item: dict) -> str:
        raw = str(
            item.get("raw_symbol")
            or item.get("symbol")
            or str(item.get("id", "") or "").split(".", 1)[0]
            or ""
        ).strip().upper()
        return raw

    def _validate_instrument(item: dict, *, prefix: str) -> None:
        kind = str(item.get("kind", "") or "").strip().lower()
        if kind not in BACKTEST_INSTRUMENT_KINDS:
            result.error(f"{prefix}: 'kind' must be one of {sorted(BACKTEST_INSTRUMENT_KINDS)}")
        _string_field(item, "id", prefix=prefix)
        _string_field(item, "bar_type", prefix=prefix)
        _string_field(item, "base_currency", prefix=prefix)
        _string_field(item, "quote_currency", prefix=prefix)
        if not str(item.get("raw_symbol", "") or item.get("symbol", "")).strip():
            result.error(f"{prefix}: either 'raw_symbol' or 'symbol' is required")
        for field in ("price_precision", "size_precision"):
            if not isinstance(item.get(field), int):
                result.error(f"{prefix}: '{field}' must be an integer")
        for field in ("price_increment", "size_increment"):
            if not str(item.get(field, "") or "").strip():
                result.error(f"{prefix}: missing '{field}'")
        for field in ("maker_fee", "taker_fee"):
            if field not in item:
                result.error(f"{prefix}: missing '{field}' (set explicit exchange fee rate; do not rely on zero-fee backtests)")
            elif not _is_number(item.get(field)) and not str(item.get(field, "") or "").strip():
                result.error(f"{prefix}: '{field}' must be a numeric fee rate")
        if kind in {"perpetual", "perpetual_contract", "perp"}:
            _string_field(item, "settlement_currency", prefix=prefix)

    def _validate_required_bar_fields(payload: object) -> None:
        if payload is None:
            return
        if not isinstance(payload, list) or not payload:
            result.error(
                "backtest.yaml.data_requirements.required_bar_fields: must be a non-empty list when provided"
            )
            return

        seen: set[str] = set()
        for index, raw_field in enumerate(payload):
            field = str(raw_field or "").strip()
            prefix = f"backtest.yaml.data_requirements.required_bar_fields[{index}]"
            if not field:
                result.error(f"{prefix}: field name must be a non-empty string")
                continue
            if not BACKTEST_BAR_FIELD_PATTERN.fullmatch(field):
                result.error(f"{prefix}: must use lower_snake_case, got '{field}'")
                continue
            if field in seen:
                result.error(f"{prefix}: duplicate field '{field}'")
                continue
            seen.add(field)

    def _validate_no_provider(payload: object, *, prefix: str) -> None:
        if isinstance(payload, dict):
            if "provider" in payload:
                result.error(
                    f"{prefix}: 'provider' is not allowed; GetAgent routes historical "
                    "data through the managed DataSDK provider"
                )
            for key, value in payload.items():
                _validate_no_provider(value, prefix=f"{prefix}.{key}")
        elif isinstance(payload, list):
            for index, value in enumerate(payload):
                _validate_no_provider(value, prefix=f"{prefix}[{index}]")

    def _record_backtest_symbol(item: dict, *, prefix: str) -> None:
        symbol = _instrument_symbol(item)
        if symbol:
            backtest_symbols.append((prefix, symbol))

    path = pkg_dir / "backtest.yaml"
    if not path.exists():
        return

    data = _load_yaml(path)
    if data is None:
        result.error("backtest.yaml: invalid YAML syntax")
        return

    _validate_no_provider(data, prefix="backtest.yaml")
    backtest_symbols: list[tuple[str, str]] = []

    if manifest.get("backtest_support") != "full":
        result.error("backtest.yaml is only allowed when manifest.yaml sets backtest_support: full")

    venue = data.get("venue")
    if not isinstance(venue, dict):
        result.error("backtest.yaml: 'venue' must be a mapping")
    else:
        for field in ("name", "account_type", "oms_type"):
            _string_field(venue, field, prefix="backtest.yaml.venue")
        balances = venue.get("starting_balances")
        if not isinstance(balances, list) or not balances:
            result.error("backtest.yaml.venue: 'starting_balances' must be a non-empty list")
        else:
            for index, balance in enumerate(balances):
                if isinstance(balance, str):
                    if len(balance.strip().split()) < 2:
                        result.error(
                            f"backtest.yaml.venue.starting_balances[{index}]: "
                            "string balances must look like '<amount> <CURRENCY>'"
                        )
                elif isinstance(balance, dict):
                    if not _is_number(balance.get("amount")):
                        result.error(
                            f"backtest.yaml.venue.starting_balances[{index}]: 'amount' must be a number"
                        )
                    if not str(balance.get("currency", "") or "").strip():
                        result.error(
                            f"backtest.yaml.venue.starting_balances[{index}]: 'currency' is required"
                        )
                else:
                    result.error(
                        f"backtest.yaml.venue.starting_balances[{index}]: entry must be a string or mapping"
                    )

    strategy = data.get("strategy")
    if not isinstance(strategy, dict):
        result.error("backtest.yaml: 'strategy' must be a mapping")
    else:
        for field in ("module", "class"):
            _string_field(strategy, field, prefix="backtest.yaml.strategy")
        strategy_config = strategy.get("config", {})
        if strategy_config is not None and not isinstance(strategy_config, dict):
            result.error("backtest.yaml.strategy: 'config' must be a mapping when provided")

    has_single = isinstance(data.get("instrument"), dict)
    has_many = isinstance(data.get("instruments"), list)
    if has_single and has_many:
        result.error("backtest.yaml: use either 'instrument' or 'instruments', not both")
    elif has_single:
        _validate_instrument(data["instrument"], prefix="backtest.yaml.instrument")
        _record_backtest_symbol(data["instrument"], prefix="backtest.yaml.instrument")
    elif has_many:
        instruments = data.get("instruments") or []
        if not instruments:
            result.error("backtest.yaml: 'instruments' must not be empty")
        for index, item in enumerate(instruments):
            if not isinstance(item, dict):
                result.error(f"backtest.yaml.instruments[{index}] must be a mapping")
                continue
            _validate_instrument(item, prefix=f"backtest.yaml.instruments[{index}]")
            _record_backtest_symbol(item, prefix=f"backtest.yaml.instruments[{index}]")
    else:
        result.error("backtest.yaml: missing 'instrument' or 'instruments'")

    manifest_symbols = {
        str(item or "").strip().upper()
        for item in manifest.get("trading_symbols", [])
        if str(item or "").strip()
    }
    if manifest_symbols and backtest_symbols:
        actual_symbols = {symbol for _, symbol in backtest_symbols}
        extra_symbols = [
            f"{prefix}={symbol}"
            for prefix, symbol in backtest_symbols
            if symbol not in manifest_symbols
        ]
        missing_symbols = sorted(manifest_symbols - actual_symbols)
        if extra_symbols or missing_symbols:
            result.error(
                "backtest.yaml: instruments must match manifest.yaml trading_symbols; "
                f"unexpected backtest symbols={extra_symbols or []}, "
                f"missing manifest symbols={missing_symbols or []}"
            )

    execution = data.get("execution")
    if not isinstance(execution, dict):
        result.error("backtest.yaml: 'execution' must be a mapping")
    else:
        start = str(execution.get("start") or "").strip()
        end = str(execution.get("end") or "").strip()
        if not start or not end:
            result.error(
                "backtest.yaml.execution: 'start' and 'end' are required so "
                "the sandbox can prove the replay window has bars"
            )
        else:
            parsed_start = _parse_backtest_datetime(start)
            parsed_end = _parse_backtest_datetime(end)
            if parsed_start is None or parsed_end is None:
                result.error("backtest.yaml.execution: 'start' and 'end' must be ISO datetimes")
            elif parsed_end <= parsed_start:
                result.error("backtest.yaml.execution: 'end' must be after 'start'")

    data_requirements = data.get("data_requirements")
    if data_requirements is not None and not isinstance(data_requirements, dict):
        result.error("backtest.yaml: 'data_requirements' must be a mapping")
    elif isinstance(data_requirements, dict):
        _validate_required_bar_fields(data_requirements.get("required_bar_fields"))
        required_fields = data_requirements.get("required_bar_fields")
        if isinstance(required_fields, list):
            source_text = "\n".join(
                path.read_text(encoding="utf-8", errors="ignore")
                for path in (pkg_dir / "src").rglob("*.py")
            )
            for field in required_fields:
                if isinstance(field, str) and field.strip() and field.strip() not in source_text:
                    result.error(
                        "backtest.yaml.data_requirements.required_bar_fields: "
                        f"declares '{field.strip()}' but src/** never references it; "
                        "build the feature column with backtest.build_feature_frame(...) "
                        "or remove the declaration"
                    )


def _local_import_roots(pkg_dir: Path) -> set[str]:
    roots = {"src"}
    src_root = pkg_dir / "src"
    if not src_root.exists():
        return roots

    for path in src_root.rglob("*.py"):
        rel_parts = PurePosixPath(path.relative_to(src_root).as_posix()).parts
        if not rel_parts:
            continue
        first = rel_parts[0]
        if first.endswith(".py"):
            stem = first[:-3]
            if stem:
                roots.add(stem)
            continue
        roots.add(first)

    return roots


def _call_name(node: ast.AST) -> str:
    if isinstance(node, ast.Name):
        return node.id
    if isinstance(node, ast.Attribute):
        return node.attr
    return ""


def _attribute_path(node: ast.AST) -> list[str]:
    if isinstance(node, ast.Name):
        return [node.id]
    if isinstance(node, ast.Attribute):
        return [*_attribute_path(node.value), node.attr]
    if isinstance(node, ast.Call):
        return _attribute_path(node.func)
    return []


def _target_names(target: ast.AST) -> list[str]:
    if isinstance(target, ast.Name):
        return [target.id]
    if isinstance(target, (ast.Tuple, ast.List)):
        names: list[str] = []
        for item in target.elts:
            names.extend(_target_names(item))
        return names
    return []


def _position_selection_assignments(tree: ast.AST) -> dict[str, str]:
    selections: dict[str, str] = {}
    for node in ast.walk(tree):
        value: ast.AST | None = None
        targets: list[ast.AST] = []
        if isinstance(node, ast.Assign):
            value = node.value
            targets = list(node.targets)
        elif isinstance(node, ast.AnnAssign):
            value = node.value
            targets = [node.target]
        elif isinstance(node, ast.NamedExpr):
            value = node.value
            targets = [node.target]
        if not isinstance(value, ast.Call):
            continue
        helper_name = _call_name(value.func)
        if helper_name not in POSITION_SELECTION_HELPERS:
            continue
        for target in targets:
            for name in _target_names(target):
                selections[name] = helper_name
    return selections


def _check_position_selection_attributes(tree: ast.AST, *, source_path: str) -> list[str]:
    selections = _position_selection_assignments(tree)
    if not selections:
        return []

    errors: list[str] = []
    for node in ast.walk(tree):
        if (
            isinstance(node, ast.Attribute)
            and isinstance(node.value, ast.Name)
            and node.value.id in selections
            and node.attr in POSITION_SELECTION_INVALID_ATTRS
        ):
            errors.append(
                f"{source_path}: PositionSelection returned by trade.helpers."
                f"{selections[node.value.id]}() does not expose '.{node.attr}' "
                f"(line {node.lineno}); use '.raw' or contract_position_records(...) "
                "for exchange-specific position fields"
            )
    return errors


def _unwrap_str_call(node: ast.AST) -> ast.AST:
    if (
        isinstance(node, ast.Call)
        and isinstance(node.func, ast.Name)
        and node.func.id == "str"
        and len(node.args) == 1
        and not node.keywords
    ):
        return node.args[0]
    return node


def _is_fixed_precision_round(node: ast.AST) -> bool:
    unwrapped = _unwrap_str_call(node)
    if not isinstance(unwrapped, ast.Call):
        return False
    if _call_name(unwrapped.func) != "round" or len(unwrapped.args) < 2:
        return False
    precision_arg = unwrapped.args[1]
    return isinstance(precision_arg, ast.Constant) and isinstance(precision_arg.value, int)


def _check_contract_trigger_price_rounding(tree: ast.AST, *, source_path: str) -> list[str]:
    errors: list[str] = []
    for node in ast.walk(tree):
        if not isinstance(node, ast.Call):
            continue
        if _call_name(node.func) not in CONTRACT_ORDER_HELPERS:
            continue
        for keyword in node.keywords:
            if keyword.arg not in CONTRACT_TRIGGER_PRICE_KEYWORDS:
                continue
            if _is_fixed_precision_round(keyword.value):
                errors.append(
                    f"{source_path}: {keyword.arg} passed to trade.contract."
                    f"{_call_name(node.func)}() uses fixed round(..., N) precision "
                    f"(line {keyword.value.lineno}); use trade.helpers.resolve_contract_tpsl(...) "
                    "or contract_rules(symbol).price_step to align trigger prices with exchange tick size"
                )
    return errors


def _check_contract_tpsl_helper_call(tree: ast.AST, *, source_path: str) -> list[str]:
    errors: list[str] = []
    for node in ast.walk(tree):
        if not isinstance(node, ast.Call):
            continue
        if _attribute_path(node.func)[-3:] != ["trade", "helpers", CONTRACT_TPSL_HELPER]:
            continue
        if node.args:
            errors.append(
                f"{source_path}: trade.helpers.resolve_contract_tpsl() is keyword-only "
                f"(line {node.lineno}); pass symbol=..., side=..., leverage=..., and optional "
                "tp_trigger_price/sl_trigger_price/reference_price/product_type explicitly"
            )
        for keyword in node.keywords:
            if keyword.arg is None:
                errors.append(
                    f"{source_path}: trade.helpers.resolve_contract_tpsl() cannot be validated with **kwargs "
                    f"(line {node.lineno}); pass only explicit supported TP/SL keywords"
                )
                continue
            if keyword.arg not in CONTRACT_TPSL_HELPER_KEYWORDS:
                errors.append(
                    f"{source_path}: unsupported keyword '{keyword.arg}' passed to "
                    f"trade.helpers.resolve_contract_tpsl() (line {keyword.value.lineno}); "
                    "compute concrete tp_trigger_price/sl_trigger_price values instead of using "
                    "percentage override kwargs"
                )
    return errors


def _check_data_provider_keyword(tree: ast.AST, *, source_path: str) -> list[str]:
    errors: list[str] = []
    for node in ast.walk(tree):
        if not isinstance(node, ast.Call):
            continue
        path = _attribute_path(node.func)
        if not path or "data" not in path:
            continue
        for keyword in node.keywords:
            if keyword.arg == "provider":
                errors.append(
                    f"{source_path}: do not pass provider=... to getagent.data calls "
                    f"(line {keyword.value.lineno}); the managed DataSDK provider is selected by the platform"
                )
    return errors


def _test_contains_follow_trade_guard(test: ast.AST) -> bool:
    if isinstance(test, ast.Call):
        return _attribute_path(test)[-2:] == ["runtime", "is_follow_trade"]
    if isinstance(test, ast.BoolOp) and isinstance(test.op, ast.And):
        return any(_test_contains_follow_trade_guard(value) for value in test.values)
    if isinstance(test, ast.Compare):
        nodes = [test.left, *test.comparators]
        has_follow_trade = any(
            isinstance(node, ast.Constant) and node.value == "follow_trade"
            for node in nodes
        )
        has_positive_operator = any(isinstance(op, (ast.Eq, ast.In)) for op in test.ops)
        return has_follow_trade and has_positive_operator
    return False


def _call_is_runtime_follow_wrapper(node: ast.Call) -> bool:
    return _attribute_path(node.func)[-2:] == ["runtime", "emit_signal_or_follow"]


def _call_is_trade_mutation(node: ast.Call) -> bool:
    path = _attribute_path(node.func)
    return (
        len(path) >= 3
        and path[0] == "trade"
        and path[-2] in {"account", "contract", "spot"}
        and path[-1] in TRADE_MUTATION_METHODS
    )


def _check_live_trade_mutation_guards(tree: ast.AST, *, source_path: str) -> list[str]:
    """Require direct live trade mutations in run() to be follow-trade guarded."""
    if source_path not in {"src/main.py", "src/main_live.py"}:
        return []

    errors: list[str] = []

    def visit(node: ast.AST, *, inside_run: bool, guarded: bool) -> None:
        next_inside_run = inside_run
        if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
            next_inside_run = node.name == "run"

        next_guarded = guarded
        if next_inside_run and isinstance(node, ast.If) and _test_contains_follow_trade_guard(node.test):
            next_guarded = True

        if next_inside_run and isinstance(node, ast.Call) and _call_is_trade_mutation(node) and not next_guarded:
            path = ".".join(_attribute_path(node.func))
            errors.append(
                f"{source_path}: {path}() in run() must be inside an "
                "execution_mode == 'follow_trade' guard after emitting the signal; "
                f"signal_only runs must only emit signals (line {node.lineno})"
            )

        if next_inside_run and isinstance(node, ast.Call) and _call_is_runtime_follow_wrapper(node):
            execute_trade_keywords = {
                keyword
                for keyword in node.keywords
                if keyword.arg == "execute_trade"
            }
            execute_trade_child_ids = {
                child_id
                for keyword in execute_trade_keywords
                for child_id in (id(keyword), id(keyword.value))
            }
            for keyword in execute_trade_keywords:
                visit(keyword.value, inside_run=next_inside_run, guarded=True)
            for child in ast.iter_child_nodes(node):
                if id(child) not in execute_trade_child_ids:
                    visit(child, inside_run=next_inside_run, guarded=next_guarded)
            return

        for child in ast.iter_child_nodes(node):
            visit(child, inside_run=next_inside_run, guarded=next_guarded)

    visit(tree, inside_run=False, guarded=False)
    return errors


def validate_src_tree(pkg_dir: Path, result: ValidationResult) -> None:
    src_root = pkg_dir / "src"
    if not src_root.exists():
        return

    local_import_roots = _local_import_roots(pkg_dir)
    for path in src_root.rglob("*.py"):
        rel_path = path.relative_to(pkg_dir).as_posix()
        source = path.read_text()

        try:
            tree = ast.parse(source, filename=rel_path)
        except SyntaxError as e:
            result.error(f"{rel_path}: syntax error at line {e.lineno}: {e.msg}")
            continue

        for error in _check_position_selection_attributes(tree, source_path=rel_path):
            result.error(error)
        for error in _check_contract_trigger_price_rounding(tree, source_path=rel_path):
            result.error(error)
        for error in _check_contract_tpsl_helper_call(tree, source_path=rel_path):
            result.error(error)
        for error in _check_data_provider_keyword(tree, source_path=rel_path):
            result.error(error)
        for error in _check_live_trade_mutation_guards(tree, source_path=rel_path):
            result.error(error)

        for node in ast.walk(tree):
            if isinstance(node, ast.Import):
                for alias in node.names:
                    top = alias.name.split(".")[0]
                    if top in BLOCKED_IMPORTS:
                        result.error(f"{rel_path}: blocked import '{alias.name}' (line {node.lineno})")
                    elif top not in ALLOWED_IMPORTS and top not in local_import_roots:
                        result.error(f"{rel_path}: disallowed import '{alias.name}' (line {node.lineno})")

            elif isinstance(node, ast.ImportFrom):
                if node.level > 0:
                    continue
                if node.module:
                    top = node.module.split(".")[0]
                    if top in BLOCKED_IMPORTS:
                        result.error(f"{rel_path}: blocked import from '{node.module}' (line {node.lineno})")
                    elif top not in ALLOWED_IMPORTS and top not in local_import_roots:
                        result.error(f"{rel_path}: disallowed import from '{node.module}' (line {node.lineno})")

            elif isinstance(node, ast.Call):
                func = node.func
                name = ""
                if isinstance(func, ast.Name):
                    name = func.id
                elif isinstance(func, ast.Attribute):
                    name = func.attr

                if name in ("__import__", "import_module"):
                    result.error(f"{rel_path}: dynamic import via {name}() is not allowed (line {node.lineno})")
                if name in ("eval", "exec", "compile"):
                    result.error(f"{rel_path}: {name}() is not allowed (line {node.lineno})")
                if (
                    name in NAUTILUS_INSTRUMENT_REQUIRED_METHODS
                    and isinstance(func, ast.Attribute)
                    and isinstance(func.value, ast.Name)
                    and func.value.id == "self"
                    and not node.args
                    and not node.keywords
                ):
                    result.error(
                        f"{rel_path}: Nautilus Strategy.{name}() requires an instrument_id "
                        f"argument in this runner; call self.{name}(instrument_id) (line {node.lineno})"
                    )

            elif isinstance(node, ast.Name) and node.id == "__builtins__":
                result.error(f"{rel_path}: access to __builtins__ is not allowed (line {node.lineno})")

            elif isinstance(node, ast.Attribute) and node.attr in (
                "__import__", "__builtins__", "__subclasses__",
                "__globals__", "__code__", "__closure__",
            ):
                result.error(f"{rel_path}: access to {node.attr} is not allowed (line {node.lineno})")


def validate_package(pkg_dir: Path) -> ValidationResult:
    result = ValidationResult()
    validate_structure(pkg_dir, result)
    manifest = validate_manifest(pkg_dir, result)
    validate_backtest_yaml(pkg_dir, manifest, result)
    validate_src_tree(pkg_dir, result)
    return result


def main() -> None:
    if len(sys.argv) < 2:
        print(f"Usage: {sys.argv[0]} <package-directory>")
        sys.exit(1)

    pkg_dir = Path(sys.argv[1]).resolve()
    if not pkg_dir.is_dir():
        print(f"Error: {pkg_dir} is not a directory")
        sys.exit(1)

    print(f"Validating: {pkg_dir.name}/")
    print()

    result = validate_package(pkg_dir)

    if result.warnings:
        for w in result.warnings:
            print(f"  WARN  {w}")
        print()

    if result.errors:
        for e in result.errors:
            print(f"  FAIL  {e}")
        print()
        print(f"Validation FAILED — {len(result.errors)} error(s)")
        sys.exit(1)

    print("Validation PASSED")


if __name__ == "__main__":
    main()
