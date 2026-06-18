# TradePaddy Architecture

## Overview

TradePaddy implements the Bitget Trading Agent loop:

```
Perception (Skill Hub) → Decision (AI Engine) → Execution (Paper Trades) → Risk Management
         ↓                        ↓                      ↓
    Market Analysis          Chat / Scores         Journal Memory
         ↓                        ↓                      ↓
   Opportunities            Coaching              Behavior Analytics
                                                    Trade Replay
```

## Components

### Frontend (`artifacts/tradepaddy`)

- **Stack:** React 19, Vite, Wouter, TanStack Query, Tailwind, shadcn-style UI
- **Pages:** Dashboard, Portfolio, Trades, Journal, Analysis, Opportunities, Behavior, Coaching, Replay, Chat, Risk, Connect
- **API client:** Generated from OpenAPI via Orval (`lib/api-client-react`)

### API Server (`artifacts/api-server`)

- **Stack:** Express 5, session auth, Drizzle ORM
- **Routes:** trades, journal, analysis, chat, behavior, coaching, replay, risk, dashboard, auth/bitget

#### Market Intelligence Orchestrator

`src/lib/skillHub.ts` implements the five Bitget Agent Hub perception skills as parallel data fetchers:

| Skill | Data sources |
|-------|----------------|
| `macro-analyst` | CoinGecko global market data → risk-on/risk-off verdict |
| `market-intel` | DeFi Llama TVL, Bitget open interest → whale/institutional proxy |
| `news-briefing` | CoinGecko trending → narrative events |
| `sentiment-analyst` | Fear & Greed Index, Bitget funding rate, long/short ratio |
| `technical-analysis` | Bitget futures candles → RSI, MACD, Bollinger Bands, S/R |

The orchestrator output feeds `generateMarketAnalysis()` in `src/lib/ai.ts`, which uses Qwen (`qwen3.6-plus` via Bitget hackathon endpoint) to synthesize scores and recommendations. When Qwen is unavailable, deterministic scoring from Skill Hub data is used.

#### Decision Engine

Outputs per asset:

- `bullishScore`, `bearishScore`, `confidenceScore`, `riskScore`
- `recommendation` (buy | sell | wait | hold)
- Structured signal objects for macro, sentiment, technical, on-chain, news

#### Execution Engine (Paper Trading)

- `POST /trades` opens simulated positions
- `PATCH /trades/:id` closes positions, computes PnL
- Auto-creates journal entries on close
- Triggers behavior pattern re-detection via `behaviorDetect.ts`

#### Memory & Analytics

- **Journal:** every closed trade → `journal_entries`
- **Behavior:** runtime detection of FOMO, revenge trading, overtrading, stop-loss discipline, etc.
- **Replay:** AI reconstructs trade timeline from journal + trade metadata
- **Coaching:** daily/weekly/monthly reports from trade history + patterns
- **Risk:** exposure, concentration, stop-loss and position-size suggestions

### Database (`lib/db`)

PostgreSQL / Supabase via Drizzle ORM.

| Table | Purpose |
|-------|---------|
| `trades` | Simulated trade records |
| `journal_entries` | Long-term trade memory |
| `market_analyses` | AI analysis snapshots |
| `behavior_patterns` | Detected behavioral issues |
| `trade_replays` | Post-mortem reconstructions |
| `coaching_reports` | Mentor reports |
| `risk_reports` | Risk center snapshots |
| `portfolio_snapshots` | Portfolio history |
| `chat_sessions`, `chat_messages` | Chat memory |

### GetAgent Playbook (`tradepaddy-playbook`)

Deterministic adaptive-regime strategy for Bitget Playbook backtesting:

- `src/main.py` — routes historical vs live evaluation
- `src/main_backtest.py` — Nautilus backtest + equity curve output
- `src/main_live.py` — live signal path
- `src/strategy.py` — ADX regime + EMA trend + Bollinger/RSI mean reversion

Pipeline: `scripts/getagent-pipeline.mjs` → upload → sandbox backtest → publish.

## Data Flow: Analyze an Asset

1. User requests analysis for `SOL` on `/analysis`
2. API calls `fetchSkillHubSnapshot("SOL")` — parallel skill fetches
3. `deriveScoresFromSnapshot()` produces baseline scores
4. Qwen synthesizes final JSON (or fallback uses snapshot directly)
5. Result stored in `market_analyses` and returned to UI

## Demo Mode

When external APIs are unavailable:

- Bitget credentials `bg_test*` → mock account data
- Missing `QWEN_API_KEY` → Skill Hub fallback or seeded mock responses
- Seed script populates 100 trades, 30 replays, coaching/risk/opportunity data

## Security Notes

- Playbook and Bitget API keys must be supplied via environment variables
- Never commit `.env` or credentials files
- Session stores Bitget creds server-side only
