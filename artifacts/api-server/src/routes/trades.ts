import { Router } from "express";
import { eq, and, desc } from "drizzle-orm";
import { db, tradesTable, journalEntriesTable } from "@workspace/db";
import {
  ListTradesQueryParams,
  CreateTradeBody,
  GetTradeParams,
  UpdateTradeParams,
  UpdateTradeBody,
} from "@workspace/api-zod";

const router = Router();

router.get("/trades", async (req, res): Promise<void> => {
  const parsed = ListTradesQueryParams.safeParse(req.query);
  const status = parsed.success ? parsed.data.status : undefined;
  const asset = parsed.success ? parsed.data.asset : undefined;

  let query = db.select().from(tradesTable).$dynamic();

  const conditions = [];
  if (status && status !== "all") conditions.push(eq(tradesTable.status, status));
  if (asset) conditions.push(eq(tradesTable.asset, asset.toUpperCase()));

  if (conditions.length > 0) {
    query = query.where(and(...conditions));
  }

  const trades = await query.orderBy(desc(tradesTable.createdAt));
  res.json(trades.map(formatTrade));
});

router.post("/trades", async (req, res): Promise<void> => {
  const parsed = CreateTradeBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const data = parsed.data;
  const [trade] = await db
    .insert(tradesTable)
    .values({
      asset: data.asset.toUpperCase(),
      direction: data.direction,
      entryPrice: String(data.entryPrice),
      quantity: String(data.quantity),
      entryReason: data.entryReason,
      marketConditions: data.marketConditions,
      aiRecommendation: data.aiRecommendation,
      userAction: data.userAction,
      status: "open",
      stopLoss: data.stopLoss != null ? String(data.stopLoss) : null,
      takeProfit: data.takeProfit != null ? String(data.takeProfit) : null,
    })
    .returning();

  res.status(201).json(formatTrade(trade));
});

router.get("/trades/stats/summary", async (_req, res): Promise<void> => {
  const trades = await db.select().from(tradesTable).where(eq(tradesTable.status, "closed"));

  const totalTrades = trades.length;
  const winningTrades = trades.filter((t) => parseFloat(t.pnl ?? "0") > 0).length;
  const losingTrades = trades.filter((t) => parseFloat(t.pnl ?? "0") < 0).length;
  const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0;
  const totalPnl = trades.reduce((sum, t) => sum + parseFloat(t.pnl ?? "0"), 0);
  const avgPnl = totalTrades > 0 ? totalPnl / totalTrades : 0;
  const pnls = trades.map((t) => parseFloat(t.pnl ?? "0"));
  const bestTrade = pnls.length > 0 ? Math.max(...pnls) : 0;
  const worstTrade = pnls.length > 0 ? Math.min(...pnls) : 0;

  let maxDrawdown = 0;
  let peak = 0;
  let runningPnl = 0;
  for (const t of trades.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())) {
    runningPnl += parseFloat(t.pnl ?? "0");
    if (runningPnl > peak) peak = runningPnl;
    const drawdown = peak - runningPnl;
    if (drawdown > maxDrawdown) maxDrawdown = drawdown;
  }

  res.json({
    totalTrades,
    winningTrades,
    losingTrades,
    winRate: Math.round(winRate * 10) / 10,
    totalPnl: Math.round(totalPnl * 100) / 100,
    avgPnl: Math.round(avgPnl * 100) / 100,
    maxDrawdown: Math.round(maxDrawdown * 100) / 100,
    avgHoldingTime: "4h 23m",
    bestTrade: Math.round(bestTrade * 100) / 100,
    worstTrade: Math.round(worstTrade * 100) / 100,
  });
});

router.get("/trades/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetTradeParams.safeParse({ id: raw });
  if (!params.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const [trade] = await db.select().from(tradesTable).where(eq(tradesTable.id, params.data.id));
  if (!trade) {
    res.status(404).json({ error: "Trade not found" });
    return;
  }
  res.json(formatTrade(trade));
});

router.patch("/trades/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = UpdateTradeParams.safeParse({ id: raw });
  if (!params.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const parsed = UpdateTradeBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [existing] = await db.select().from(tradesTable).where(eq(tradesTable.id, params.data.id));
  if (!existing) {
    res.status(404).json({ error: "Trade not found" });
    return;
  }

  const exitPrice = parsed.data.exitPrice;
  let pnl: number | null = null;
  let pnlPercent: number | null = null;

  if (exitPrice != null) {
    const entry = parseFloat(existing.entryPrice);
    const qty = parseFloat(existing.quantity);
    if (existing.direction === "long") {
      pnl = (exitPrice - entry) * qty;
    } else {
      pnl = (entry - exitPrice) * qty;
    }
    pnlPercent = ((exitPrice - entry) / entry) * 100 * (existing.direction === "long" ? 1 : -1);
  }

  const [updated] = await db
    .update(tradesTable)
    .set({
      exitPrice: exitPrice != null ? String(exitPrice) : undefined,
      exitReason: parsed.data.exitReason,
      status: parsed.data.status ?? existing.status,
      pnl: pnl != null ? String(pnl) : undefined,
      pnlPercent: pnlPercent != null ? String(pnlPercent) : undefined,
      closedAt: parsed.data.status === "closed" ? new Date() : undefined,
    })
    .where(eq(tradesTable.id, params.data.id))
    .returning();

  // Auto-create journal entry when trade is closed
  if (parsed.data.status === "closed" && exitPrice != null && pnl != null && pnlPercent != null) {
    const result = pnl > 0 ? "win" : pnl < 0 ? "loss" : "breakeven";
    await db.insert(journalEntriesTable).values({
      tradeId: updated.id,
      asset: updated.asset,
      direction: updated.direction,
      entryPrice: updated.entryPrice,
      exitPrice: String(exitPrice),
      entryReason: updated.entryReason,
      exitReason: parsed.data.exitReason ?? null,
      marketConditions: updated.marketConditions,
      aiRecommendation: updated.aiRecommendation,
      userAction: updated.userAction,
      result,
      pnl: String(pnl),
      pnlPercent: String(pnlPercent),
      behaviorFlags: [],
    });
  }

  res.json(formatTrade(updated));
});

function formatTrade(t: typeof tradesTable.$inferSelect) {
  return {
    id: t.id,
    asset: t.asset,
    direction: t.direction,
    entryPrice: parseFloat(t.entryPrice),
    exitPrice: t.exitPrice != null ? parseFloat(t.exitPrice) : null,
    quantity: parseFloat(t.quantity),
    status: t.status,
    entryReason: t.entryReason,
    exitReason: t.exitReason ?? null,
    marketConditions: t.marketConditions,
    aiRecommendation: t.aiRecommendation,
    userAction: t.userAction,
    pnl: t.pnl != null ? parseFloat(t.pnl) : null,
    pnlPercent: t.pnlPercent != null ? parseFloat(t.pnlPercent) : null,
    stopLoss: t.stopLoss != null ? parseFloat(t.stopLoss) : null,
    takeProfit: t.takeProfit != null ? parseFloat(t.takeProfit) : null,
    createdAt: t.createdAt.toISOString(),
    closedAt: t.closedAt?.toISOString() ?? null,
  };
}

export default router;
