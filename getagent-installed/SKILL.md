---
name: getagent
description: >-
  Authors, validates, uploads, backtests, publishes, and enables GetAgent
  quantitative trading Playbooks. Use when the user asks to create, review,
  fix, validate, upload, run, publish, or subscribe to a trading strategy or
  Playbook; mentions strategy backtesting, 策略, 回测, 发布, 上传, BTC EMA, or
  GetAgent; or provides existing Playbook package code for review.
compatibility: >-
  Designed for Claude Code, Codex, Cursor, and other agents that support
  Agent Skills. Requires Python 3.11+ for local static validation and network
  access to the GetAgent Playbook control-plane API for upload/run/publish.
metadata:
  author: getagent
  version: v0.2.2
---

# GetAgent Playbook Creator

This skill helps an agent turn a strategy idea into a GetAgent Playbook package,
validate it locally, upload it to GetAgent Cloud, run sandbox backtests or
evaluations, publish accepted versions, and enable subscriptions.

Local authoring is **not** local SDK execution. User machines can only run
static package checks and call the Playbook control-plane APIs. `getagent.data`,
`getagent.trade`, `getagent.llm`, `getagent.backtest`, and `getagent.runtime`
are sandbox-preinstalled SDK modules. Use the bundled references to write code
against their public shape, but do not try to execute data, trade, or LLM SDK
calls on the user's machine.

## First Use

On first use each session:

1. If available, run `scripts/version_check.sh`. Show update instructions only
   when it prints a message.
2. Read `references/package-schema.md` before creating or modifying a package.
3. Read `references/sdk.md` before writing `src/**` strategy code.
4. Read the exact API reference under `references/api/` before upload, run,
   publish, enable, or list operations.

## User Opening

When the user asks generally how to start, use this stable opening in the
user's language. Do not ask for credentials in the opening.

```text
✅ 策略回测助手已经准备好了。

我可以帮你完成从「策略想法」到「沙箱回测结果」的完整流程：

- 你可以用自然语言描述策略，我会生成可运行代码
- 你也可以提供已有策略，我会帮你 review、修复和优化
- 我会先做本地校验，检查策略是否符合回测框架要求
- 校验通过后，我可以上传到沙箱并启动回测
- 回测完成后，我会帮你解读收益、回撤、胜率、交易次数等结果
- 然后我们可以继续迭代下一版策略

你现在想怎么开始？

A. 跑一个 Demo，先看看完整流程（BTC EMA 趋势策略，仅信号模式）
B. 我有大致方向，让你帮我搭个最小骨架（你会反问我几个关键问题：标的 / 周期 / 进场 / 出场）
C. 我直接描述我的策略想法
D. 我已有策略代码（贴在这里或给路径），先 review 修复再跑回测
```

Use the English equivalent when the user's first message is English.

## Default Workflow

1. Clarify only missing strategy requirements that block authoring. Ask one
   concrete question at a time.
2. Scaffold the package shape from `references/package-schema.md`.
3. Write strategy code against `getagent.*` imports only, plus allowed
   scientific/runtime packages documented in the schema.
4. Validate locally:

   ```bash
   conda activate get_agent_test
   python "scripts/validate.py" ./my-strategy/
   ```

5. Ask for the user's Bitget OpenAPI `ACCESS-KEY` only before the first
   authenticated upload/run/publish/enable call. Never write credentials to disk.
6. Upload the package through the documented control-plane API.
7. Run a sandbox evaluation before publish when the package supports backtests.
8. Read results back in plain language before proposing publish or iteration.

## Reference Map

- Package contract: `references/package-schema.md`
- SDK overview: `references/sdk.md`
- Sandbox runtime and blocked imports: `references/sandbox-runtime.md`
- Backtest engine behavior: `references/backtest-engine.md`
- Control-plane APIs: `references/api/index.md`
- Data SDK: `references/sdk/data/playbook-supported.md`
- Trade SDK: `references/sdk/trade/patterns.md`
- Backtest SDK: `references/sdk/backtest/catalog.md`
- Runtime SDK: `references/sdk/runtime/catalog.md`
- LLM SDK: `references/sdk/llm/catalog.md`

## Backtest Output Pitfalls

Before writing `main_backtest.py`, read `references/backtest-engine.md` §Backtest
Output Contract. The three most common publish failures are:

1. **"缺少可发布的真实 equity curve"** — no `output/equity_curve.csv`, and the
   JSON report is too large for the Runner to read.
2. **Missing real evidence** — the run did not produce a real
   `output/equity_curve.csv` or platform-readable historical evidence. Do not
   fabricate dense points or hand-written summaries.
3. **Incorrect `total_return_pct` display** — `result.raw` has engine-level
   summary fields flattened to the top level. The backend merge uses the report
   as BASE (`setdefault` from signal cannot override). You must overwrite
   `raw["net_pnl"]` and `raw["total_return_pct"]` with correct absolute values
   before writing `backtest_report.json`.

## Hard Boundaries

- Do not tell users to install or execute the private GetAgent SDK locally.
- Do not import or recommend direct clients such as `requests`, `httpx`,
  `ccxt`, `trade_sdk`, `yfinance`, `akshare`, or exchange clients in Playbook
  source code.
- Do not use `getagent.llm` for replayable historical logic. LLM-backed
  strategies are live/evaluation-only and require `runtime_profile:
  llm_bounded` with `backtest_support: none`.
- Do not call trade mutation APIs directly in a signal-only branch. Emit the
  signal successfully and let the runtime decide whether follow-trade is
  allowed.
- For `backtest_support: full`, always declare a bounded
  `backtest.yaml.execution.start` / `execution.end` window, never pass
  `provider=...`, and ensure any
  `data_requirements.required_bar_fields` are actually built and referenced in
  `src/**`.
- Keep symbols consistent across `manifest.trading_symbols`, display text,
  README, `backtest.yaml` instruments, data calls, and emitted signals. If the
  submitted symbol is a typo or unavailable and you replace it with a supported
  symbol, rename the package/title and explain the correction in README and the
  final summary.
- In Nautilus strategy code, call `self.cancel_all_orders(instrument_id)` and
  `self.close_all_positions(instrument_id)` with an explicit instrument id.
- Do not publish or enable without showing the endpoint and masked
  `ACCESS-KEY` prefix and getting the user's intent for that operation.

## Post-Backtest Response

After every successful sandbox run, summarize the result before any next action:

- strategy-basis `total_return_pct`
- `max_drawdown_pct`
- `win_rate` paired with `total_trades`
- finite `sharpe_ratio` only when trades exist
- the main risk revealed by the run

Then offer 2-3 concrete next moves: tune a declared parameter, change symbol or
timeframe within schema, revise entry/exit logic in a new version, or publish
only if evidence is acceptable.
