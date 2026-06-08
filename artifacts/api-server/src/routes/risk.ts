import { Router } from "express";
import { desc, eq } from "drizzle-orm";
import { db, riskReportsTable, tradesTable } from "@workspace/db";

const router = Router();

router.get("/risk/report", async (_req, res): Promise<void> => {
  // Get most recent report or generate on the fly
  const [latest] = await db.select().from(riskReportsTable).orderBy(desc(riskReportsTable.createdAt)).limit(1);

  if (latest && Date.now() - latest.createdAt.getTime() < 1000 * 60 * 60) {
    // Return cached if less than 1 hour old
    res.json(formatReport(latest));
    return;
  }

  // Generate fresh risk report
  const openTrades = await db.select().from(tradesTable).where(eq(tradesTable.status, "open"));

  const assetExposure = new Map<string, number>();
  let totalExposure = 0;

  for (const t of openTrades) {
    const val = parseFloat(t.entryPrice) * parseFloat(t.quantity);
    assetExposure.set(t.asset, (assetExposure.get(t.asset) ?? 0) + val);
    totalExposure += val;
  }

  const concentrationRisks: string[] = [];
  const maxExposureWarnings: string[] = [];
  const stopLossSuggestions: Array<{ asset: string; suggestedStopLoss: number; currentPrice: number }> = [];
  const positionSizeSuggestions: Array<{ asset: string; currentSize: number; suggestedSize: number }> = [];

  for (const [asset, val] of assetExposure.entries()) {
    const pct = totalExposure > 0 ? (val / (100000 + totalExposure)) * 100 : 0;
    if (pct > 20) {
      concentrationRisks.push(`${asset} represents ${pct.toFixed(1)}% of portfolio — exceeds 20% concentration limit`);
    }
    if (pct > 30) {
      maxExposureWarnings.push(`${asset} exposure critical at ${pct.toFixed(1)}% — reduce position immediately`);
    }

    const tradesForAsset = openTrades.filter((t) => t.asset === asset);
    for (const t of tradesForAsset) {
      const entry = parseFloat(t.entryPrice);
      if (!t.stopLoss) {
        stopLossSuggestions.push({
          asset,
          suggestedStopLoss: Math.round(entry * (t.direction === "long" ? 0.95 : 1.05) * 100) / 100,
          currentPrice: Math.round(entry * 1.02 * 100) / 100,
        });
      }
      const qty = parseFloat(t.quantity);
      if (qty * entry > 10000) {
        positionSizeSuggestions.push({
          asset,
          currentSize: Math.round(qty * entry * 100) / 100,
          suggestedSize: Math.round(5000 * 100) / 100,
        });
      }
    }
  }

  const hasNoStops = openTrades.filter((t) => !t.stopLoss).length;
  const riskScore = Math.min(95, 20 + concentrationRisks.length * 15 + hasNoStops * 5);
  const healthScore = Math.max(20, 85 - riskScore * 0.5);

  const [report] = await db
    .insert(riskReportsTable)
    .values({
      riskScore: String(riskScore),
      portfolioHealthScore: String(Math.round(healthScore)),
      maxExposureWarnings,
      stopLossSuggestions,
      positionSizeSuggestions,
      concentrationRisks,
      summary:
        riskScore < 40
          ? "Portfolio risk is well-managed. Current exposure levels are within acceptable parameters."
          : riskScore < 65
          ? "Moderate risk detected. Review concentration and stop loss coverage."
          : "High risk detected. Immediate action recommended to reduce exposure.",
      recommendations: [
        "Set stop losses on all open positions — currently " + hasNoStops + " positions have no stop loss",
        concentrationRisks.length > 0 ? "Reduce concentration in overweight assets" : "Concentration levels are healthy",
        "Maintain maximum 5% risk per trade relative to total portfolio value",
        "Review and rebalance portfolio weekly",
      ],
    })
    .returning();

  res.json(formatReport(report));
});

router.get("/risk/history", async (_req, res): Promise<void> => {
  const reports = await db.select().from(riskReportsTable).orderBy(desc(riskReportsTable.createdAt)).limit(30);
  res.json(reports.map(formatReport));
});

function formatReport(r: typeof riskReportsTable.$inferSelect) {
  return {
    id: r.id,
    riskScore: parseFloat(r.riskScore),
    portfolioHealthScore: parseFloat(r.portfolioHealthScore),
    maxExposureWarnings: (r.maxExposureWarnings as string[]) ?? [],
    stopLossSuggestions: (r.stopLossSuggestions as Array<{ asset: string; suggestedStopLoss: number; currentPrice: number }>) ?? [],
    positionSizeSuggestions: (r.positionSizeSuggestions as Array<{ asset: string; currentSize: number; suggestedSize: number }>) ?? [],
    concentrationRisks: (r.concentrationRisks as string[]) ?? [],
    summary: r.summary,
    recommendations: (r.recommendations as string[]) ?? [],
    createdAt: r.createdAt.toISOString(),
  };
}

export default router;
