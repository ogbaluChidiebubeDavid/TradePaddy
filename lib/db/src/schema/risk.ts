import { pgTable, text, serial, timestamp, numeric, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const riskReportsTable = pgTable("risk_reports", {
  id: serial("id").primaryKey(),
  riskScore: numeric("risk_score", { precision: 5, scale: 2 }).notNull(),
  portfolioHealthScore: numeric("portfolio_health_score", { precision: 5, scale: 2 }).notNull(),
  maxExposureWarnings: json("max_exposure_warnings").$type<string[]>().default([]),
  stopLossSuggestions: json("stop_loss_suggestions").$type<Array<{ asset: string; suggestedStopLoss: number; currentPrice: number }>>().default([]),
  positionSizeSuggestions: json("position_size_suggestions").$type<Array<{ asset: string; currentSize: number; suggestedSize: number }>>().default([]),
  concentrationRisks: json("concentration_risks").$type<string[]>().default([]),
  summary: text("summary").notNull(),
  recommendations: json("recommendations").$type<string[]>().default([]),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertRiskReportSchema = createInsertSchema(riskReportsTable).omit({ id: true, createdAt: true });
export type InsertRiskReport = z.infer<typeof insertRiskReportSchema>;
export type RiskReport = typeof riskReportsTable.$inferSelect;
