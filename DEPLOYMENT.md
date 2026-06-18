# TradePaddy Deployment Guide

## Prerequisites

- Node.js 20+ (project uses Node 24 in Replit)
- pnpm 9+
- Supabase project (or any Postgres 15+)
- Optional: Bitget Playbook ACCESS-KEY, Qwen API key

## 1. Database (Supabase)

1. Create a project at [supabase.com](https://supabase.com)
2. Copy the **Connection string** (URI mode, pooler or direct)
3. Set `DATABASE_URL` in your API server environment

Push schema and seed demo data:

```powershell
pnpm --filter @workspace/db run push
pnpm --filter @workspace/db tsx src/seed.ts
```

## 2. API Server

### Environment variables

```env
DATABASE_URL=postgresql://...
PORT=5000
SESSION_SECRET=change-me-in-production
QWEN_API_KEY=your-bitget-hackathon-qwen-key
PLAYBOOK_ACCESS_KEY=your-playbook-key
```

Qwen must use base URL `https://hackathon.bitgetops.com/v1` (configured in code).

### Local

```powershell
pnpm --filter @workspace/api-server run dev
```

### Railway / Render

1. Connect GitHub repo
2. Root directory: repository root
3. Build: `pnpm install && pnpm --filter @workspace/api-server run build`
4. Start: `node --enable-source-maps artifacts/api-server/dist/index.mjs`
5. Set env vars above

## 3. Frontend (Vite)

### Environment

Create `artifacts/tradepaddy/.env.production`:

```env
VITE_API_URL=https://your-api.example.com
```

The generated API client should point to your deployed API origin.

### Local

```powershell
pnpm --filter @workspace/tradepaddy run dev
```

### Vercel / Netlify

1. Framework preset: **Vite**
2. Root: `artifacts/tradepaddy`
3. Build command: `pnpm install && pnpm --filter @workspace/tradepaddy run build`
4. Output directory: `dist/public` (Vite compiles static assets here)
5. Add `VITE_API_URL` env var (pointing to your deployed API server)
6. SPA routing: We have created `artifacts/tradepaddy/vercel.json` to automatically rewrite all paths to `index.html` to prevent 404 errors on page refreshes.


## 4. Full-stack monorepo (single host)

If deploying both on one Node host, serve Vite build as static files from Express or use a reverse proxy:

- `/api/*` → Express on port 5000
- `/*` → Vite static build

## 5. GetAgent Playbook publish

After deploying the web app, publish the strategy for hackathon Track 1 evidence:

```powershell
$env:PLAYBOOK_ACCESS_KEY="your-key"
pnpm run playbook:pipeline
```

Results are saved to `tradepaddy-playbook/BACKTEST_RESULTS.json`.

## 6. Bitget Skill Hub (developer machine)

For Cursor/Claude skill integration on developer machines:

```powershell
npx bitget-hub install bitget-skill-hub --target all
```

TradePaddy's production orchestrator runs in the API server (`skillHub.ts`) and does not require MCP at runtime.

## 7. Hackathon submission checklist

- [ ] Public demo URL (frontend + API)
- [ ] Demo video (optional, ≤3 min)
- [ ] Project description (<200 words) — see README summary
- [ ] Playbook backtest metrics table (`BACKTEST_RESULTS.json` or HACKATHON_DEMO.md)
- [ ] Community post with `#BitgetHackathon`

## Health checks

```powershell
curl https://your-api.example.com/api/health
curl https://your-api.example.com/api/trades/stats/summary
```

Ensure CORS allows your frontend origin in production (`artifacts/api-server/src/app.ts`).
