import { Router } from "express";
import { eq, desc } from "drizzle-orm";
import { db, tradesTable, marketAnalysesTable } from "@workspace/db";

const router = Router();

const INITIAL_CAPITAL = 100000;

router.get("/dashboard/summary", async (_req, res): Promise<void> => {
  const allTrades = await db.select().from(tradesTable);
  const closedTrades = allTrades.filter((t) => t.status === "closed");
  const openTrades = allTrades.filter((t) => t.status === "open");

  const totalPnl = closedTrades.reduce((sum, t) => sum + parseFloat(t.pnl ?? "0"), 0);
  const wins = closedTrades.filter((t) => parseFloat(t.pnl ?? "0") > 0).length;
  const winRate = closedTrades.length > 0 ? (wins / closedTrades.length) * 100 : 0;

  // Get PnL by asset
  const assetPnl = new Map<string, number>();
  for (const t of closedTrades) {
    assetPnl.set(t.asset, (assetPnl.get(t.asset) ?? 0) + parseFloat(t.pnl ?? "0"));
  }

  let bestAsset = "N/A";
  let worstAsset = "N/A";
  let bestPnl = -Infinity;
  let worstPnl = Infinity;
  for (const [asset, pnl] of assetPnl.entries()) {
    if (pnl > bestPnl) { bestPnl = pnl; bestAsset = asset; }
    if (pnl < worstPnl) { worstPnl = pnl; worstAsset = asset; }
  }

  // Weekly/monthly PnL
  const now = new Date();
  const weekAgo = new Date(now); weekAgo.setDate(now.getDate() - 7);
  const monthAgo = new Date(now); monthAgo.setDate(now.getDate() - 30);

  const weeklyPnl = closedTrades
    .filter((t) => t.closedAt && new Date(t.closedAt) > weekAgo)
    .reduce((sum, t) => sum + parseFloat(t.pnl ?? "0"), 0);

  const monthlyPnl = closedTrades
    .filter((t) => t.closedAt && new Date(t.closedAt) > monthAgo)
    .reduce((sum, t) => sum + parseFloat(t.pnl ?? "0"), 0);

  // Portfolio value estimate
  const portfolioValue = INITIAL_CAPITAL + totalPnl;

  // Risk score (simple)
  const noStopCount = openTrades.filter((t) => !t.stopLoss).length;
  const riskScore = Math.min(90, 20 + noStopCount * 5 + (openTrades.length > 5 ? 20 : 0));
  const portfolioHealthScore = Math.max(30, 85 - riskScore * 0.4);

  res.json({
    totalPnl: Math.round(totalPnl * 100) / 100,
    winRate: Math.round(winRate * 10) / 10,
    totalTrades: closedTrades.length,
    openPositions: openTrades.length,
    portfolioValue: Math.round(portfolioValue * 100) / 100,
    portfolioHealthScore: Math.round(portfolioHealthScore),
    riskScore: Math.round(riskScore),
    bestAsset,
    worstAsset,
    weeklyPnl: Math.round(weeklyPnl * 100) / 100,
    monthlyPnl: Math.round(monthlyPnl * 100) / 100,
  });
});

router.get("/dashboard/recent-activity", async (_req, res): Promise<void> => {
  const recentTrades = await db
    .select()
    .from(tradesTable)
    .orderBy(desc(tradesTable.createdAt))
    .limit(10);

  const recentAnalyses = await db
    .select()
    .from(marketAnalysesTable)
    .orderBy(desc(marketAnalysesTable.createdAt))
    .limit(5);

  const activities = [
    ...recentTrades.map((t) => ({
      id: t.id,
      type: t.status === "open" ? "trade_opened" : "trade_closed",
      description: `${t.status === "open" ? "Opened" : "Closed"} ${t.direction.toUpperCase()} ${t.asset} position`,
      asset: t.asset,
      pnl: t.pnl != null ? parseFloat(t.pnl) : null,
      timestamp: (t.closedAt ?? t.createdAt).toISOString(),
    })),
    ...recentAnalyses.map((a) => ({
      id: a.id + 10000,
      type: "analysis_generated" as const,
      description: `AI analyzed ${a.asset} — ${a.recommendation.toUpperCase()} signal (${a.confidenceScore}% confidence)`,
      asset: a.asset,
      pnl: null,
      timestamp: a.createdAt.toISOString(),
    })),
  ]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10);

  res.json(activities);
});

export default router;
