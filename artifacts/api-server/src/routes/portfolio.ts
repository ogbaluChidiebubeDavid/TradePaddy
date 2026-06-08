import { Router } from "express";
import { eq, desc } from "drizzle-orm";
import { db, tradesTable, portfolioSnapshotsTable } from "@workspace/db";
import { GetPortfolioHistoryQueryParams } from "@workspace/api-zod";

const router = Router();

const INITIAL_CAPITAL = 100000;

router.get("/portfolio", async (_req, res): Promise<void> => {
  const openTrades = await db.select().from(tradesTable).where(eq(tradesTable.status, "open"));
  const closedTrades = await db.select().from(tradesTable).where(eq(tradesTable.status, "closed"));

  const realizedPnl = closedTrades.reduce((sum, t) => sum + parseFloat(t.pnl ?? "0"), 0);

  // Simulate current prices with slight variation
  const positions = openTrades.map((t) => {
    const entry = parseFloat(t.entryPrice);
    const qty = parseFloat(t.quantity);
    const variation = (Math.random() - 0.45) * 0.08; // slight bullish bias
    const currentPrice = entry * (1 + variation);
    const pnl = t.direction === "long" ? (currentPrice - entry) * qty : (entry - currentPrice) * qty;
    const pnlPercent = ((currentPrice - entry) / entry) * 100 * (t.direction === "long" ? 1 : -1);
    const value = currentPrice * qty;

    return {
      id: t.id,
      tradeId: t.id,
      asset: t.asset,
      direction: t.direction,
      entryPrice: entry,
      currentPrice: Math.round(currentPrice * 100) / 100,
      quantity: qty,
      pnl: Math.round(pnl * 100) / 100,
      pnlPercent: Math.round(pnlPercent * 100) / 100,
      value: Math.round(value * 100) / 100,
      stopLoss: t.stopLoss != null ? parseFloat(t.stopLoss) : null,
      takeProfit: t.takeProfit != null ? parseFloat(t.takeProfit) : null,
      openedAt: t.createdAt.toISOString(),
    };
  });

  const unrealizedPnl = positions.reduce((sum, p) => sum + p.pnl, 0);
  const investedValue = positions.reduce((sum, p) => sum + p.value, 0);
  const cashBalance = INITIAL_CAPITAL + realizedPnl - investedValue;
  const totalValue = cashBalance + investedValue;
  const totalPnl = realizedPnl + unrealizedPnl;
  const totalPnlPercent = (totalPnl / INITIAL_CAPITAL) * 100;

  res.json({
    totalValue: Math.round(totalValue * 100) / 100,
    cashBalance: Math.round(cashBalance * 100) / 100,
    investedValue: Math.round(investedValue * 100) / 100,
    totalPnl: Math.round(totalPnl * 100) / 100,
    totalPnlPercent: Math.round(totalPnlPercent * 100) / 100,
    dayPnl: Math.round(unrealizedPnl * 0.3 * 100) / 100,
    dayPnlPercent: Math.round((unrealizedPnl * 0.3 / INITIAL_CAPITAL) * 10000) / 100,
    positions,
  });
});

router.get("/portfolio/history", async (req, res): Promise<void> => {
  const parsed = GetPortfolioHistoryQueryParams.safeParse(req.query);
  const days = parsed.success && parsed.data.days ? parsed.data.days : 30;

  const snapshots = await db
    .select()
    .from(portfolioSnapshotsTable)
    .orderBy(desc(portfolioSnapshotsTable.timestamp))
    .limit(days);

  if (snapshots.length < 5) {
    // Generate synthetic history if not enough snapshots
    const synth = [];
    let value = INITIAL_CAPITAL;
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const change = (Math.random() - 0.42) * 0.025;
      value = value * (1 + change);
      synth.push({
        id: i,
        totalValue: Math.round(value * 100) / 100,
        totalPnl: Math.round((value - INITIAL_CAPITAL) * 100) / 100,
        timestamp: date.toISOString(),
      });
    }
    res.json(synth);
    return;
  }

  res.json(
    snapshots.reverse().map((s) => ({
      id: s.id,
      totalValue: parseFloat(s.totalValue),
      totalPnl: parseFloat(s.totalPnl),
      timestamp: s.timestamp.toISOString(),
    }))
  );
});

router.get("/portfolio/positions", async (_req, res): Promise<void> => {
  const openTrades = await db.select().from(tradesTable).where(eq(tradesTable.status, "open"));

  const positions = openTrades.map((t) => {
    const entry = parseFloat(t.entryPrice);
    const qty = parseFloat(t.quantity);
    const variation = (Math.random() - 0.45) * 0.08;
    const currentPrice = entry * (1 + variation);
    const pnl = t.direction === "long" ? (currentPrice - entry) * qty : (entry - currentPrice) * qty;
    const pnlPercent = ((currentPrice - entry) / entry) * 100 * (t.direction === "long" ? 1 : -1);
    const value = currentPrice * qty;

    return {
      id: t.id,
      tradeId: t.id,
      asset: t.asset,
      direction: t.direction,
      entryPrice: entry,
      currentPrice: Math.round(currentPrice * 100) / 100,
      quantity: qty,
      pnl: Math.round(pnl * 100) / 100,
      pnlPercent: Math.round(pnlPercent * 100) / 100,
      value: Math.round(value * 100) / 100,
      stopLoss: t.stopLoss != null ? parseFloat(t.stopLoss) : null,
      takeProfit: t.takeProfit != null ? parseFloat(t.takeProfit) : null,
      openedAt: t.createdAt.toISOString(),
    };
  });

  res.json(positions);
});

export default router;
