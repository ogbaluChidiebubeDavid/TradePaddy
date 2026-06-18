# TradePaddy: AI Trading Operating System

TradePaddy is an autonomous, AI-driven Trading Operating System designed specifically for the **Bitget AI Base Camp Hackathon (Trading Agent Track)**. 

The platform integrates market perception, cognitive decision-making, simulated execution, trading memory, behavioral analytics, personalized coaching, and a flag-ship "post-match" trade replay system to help traders analyze and improve their performance over time.

---

## 🚀 Key Features & Hackathon Alignment

TradePaddy is built around the core Bitget judging loop: **Perception → Decision → Execution → Risk Management → Memory & Continuous Improvement**.

1. **Market Perception**: Integrates the 5 analyst-grade Bitget Skill Hub modules (`macro-analyst`, `market-intel`, `news-briefing`, `sentiment-analyst`, and `technical-analysis`) into a unified **Market Intelligence Orchestrator**.
2. **Decision Engine**: Generates real-time bullish/bearish scores, confidence percentages, risk scores, and actionable recommendations (BUY/SELL/WAIT/HOLD) using the **Alibaba Qwen API**.
3. **Execution (Simulation)**: Executes trades in a paper trading sandbox, tracking positions, leverage, entry/exit prices, and real-time PnL without requiring real capital.
4. **Risk Management**: Surfaces risk scores, stop-loss recommendations, position-sizing suggestions, and concentration alerts in a dedicated **Risk Center**.
5. **Memory (Trade Journal)**: Automatically logs every closed trade as a long-term journal entry.
6. **Behavioral Analytics**: Audits historical trading behavior to detect critical human mistakes like FOMO trading, revenge trading, overtrading, ignoring stop losses, and cutting winners too early.
7. **Personalized Coaching**: Delivers daily, weekly, and monthly mentoring reports with actionable trading improvement recommendations.
8. **Trade Replay System**: Flagship feature reconstructing the full market context, whale activity, sentiment, technicals, user action, and AI recommendation of historical trades, like a post-match analysis of a football game.

---

## 🛠️ Project Structure

- `artifacts/tradepaddy`: React + Vite + Wouter frontend application (beautiful, responsive dashboard).
- `artifacts/api-server`: Express API server managing market perception, Qwen integration, and mock Bitget API synchronization.
- `lib/db`: PostgreSQL database layer with Drizzle ORM schemas and deterministic seed data (100 trades, 30 replay examples, coaching/risk reports).
- `tradepaddy-playbook`: GetAgent strategy playbook implementing the adaptive market regime strategy.
- `getagent-installed`: Preconfigured reference documentation and local validation scripts for the GetAgent SDK.

---

## ⚡ Setup & Run

### Prerequisites
- Node.js (v24+)
- pnpm (v9+)
- PostgreSQL or Supabase database instance

### Environment Setup
Create a `.env` file in the root directory:
```env
DATABASE_URL="your-postgresql-connection-string"
PORT=5000
SESSION_SECRET="your-session-secret"
BITGET_API_KEY="your-bitget-api-key"
BITGET_SECRET_KEY="your-bitget-secret-key"
BITGET_PASSPHRASE="your-bitget-passphrase"
QWEN_API_KEY="your-qwen-api-key"
```

### Installation & Run Commands
```powershell
# Install dependencies
pnpm install

# Push database schema
pnpm --filter @workspace/db run push

# Seed database with mock data (100 trades, 30 replays, coaching & risk reports)
pnpm --filter @workspace/db tsx src/seed.ts

# Start the Express API server
pnpm --filter @workspace/api-server run dev

# Start the React web application
pnpm --filter @workspace/tradepaddy run dev
```

---

## 📊 GetAgent Playbook (Adaptive Regime Strategy)

TradePaddy includes a quantitative playbook strategy located in `./tradepaddy-playbook`.

- **Strategy Philosophy**: Adaptive market regime. It uses the Average Directional Index (ADX) to determine trend strength:
  - **Trending Mode (ADX > 25)**: Follows the trend using fast/slow Moving Average crossovers.
  - **Ranging Mode (ADX < 20)**: Reverts to the mean using Bollinger Bands and RSI extremes.
  - **Transition Mode (ADX 20-25)**: Exits active positions and stays flat.
- **Playbook Key**: `cbf5dd5e96f147c38b8c66d863d928d9`

Validate the playbook locally before upload:
```powershell
python getagent-installed\scripts\validate.py .\tradepaddy-playbook
```

### 📈 Backtest Performance Summary
The strategy was successfully uploaded, backtested, and published to Bitget Playbook. Below are the key metrics from the sandbox backtest run (covering `2026-05-01 → 2026-06-01`):

| Metric | Value | Details |
| :--- | :---: | :--- |
| **Total Return (Strategy Basis)** | `-0.022%` | Return relative to strategy margin budget |
| **Net PnL** | `-$0.022` | Based on a $100 margin budget |
| **Max Drawdown (Strategy Basis)** | `35.7%` | Maximum peak-to-trough decline of the strategy |
| **Account Max Drawdown** | `0.0357%` | Drawdown relative to total account equity ($100k) |
| **Win Rate** | `41.0%` | 32 winning trades out of 78 total trades |
| **Total Trades** | `78` | Executed over the 1-month backtest window |
| **Sharpe Ratio** | `-4.40` | Risk-adjusted return metric |
| **Profit Factor** | `0.70` | Gross profit divided by gross loss |
| **Main Risk** | Whipsaw losses | Regime switches in transitional ADX zones (ADX 20-25) |

---


## 🎥 3-Minute Demo Flow for Judges

1. **Connect Exchange**: Connect with mock Bitget credentials to show the product runs offline or on simulated data.
2. **Dashboard Overview**: Show portfolio health, AI insights, and opportunities.
3. **AI Mentor Chat**: Ask `What should I trade today?` to see the structured 5-part AI response (Summary, Evidence, Risk Analysis, Confidence, Suggested Action).
4. **Execution & Memory**: View active simulated trades and the automated journal entry logs.
5. **Trade Replay**: Reconstruct a past trade (e.g. Trade #37) to watch the post-match breakdown of market/whale/sentiment context versus user action.
6. **Coaching & Behavior**: Show the coaching dashboard highlight FOMO/stop-loss mistakes and outline actionable rule improvements.
7. **Playbook Deployment**: Showcase the GetAgent playbook integration as the quantitative execution partner.

---

## Hackathon submission (Track 1)

TradePaddy closes the loop from **perception → decision → execution → risk → memory → coaching**. Bitget Agent Hub Skill Hub modules feed `skillHub.ts`; Qwen synthesizes decisions; paper trading produces verifiable sim records; the adaptive-regime GetAgent playbook provides sandbox backtest evidence. Fully demoable without live capital.

| Resource | Location |
|----------|----------|
| Architecture | [ARCHITECTURE.md](./ARCHITECTURE.md) |
| Deployment | [DEPLOYMENT.md](./DEPLOYMENT.md) |
| Demo script | [HACKATHON_DEMO.md](./HACKATHON_DEMO.md) |
| Backtest metrics | [tradepaddy-playbook/BACKTEST_RESULTS.json](./tradepaddy-playbook/BACKTEST_RESULTS.json) |

### Playbook pipeline

```powershell
$env:PLAYBOOK_ACCESS_KEY="your-playbook-key"
pnpm run playbook:pipeline
pnpm run setup:getagent-skills
pnpm run setup:bitget-skills
```
