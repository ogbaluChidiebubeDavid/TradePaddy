import { pgTable, text, serial, timestamp, numeric, integer, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const tradeReplaysTable = pgTable("trade_replays", {
  id: serial("id").primaryKey(),
  tradeId: integer("trade_id").notNull(),
  journalEntryId: integer("journal_entry_id"),
  asset: text("asset").notNull(),
  entryDate: text("entry_date").notNull(),
  entryPrice: numeric("entry_price", { precision: 20, scale: 8 }).notNull(),
  exitPrice: numeric("exit_price", { precision: 20, scale: 8 }).notNull(),
  direction: text("direction").notNull(),
  marketContext: text("market_context").notNull(),
  newsEvents: json("news_events").$type<string[]>().default([]),
  sentimentConditions: text("sentiment_conditions").notNull(),
  whaleActivity: text("whale_activity").notNull(),
  technicalIndicators: json("technical_indicators").$type<Record<string, unknown>>().default({}),
  userReasoning: text("user_reasoning").notNull(),
  aiRecommendation: text("ai_recommendation").notNull(),
  actualOutcome: text("actual_outcome").notNull(),
  lessonsLearned: text("lessons_learned").notNull(),
  pnl: numeric("pnl", { precision: 20, scale: 8 }).notNull(),
  pnlPercent: numeric("pnl_percent", { precision: 10, scale: 4 }).notNull(),
  behaviorFlags: json("behavior_flags").$type<string[]>().default([]),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertTradeReplaySchema = createInsertSchema(tradeReplaysTable).omit({ id: true, createdAt: true });
export type InsertTradeReplay = z.infer<typeof insertTradeReplaySchema>;
export type TradeReplay = typeof tradeReplaysTable.$inferSelect;
