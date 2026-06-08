import { Router } from "express";
import { desc } from "drizzle-orm";
import { db, behaviorPatternsTable } from "@workspace/db";

const router = Router();

router.get("/behavior/patterns", async (_req, res): Promise<void> => {
  const patterns = await db.select().from(behaviorPatternsTable).orderBy(desc(behaviorPatternsTable.detectedAt));
  res.json(patterns.map(formatPattern));
});

router.get("/behavior/summary", async (_req, res): Promise<void> => {
  const patterns = await db.select().from(behaviorPatternsTable).orderBy(desc(behaviorPatternsTable.detectedAt));

  const totalIssues = patterns.reduce((sum, p) => sum + p.occurrences, 0);
  const estimatedPnlImpact = patterns.reduce((sum, p) => sum + parseFloat(p.impactOnPnl), 0);
  const topPattern = patterns.length > 0 ? patterns[0].type : "none";
  const improvementScore = Math.max(20, Math.min(95, 75 - patterns.filter((p) => p.severity === "high" || p.severity === "critical").length * 8));

  res.json({
    topPattern,
    totalIssues,
    estimatedPnlImpact: Math.round(estimatedPnlImpact * 100) / 100,
    improvementScore,
    patterns: patterns.map(formatPattern),
  });
});

function formatPattern(p: typeof behaviorPatternsTable.$inferSelect) {
  return {
    id: p.id,
    type: p.type,
    severity: p.severity,
    description: p.description,
    occurrences: p.occurrences,
    impactOnPnl: parseFloat(p.impactOnPnl),
    recommendation: p.recommendation,
    exampleTradeIds: (p.exampleTradeIds as number[]) ?? [],
    detectedAt: p.detectedAt.toISOString(),
  };
}

export default router;
