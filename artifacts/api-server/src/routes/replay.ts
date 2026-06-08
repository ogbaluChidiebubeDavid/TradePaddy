import { Router } from "express";
import { eq, desc } from "drizzle-orm";
import { db, tradeReplaysTable, tradesTable } from "@workspace/db";
import { GetReplayParams, CreateReplayBody } from "@workspace/api-zod";
import { generateTradeReplay } from "../lib/ai";

const router = Router();

router.get("/replay", async (_req, res): Promise<void> => {
  const replays = await db.select().from(tradeReplaysTable).orderBy(desc(tradeReplaysTable.createdAt)).limit(30);
  res.json(replays.map(formatReplay));
});

router.post("/replay", async (req, res): Promise<void> => {
  const parsed = CreateReplayBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [trade] = await db.select().from(tradesTable).where(eq(tradesTable.id, parsed.data.tradeId));
  if (!trade) {
    res.status(404).json({ error: "Trade not found" });
    return;
  }

  if (trade.status !== "closed" || !trade.exitPrice) {
    res.status(400).json({ error: "Trade must be closed to generate a replay" });
    return;
  }

  const entryPrice = parseFloat(trade.entryPrice);
  const exitPrice = parseFloat(trade.exitPrice);
  const pnl = parseFloat(trade.pnl ?? "0");

  const aiResult = await generateTradeReplay({
    asset: trade.asset,
    entryPrice,
    exitPrice,
    direction: trade.direction,
    entryReason: trade.entryReason,
    marketConditions: trade.marketConditions,
    aiRecommendation: trade.aiRecommendation,
    userAction: trade.userAction,
    pnl,
  });

  const pnlPercent = parseFloat(trade.pnlPercent ?? "0");

  const [replay] = await db
    .insert(tradeReplaysTable)
    .values({
      tradeId: trade.id,
      asset: trade.asset,
      entryDate: trade.createdAt.toISOString().split("T")[0],
      entryPrice: String(entryPrice),
      exitPrice: String(exitPrice),
      direction: trade.direction,
      marketContext: aiResult.marketContext,
      newsEvents: aiResult.newsEvents,
      sentimentConditions: aiResult.sentimentConditions,
      whaleActivity: aiResult.whaleActivity,
      technicalIndicators: aiResult.technicalIndicators,
      userReasoning: aiResult.userReasoning,
      aiRecommendation: trade.aiRecommendation,
      actualOutcome: aiResult.actualOutcome,
      lessonsLearned: aiResult.lessonsLearned,
      pnl: String(pnl),
      pnlPercent: String(pnlPercent),
      behaviorFlags: aiResult.behaviorFlags,
    })
    .returning();

  res.status(201).json(formatReplay(replay));
});

router.get("/replay/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetReplayParams.safeParse({ id: raw });
  if (!params.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const [replay] = await db.select().from(tradeReplaysTable).where(eq(tradeReplaysTable.id, params.data.id));
  if (!replay) {
    res.status(404).json({ error: "Replay not found" });
    return;
  }
  res.json(formatReplay(replay));
});

function formatReplay(r: typeof tradeReplaysTable.$inferSelect) {
  return {
    id: r.id,
    tradeId: r.tradeId,
    journalEntryId: r.journalEntryId ?? null,
    asset: r.asset,
    entryDate: r.entryDate,
    entryPrice: parseFloat(r.entryPrice),
    exitPrice: parseFloat(r.exitPrice),
    direction: r.direction,
    marketContext: r.marketContext,
    newsEvents: (r.newsEvents as string[]) ?? [],
    sentimentConditions: r.sentimentConditions,
    whaleActivity: r.whaleActivity,
    technicalIndicators: (r.technicalIndicators as Record<string, unknown>) ?? {},
    userReasoning: r.userReasoning,
    aiRecommendation: r.aiRecommendation,
    actualOutcome: r.actualOutcome,
    lessonsLearned: r.lessonsLearned,
    pnl: parseFloat(r.pnl),
    pnlPercent: parseFloat(r.pnlPercent),
    behaviorFlags: (r.behaviorFlags as string[]) ?? [],
    createdAt: r.createdAt.toISOString(),
  };
}

export default router;
