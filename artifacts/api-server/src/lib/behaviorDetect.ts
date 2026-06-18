import { eq } from "drizzle-orm";
import { db, behaviorPatternsTable, tradesTable, type Trade } from "@workspace/db";

export type BehaviorType =
  | "fomo_trading"
  | "revenge_trading"
  | "overtrading"
  | "holding_losers"
  | "cutting_winners_early"
  | "ignoring_stop_loss"
  | "position_sizing_mistake";

interface DetectedPattern {
  type: BehaviorType;
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  occurrences: number;
  impactOnPnl: number;
  recommendation: string;
  exampleTradeIds: number[];
}

const PATTERN_META: Record<
  BehaviorType,
  { severity: DetectedPattern["severity"]; description: string; recommendation: string }
> = {
  fomo_trading: {
    severity: "high",
    description: "Entering after large same-day moves — chasing momentum without confirmation",
    recommendation: "Wait for pullbacks to structure before entering; avoid buying extended green candles",
  },
  revenge_trading: {
    severity: "high",
    description: "Opening new trades within 2 hours of a loss — emotional re-entry pattern",
    recommendation: "Implement a cooling-off period after losses before taking the next trade",
  },
  overtrading: {
    severity: "medium",
    description: "More than 5 trades in a rolling 24-hour window",
    recommendation: "Cap daily trades at 3–5 and focus on higher-conviction setups",
  },
  holding_losers: {
    severity: "high",
    description: "Losing trades held significantly longer than winning trades",
    recommendation: "Set hard stop losses and honor them — cut losers faster than winners",
  },
  cutting_winners_early: {
    severity: "medium",
    description: "Average win size materially smaller than average loss size",
    recommendation: "Let winners run to planned targets; improve reward/risk ratio",
  },
  ignoring_stop_loss: {
    severity: "critical",
    description: "Closed losing trades without a stop loss defined at entry",
    recommendation: "Never enter without a pre-defined stop loss",
  },
  position_sizing_mistake: {
    severity: "medium",
    description: "Position notional exceeds 10% of rolling portfolio exposure proxy",
    recommendation: "Size positions to 1–5% risk per trade relative to portfolio",
  },
};

function hoursBetween(a: Date, b: Date): number {
  return Math.abs(a.getTime() - b.getTime()) / (1000 * 60 * 60);
}

export function detectBehaviorPatterns(closedTrades: Trade[]): DetectedPattern[] {
  if (closedTrades.length === 0) return [];

  const sorted = [...closedTrades].sort(
    (a, b) => new Date(a.closedAt ?? a.createdAt).getTime() - new Date(b.closedAt ?? b.createdAt).getTime(),
  );

  const patterns: DetectedPattern[] = [];

  // FOMO: large absolute PnL% entries that lost
  const fomoIds = sorted
    .filter((t) => {
      const pct = Math.abs(parseFloat(t.pnlPercent ?? "0"));
      return pct > 8 && parseFloat(t.pnl ?? "0") < 0 && /fomo|momentum|breakout|pump|chase/i.test(t.entryReason);
    })
    .map((t) => t.id);
  if (fomoIds.length >= 2) {
    patterns.push(buildPattern("fomo_trading", fomoIds, sorted));
  }

  // Revenge trading
  const revengeIds: number[] = [];
  for (let i = 1; i < sorted.length; i++) {
    const prev = sorted[i - 1];
    const cur = sorted[i];
    if (parseFloat(prev.pnl ?? "0") < 0 && hoursBetween(new Date(prev.closedAt!), new Date(cur.createdAt)) < 2) {
      revengeIds.push(cur.id);
    }
  }
  if (revengeIds.length >= 2) {
    patterns.push(buildPattern("revenge_trading", revengeIds, sorted));
  }

  // Overtrading — 24h windows
  const overtradeIds: number[] = [];
  for (let i = 0; i < sorted.length; i++) {
    const windowStart = new Date(sorted[i].createdAt);
    const inWindow = sorted.filter(
      (t) => new Date(t.createdAt).getTime() >= windowStart.getTime() - 24 * 60 * 60 * 1000,
    );
    if (inWindow.length > 5) overtradeIds.push(...inWindow.map((t) => t.id));
  }
  const uniqueOver = [...new Set(overtradeIds)];
  if (uniqueOver.length >= 5) {
    patterns.push(buildPattern("overtrading", uniqueOver.slice(0, 20), sorted));
  }

  // Holding losers vs cutting winners
  const wins = sorted.filter((t) => parseFloat(t.pnl ?? "0") > 0);
  const losses = sorted.filter((t) => parseFloat(t.pnl ?? "0") < 0);
  if (wins.length >= 3 && losses.length >= 3) {
    const avgWinHold =
      wins.reduce((s, t) => s + hoursBetween(new Date(t.createdAt), new Date(t.closedAt!)), 0) / wins.length;
    const avgLossHold =
      losses.reduce((s, t) => s + hoursBetween(new Date(t.createdAt), new Date(t.closedAt!)), 0) / losses.length;
    if (avgLossHold > avgWinHold * 1.5) {
      patterns.push(buildPattern("holding_losers", losses.slice(0, 10).map((t) => t.id), sorted));
    }
    const avgWinPnl = wins.reduce((s, t) => s + parseFloat(t.pnl ?? "0"), 0) / wins.length;
    const avgLossPnl = Math.abs(losses.reduce((s, t) => s + parseFloat(t.pnl ?? "0"), 0) / losses.length);
    if (avgWinPnl < avgLossPnl * 0.6) {
      patterns.push(buildPattern("cutting_winners_early", wins.slice(0, 10).map((t) => t.id), sorted));
    }
  }

  // Ignoring stop loss
  const noStopIds = losses.filter((t) => !t.stopLoss).map((t) => t.id);
  if (noStopIds.length >= 3) {
    patterns.push(buildPattern("ignoring_stop_loss", noStopIds, sorted));
  }

  // Position sizing
  const bigSizeIds = sorted
    .filter((t) => parseFloat(t.entryPrice) * parseFloat(t.quantity) > 10000)
    .map((t) => t.id);
  if (bigSizeIds.length >= 2) {
    patterns.push(buildPattern("position_sizing_mistake", bigSizeIds, sorted));
  }

  return patterns;
}

function buildPattern(type: BehaviorType, tradeIds: number[], all: Trade[]): DetectedPattern {
  const meta = PATTERN_META[type];
  const impact = all
    .filter((t) => tradeIds.includes(t.id))
    .reduce((s, t) => s + Math.min(0, parseFloat(t.pnl ?? "0")), 0);
  return {
    type,
    severity: meta.severity,
    description: meta.description,
    occurrences: tradeIds.length,
    impactOnPnl: Math.round(impact * 100) / 100,
    recommendation: meta.recommendation,
    exampleTradeIds: tradeIds.slice(0, 5),
  };
}

export async function syncBehaviorPatterns(): Promise<void> {
  const closed = await db.select().from(tradesTable).where(eq(tradesTable.status, "closed"));
  const detected = detectBehaviorPatterns(closed);

  await db.delete(behaviorPatternsTable);

  for (const p of detected) {
    await db.insert(behaviorPatternsTable).values({
      type: p.type,
      severity: p.severity,
      description: p.description,
      occurrences: p.occurrences,
      impactOnPnl: String(p.impactOnPnl),
      recommendation: p.recommendation,
      exampleTradeIds: p.exampleTradeIds,
    });
  }
}
