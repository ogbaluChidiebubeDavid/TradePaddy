import { pgTable, text, serial, timestamp, numeric, integer, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const coachingReportsTable = pgTable("coaching_reports", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // daily | weekly | monthly
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  keyInsights: json("key_insights").$type<string[]>().default([]),
  topMistakes: json("top_mistakes").$type<string[]>().default([]),
  improvements: json("improvements").$type<string[]>().default([]),
  recommendations: json("recommendations").$type<string[]>().default([]),
  tradingScore: numeric("trading_score", { precision: 5, scale: 2 }).notNull(),
  winRate: numeric("win_rate", { precision: 5, scale: 2 }),
  totalTrades: integer("total_trades"),
  totalPnl: numeric("total_pnl", { precision: 20, scale: 8 }),
  periodStart: timestamp("period_start", { withTimezone: true }).notNull(),
  periodEnd: timestamp("period_end", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertCoachingReportSchema = createInsertSchema(coachingReportsTable).omit({ id: true, createdAt: true });
export type InsertCoachingReport = z.infer<typeof insertCoachingReportSchema>;
export type CoachingReport = typeof coachingReportsTable.$inferSelect;
