import { Router } from "express";
import { eq, desc } from "drizzle-orm";
import { db, marketAnalysesTable } from "@workspace/db";
import { GetAnalysisParams, ListAnalysesQueryParams, CreateAnalysisBody } from "@workspace/api-zod";
import { generateMarketAnalysis } from "../lib/ai";

const router = Router();

router.get("/analysis", async (req, res): Promise<void> => {
  const parsed = ListAnalysesQueryParams.safeParse(req.query);
  const asset = parsed.success ? parsed.data.asset : undefined;
  const limit = parsed.success && parsed.data.limit ? parsed.data.limit : 20;

  let query = db.select().from(marketAnalysesTable).$dynamic();
  if (asset) query = query.where(eq(marketAnalysesTable.asset, asset.toUpperCase()));

  const analyses = await query.orderBy(desc(marketAnalysesTable.createdAt)).limit(limit);
  res.json(analyses.map(formatAnalysis));
});

router.post("/analysis", async (req, res): Promise<void> => {
  const parsed = CreateAnalysisBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const asset = parsed.data.asset.toUpperCase();
  const aiResult = await generateMarketAnalysis(asset);

  const [analysis] = await db
    .insert(marketAnalysesTable)
    .values({
      asset,
      bullishScore: String(aiResult.bullishScore),
      bearishScore: String(aiResult.bearishScore),
      confidenceScore: String(aiResult.confidenceScore),
      riskScore: String(aiResult.riskScore),
      recommendation: aiResult.recommendation,
      summary: aiResult.summary,
      evidence: aiResult.evidence,
      riskAnalysis: aiResult.riskAnalysis,
      macroSignals: aiResult.macroSignals,
      sentimentSignals: aiResult.sentimentSignals,
      technicalSignals: aiResult.technicalSignals,
      onchainSignals: aiResult.onchainSignals,
      newsSignals: aiResult.newsSignals,
      opportunities: aiResult.opportunities,
    })
    .returning();

  res.status(201).json(formatAnalysis(analysis));
});

router.get("/analysis/opportunities/top", async (_req, res): Promise<void> => {
  const analyses = await db
    .select()
    .from(marketAnalysesTable)
    .orderBy(desc(marketAnalysesTable.createdAt))
    .limit(50);

  // Get unique assets, take most recent per asset
  const byAsset = new Map<string, typeof analyses[0]>();
  for (const a of analyses) {
    if (!byAsset.has(a.asset)) byAsset.set(a.asset, a);
  }

  // Extract all opportunities from those analyses
  const oppsList = [];
  for (const a of byAsset.values()) {
    if (Array.isArray(a.opportunities)) {
      for (const opp of a.opportunities) {
        oppsList.push(opp);
      }
    }
  }

  // Sort by confidence descending
  oppsList.sort((a, b) => b.confidence - a.confidence);

  res.json(oppsList);
});

router.get("/analysis/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetAnalysisParams.safeParse({ id: raw });
  if (!params.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const [analysis] = await db.select().from(marketAnalysesTable).where(eq(marketAnalysesTable.id, params.data.id));
  if (!analysis) {
    res.status(404).json({ error: "Analysis not found" });
    return;
  }
  res.json(formatAnalysis(analysis));
});

function formatAnalysis(a: typeof marketAnalysesTable.$inferSelect) {
  return {
    id: a.id,
    asset: a.asset,
    bullishScore: parseFloat(a.bullishScore),
    bearishScore: parseFloat(a.bearishScore),
    confidenceScore: parseFloat(a.confidenceScore),
    riskScore: parseFloat(a.riskScore),
    recommendation: a.recommendation,
    summary: a.summary,
    evidence: (a.evidence as string[]) ?? [],
    riskAnalysis: a.riskAnalysis,
    macroSignals: a.macroSignals ?? {},
    sentimentSignals: a.sentimentSignals ?? {},
    technicalSignals: a.technicalSignals ?? {},
    onchainSignals: a.onchainSignals ?? {},
    newsSignals: a.newsSignals ?? {},
    opportunities: a.opportunities ?? [],
    createdAt: a.createdAt.toISOString(),
  };
}

router.get("/market/candles", async (req, res): Promise<void> => {
  const asset = String(req.query.asset || "BTC").toUpperCase();
  const granularity = String(req.query.granularity || "1H");
  const limit = req.query.limit ? String(req.query.limit) : "200";
  const startTime = req.query.startTime ? String(req.query.startTime) : undefined;
  const endTime = req.query.endTime ? String(req.query.endTime) : undefined;

  const symbol = `${asset}USDT_UMCBL`;
  try {
    const params: Record<string, string> = {
      symbol,
      productType: "USDT-FUTURES",
      granularity,
      limit,
    };
    if (startTime) params.startTime = startTime;
    if (endTime) params.endTime = endTime;

    const queryStr = new URLSearchParams(params).toString();
    const bitgetRes = await fetch(`https://api.bitget.com/api/v2/mix/market/candles?${queryStr}`);
    const data = await bitgetRes.json() as { code: string; data?: any[][]; msg?: string };
    
    if (data.code === "00000" && Array.isArray(data.data)) {
      const formatted = data.data.map(c => ({
        time: parseInt(c[0]),
        open: parseFloat(c[1]),
        high: parseFloat(c[2]),
        low: parseFloat(c[3]),
        close: parseFloat(c[4]),
        volume: parseFloat(c[5]),
      })).reverse();
      res.json(formatted);
      return;
    }
    throw new Error(data.msg || "Failed to fetch candles");
  } catch (err) {
    console.error("Candles fetch failed:", err);
    // Generate mock candles
    const limitNum = parseInt(limit) || 100;
    const endTs = endTime ? parseInt(endTime) : Date.now();
    const startTs = startTime ? parseInt(startTime) : endTs - limitNum * 3600 * 1000;
    const step = (endTs - startTs) / limitNum;
    
    const mockCandles = [];
    let price = asset === "BTC" ? 65474.00 : asset === "ETH" ? 1783.17 : asset === "SOL" ? 73.15 : asset === "XRP" ? 1.21 : asset === "ADA" ? 0.1707 : asset === "DOGE" ? 0.0868 : 1.0;
    for (let i = 0; i < limitNum; i++) {
      const ts = startTs + i * step;
      const open = price;
      const change = (Math.random() - 0.49) * (price * 0.015);
      const close = price + change;
      const high = Math.max(open, close) + Math.random() * (price * 0.005);
      const low = Math.min(open, close) - Math.random() * (price * 0.005);
      price = close;
      mockCandles.push({
        time: ts,
        open,
        high,
        low,
        close,
        volume: Math.random() * 1000,
      });
    }
    res.json(mockCandles);
  }
});

export default router;
