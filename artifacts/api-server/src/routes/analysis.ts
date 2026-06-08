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

  // Get unique assets, take most recent per asset, sort by confidence
  const byAsset = new Map<string, typeof analyses[0]>();
  for (const a of analyses) {
    if (!byAsset.has(a.asset)) byAsset.set(a.asset, a);
  }

  const opportunities = Array.from(byAsset.values())
    .filter((a) => a.recommendation === "buy" || a.recommendation === "hold")
    .sort((a, b) => parseFloat(b.confidenceScore) - parseFloat(a.confidenceScore))
    .slice(0, 8)
    .map((a) => ({
      id: a.id,
      asset: a.asset,
      bullishScore: parseFloat(a.bullishScore),
      bearishScore: parseFloat(a.bearishScore),
      confidenceScore: parseFloat(a.confidenceScore),
      riskScore: parseFloat(a.riskScore),
      recommendation: a.recommendation,
      summary: a.summary,
      analysisId: a.id,
      createdAt: a.createdAt.toISOString(),
    }));

  res.json(opportunities);
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
    createdAt: a.createdAt.toISOString(),
  };
}

export default router;
