import { Router } from "express";
import { eq, desc, gte } from "drizzle-orm";
import { db, coachingReportsTable, tradesTable, behaviorPatternsTable } from "@workspace/db";
import { ListCoachingReportsQueryParams, GetCoachingReportParams, GenerateCoachingReportBody } from "@workspace/api-zod";
import { generateCoachingReport } from "../lib/ai";

const router = Router();

router.get("/coaching/reports", async (req, res): Promise<void> => {
  const parsed = ListCoachingReportsQueryParams.safeParse(req.query);
  const type = parsed.success ? parsed.data.type : undefined;

  let query = db.select().from(coachingReportsTable).$dynamic();
  if (type) query = query.where(eq(coachingReportsTable.type, type));

  const reports = await query.orderBy(desc(coachingReportsTable.createdAt)).limit(20);
  res.json(reports.map(formatReport));
});

router.post("/coaching/reports", async (req, res): Promise<void> => {
  const parsed = GenerateCoachingReportBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { type } = parsed.data;
  const now = new Date();
  let periodStart: Date;
  let periodEnd = now;

  if (type === "daily") {
    periodStart = new Date(now);
    periodStart.setHours(0, 0, 0, 0);
  } else if (type === "weekly") {
    periodStart = new Date(now);
    periodStart.setDate(now.getDate() - 7);
  } else {
    periodStart = new Date(now);
    periodStart.setDate(now.getDate() - 30);
  }

  if (parsed.data.periodStart) periodStart = new Date(parsed.data.periodStart);
  if (parsed.data.periodEnd) periodEnd = new Date(parsed.data.periodEnd);

  const trades = await db
    .select()
    .from(tradesTable)
    .where(gte(tradesTable.createdAt, periodStart));

  const patterns = await db.select().from(behaviorPatternsTable);

  const aiResult = await generateCoachingReport({
    type,
    trades: trades.map((t) => ({
      pnl: parseFloat(t.pnl ?? "0"),
      asset: t.asset,
      userAction: t.userAction,
      aiRecommendation: t.aiRecommendation,
    })),
    patterns: patterns.map((p) => ({ type: p.type, severity: p.severity, occurrences: p.occurrences })),
  });

  const totalPnl = trades.reduce((sum, t) => sum + parseFloat(t.pnl ?? "0"), 0);
  const wins = trades.filter((t) => parseFloat(t.pnl ?? "0") > 0).length;
  const winRate = trades.length > 0 ? (wins / trades.length) * 100 : 0;

  const [report] = await db
    .insert(coachingReportsTable)
    .values({
      type,
      title: aiResult.title,
      summary: aiResult.summary,
      keyInsights: aiResult.keyInsights,
      topMistakes: aiResult.topMistakes,
      improvements: aiResult.improvements,
      recommendations: aiResult.recommendations,
      tradingScore: String(aiResult.tradingScore),
      winRate: String(Math.round(winRate * 10) / 10),
      totalTrades: trades.length,
      totalPnl: String(Math.round(totalPnl * 100) / 100),
      periodStart,
      periodEnd,
    })
    .returning();

  res.status(201).json(formatReport(report));
});

router.get("/coaching/reports/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetCoachingReportParams.safeParse({ id: raw });
  if (!params.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const [report] = await db.select().from(coachingReportsTable).where(eq(coachingReportsTable.id, params.data.id));
  if (!report) {
    res.status(404).json({ error: "Report not found" });
    return;
  }
  res.json(formatReport(report));
});

function formatReport(r: typeof coachingReportsTable.$inferSelect) {
  return {
    id: r.id,
    type: r.type,
    title: r.title,
    summary: r.summary,
    keyInsights: (r.keyInsights as string[]) ?? [],
    topMistakes: (r.topMistakes as string[]) ?? [],
    improvements: (r.improvements as string[]) ?? [],
    recommendations: (r.recommendations as string[]) ?? [],
    tradingScore: parseFloat(r.tradingScore),
    winRate: r.winRate != null ? parseFloat(r.winRate) : null,
    totalTrades: r.totalTrades ?? null,
    totalPnl: r.totalPnl != null ? parseFloat(r.totalPnl) : null,
    periodStart: r.periodStart.toISOString(),
    periodEnd: r.periodEnd.toISOString(),
    createdAt: r.createdAt.toISOString(),
  };
}

export default router;
