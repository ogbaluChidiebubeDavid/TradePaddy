import { pgTable, text, serial, timestamp, numeric, integer, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const behaviorPatternsTable = pgTable("behavior_patterns", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // fomo_trading | revenge_trading | overtrading | holding_losers | cutting_winners_early | ignoring_stop_loss | position_sizing_mistake
  severity: text("severity").notNull(), // low | medium | high | critical
  description: text("description").notNull(),
  occurrences: integer("occurrences").notNull().default(0),
  impactOnPnl: numeric("impact_on_pnl", { precision: 20, scale: 8 }).notNull().default("0"),
  recommendation: text("recommendation").notNull(),
  exampleTradeIds: json("example_trade_ids").$type<number[]>().default([]),
  detectedAt: timestamp("detected_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertBehaviorPatternSchema = createInsertSchema(behaviorPatternsTable).omit({ id: true });
export type InsertBehaviorPattern = z.infer<typeof insertBehaviorPatternSchema>;
export type BehaviorPattern = typeof behaviorPatternsTable.$inferSelect;
