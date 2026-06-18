# TradePaddy Hackathon Demo

## What To Show

TradePaddy demonstrates the full Bitget Trading Agent loop:

1. Perception - macro, on-chain, news, sentiment, and technical inputs are normalized into a market analysis.
2. Decision - the AI decision engine returns bullish, bearish, confidence, and risk scores with a recommended action.
3. Execution - trades are recorded in simulation mode with entry, exit, PnL, and user action.
4. Risk Management - the Risk Center surfaces exposure, concentration, stop-loss, and position-size suggestions.
5. Memory - every closed trade becomes a journal entry.
6. Coaching - behavior analytics and coaching reports turn historical trades into improvement plans.
7. Continuous Improvement - trade replay explains what happened, what the user did, and what should change next time.

## Local Demo Setup

```powershell
pnpm install
pnpm --filter @workspace/db run push
pnpm --filter @workspace/db tsx src/seed.ts
pnpm --filter @workspace/api-server run dev
pnpm --filter @workspace/tradepaddy run dev
```

Required:

- `DATABASE_URL` for Supabase or Postgres.

Optional:

- `QWEN_API_KEY` for the Bitget-compatible Qwen endpoint. When omitted, the app uses realistic demo AI responses.
- Bitget API credentials in the connect screen. Demo keys beginning with `bg_test` trigger mock Bitget account data.

## Three-Minute Demo Flow

1. Connect a demo Bitget account.
   Use mock credentials to prove the product is runnable even without live exchange access.

2. Open Dashboard and Opportunities.
   Show portfolio overview, AI insights, and ranked opportunities. Call out the perception-to-decision flow and the unified analysis scores.

3. Ask TradePaddy AI: `What should I trade today?`
   The response should include Summary, Evidence, Risk Analysis, Confidence Score, and Suggested Action.

4. Open Trades and Journal.
   Show simulated execution records and explain that every trade automatically becomes long-term memory.

5. Open Replay.
   Select a losing trade and show the reconstructed timeline: market context, sentiment, whale activity, user reasoning, AI recommendation, actual outcome, and lesson.

6. Open Behavior, Coaching, and Risk.
   Show recurring mistakes, improvement recommendations, risk score, portfolio health, exposure warnings, stop-loss suggestions, and position-size suggestions.

7. Close with the GetAgent playbook.
   Explain that `tradepaddy-playbook` contains an adaptive market regime strategy: trend-following when trending, mean reversion when ranging, and flat when unclear.

## GetAgent Playbook Notes

Package: `tradepaddy-playbook`

Playbook key: `cbf5dd5e96f147c38b8c66d863d928d9`

Strategy philosophy: adaptive market regime. The strategy follows trend signals in directional markets, switches to mean reversion in range-bound markets, and stays flat during unclear transitions.

Before upload/backtest/publish, run local validation:

```powershell
python getagent-installed\scripts\validate.py .\tradepaddy-playbook
```

After a successful backtest, summarize (see `tradepaddy-playbook/BACKTEST_RESULTS.json`):

| Metric | Value |
| --- | --- |
| Total return (strategy basis) | -0.022% |
| Net PnL | -$0.022 (on $100 margin budget) |
| Max drawdown | 35.7% (strategy basis) |
| Win rate | 41.0% |
| Total trades | 78 |
| Sharpe ratio | -4.40 |
| Profit factor | 0.70 |
| Backtest window | 2026-05-01 → 2026-06-01 |
| Equity curve points | 726 |
| Main risk | Regime whipsaws in transitional ADX zones |

**Publish status:** `tradepaddy-adaptive-regime` uploaded, backtested, and published to Bitget Playbook (strategy ID `99fda448-4f6e-42fc-b9f7-23839ac92365`).
