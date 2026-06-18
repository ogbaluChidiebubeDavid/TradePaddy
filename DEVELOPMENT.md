# TradePaddy

TradePaddy is an AI Trading Operating System for the Bitget AI Base Camp Hackathon Trading Agent track. It combines market perception, autonomous analysis, simulated execution, trading memory, behavioral analytics, coaching, trade replay, and risk management in one demoable product.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` - run the API server on port `5000`
- `pnpm --filter @workspace/tradepaddy run dev` - run the TradePaddy web app with Vite
- `pnpm run typecheck` - full typecheck across all packages
- `pnpm run build` - typecheck and build all packages
- `pnpm --filter @workspace/api-spec run codegen` - regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` - push DB schema changes in development
- `pnpm --filter @workspace/db tsx src/seed.ts` - seed the demo database
- Required env: `DATABASE_URL` - Postgres or Supabase connection string
- Optional env: `QWEN_API_KEY` - enables the Bitget-compatible Qwen endpoint; mock AI responses are used when unset

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React, Vite, Wouter, TanStack Query, Tailwind CSS, shadcn-style UI primitives
- API: Express 5
- DB: PostgreSQL or Supabase Postgres + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild
- AI: Qwen-compatible chat completion API at `https://hackathon.bitgetops.com/v1`, model `qwen3.6-plus`

## Where Things Live

- `artifacts/tradepaddy` - the responsive TradePaddy web app.
- `artifacts/api-server` - Express API, Bitget account sync, Qwen integration, and demo endpoints.
- `lib/db/src/schema` - Drizzle schema for trades, journal memory, market analysis, behavior patterns, replays, risk reports, coaching reports, and portfolio snapshots.
- `lib/db/src/seed.ts` - deterministic seed data for the hackathon demo: 100 trades plus replay, risk, portfolio, coaching, behavior, and opportunity examples.
- `lib/api-spec/openapi.yaml` - source OpenAPI contract used by generated clients.
- `tradepaddy-playbook` - GetAgent adaptive regime strategy package.

## Architecture Decisions

- The app remains fully demoable without live Bitget or Qwen access. Missing API credentials fall back to realistic deterministic demo data and mocked AI responses.
- Every closed trade becomes a journal memory record so replay, coaching, and behavior analytics have a shared historical source.
- Market Intelligence Orchestrator behavior is exposed through the analysis routes and AI layer, combining macro, sentiment, technical, on-chain, and news signal shapes into one scorecard.
- Trade execution is simulation-first. The app tracks paper positions, PnL, win rate, drawdown, risk exposure, and journal outcomes without requiring real capital.
- The GetAgent playbook is a deterministic adaptive-regime strategy so it can support historical backtests.

## Product

- Dashboard: portfolio overview, AI insights, opportunities, and recent activity.
- Market analysis: unified perception from macro, on-chain, sentiment, technical, and news signals.
- Chat: ChatGPT-like trading mentor responses with summary, evidence, risk analysis, confidence, and suggested action.
- Trades and Journal: simulated trade execution records plus long-term memory.
- Behavior: recurring pattern detection for FOMO, revenge trading, overtrading, poor exits, and stop-loss discipline.
- Coaching: daily, weekly, and monthly reports with improvement recommendations.
- Replay: post-match style reconstruction of each trade's market context, user reasoning, AI recommendation, outcome, and lesson.
- Risk Center: risk score, portfolio health, exposure warnings, stop-loss suggestions, position sizing, and concentration alerts.

## User Preferences

- Build from the provided document brief.
- Include the GetAgent playbook flow using playbook key `cbf5dd5e96f147c38b8c66d863d928d9`.
- Show backtest key metrics in a table after a successful backtest.

## Gotchas

- GetAgent local validation requires PyYAML. Without it, the bundled validator falls back to a basic parser that cannot understand the current YAML package.
- Do not publish the GetAgent playbook until upload/backtest results are shown and the user confirms publishing with the endpoint and masked access key.
- The app can run in demo mode without Bitget credentials; live account sync requires valid Bitget API credentials.
- Keep the generated API clients in sync with `lib/api-spec/openapi.yaml` when changing route contracts.

## Pointers

- See `HACKATHON_DEMO.md` for the 3-minute judge demo flow.
- See `tradepaddy-playbook/README.md` for the GetAgent strategy explanation.
