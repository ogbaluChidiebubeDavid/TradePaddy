import { pgTable, text, serial, timestamp, numeric, integer, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const journalEntriesTable = pgTable("journal_entries", {
  id: serial("id").primaryKey(),
  tradeId: integer("trade_id").notNull(),
  asset: text("asset").notNull(),
  direction: text("direction").notNull(),
  entryPrice: numeric("entry_price", { precision: 20, scale: 8 }).notNull(),
  exitPrice: numeric("exit_price", { precision: 20, scale: 8 }).notNull(),
  entryReason: text("entry_reason").notNull(),
  exitReason: text("exit_reason"),
  marketConditions: text("market_conditions").notNull(),
  aiRecommendation: text("ai_recommendation").notNull(),
  userAction: text("user_action").notNull(),
  result: text("result").notNull(), // win | loss | breakeven
  pnl: numeric("pnl", { precision: 20, scale: 8 }).notNull(),
  pnlPercent: numeric("pnl_percent", { precision: 10, scale: 4 }).notNull(),
  lessonsLearned: text("lessons_learned"),
  notes: text("notes"),
  behaviorFlags: json("behavior_flags").$type<string[]>().default([]),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertJournalEntrySchema = createInsertSchema(journalEntriesTable).omit({ id: true, createdAt: true });
export type InsertJournalEntry = z.infer<typeof insertJournalEntrySchema>;
export type JournalEntry = typeof journalEntriesTable.$inferSelect;
