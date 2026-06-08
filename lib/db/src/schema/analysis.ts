import { pgTable, text, serial, timestamp, numeric, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const marketAnalysesTable = pgTable("market_analyses", {
  id: serial("id").primaryKey(),
  asset: text("asset").notNull(),
  bullishScore: numeric("bullish_score", { precision: 5, scale: 2 }).notNull(),
  bearishScore: numeric("bearish_score", { precision: 5, scale: 2 }).notNull(),
  confidenceScore: numeric("confidence_score", { precision: 5, scale: 2 }).notNull(),
  riskScore: numeric("risk_score", { precision: 5, scale: 2 }).notNull(),
  recommendation: text("recommendation").notNull(), // buy | sell | wait | hold
  summary: text("summary").notNull(),
  evidence: json("evidence").$type<string[]>().default([]),
  riskAnalysis: text("risk_analysis").notNull(),
  macroSignals: json("macro_signals").$type<Record<string, unknown>>().default({}),
  sentimentSignals: json("sentiment_signals").$type<Record<string, unknown>>().default({}),
  technicalSignals: json("technical_signals").$type<Record<string, unknown>>().default({}),
  onchainSignals: json("onchain_signals").$type<Record<string, unknown>>().default({}),
  newsSignals: json("news_signals").$type<Record<string, unknown>>().default({}),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertMarketAnalysisSchema = createInsertSchema(marketAnalysesTable).omit({ id: true, createdAt: true });
export type InsertMarketAnalysis = z.infer<typeof insertMarketAnalysisSchema>;
export type MarketAnalysis = typeof marketAnalysesTable.$inferSelect;
