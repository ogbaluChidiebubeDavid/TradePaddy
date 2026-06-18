import { pgTable, text, serial, timestamp, numeric, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const tradesTable = pgTable("trades", {
  id: serial("id").primaryKey(),
  asset: text("asset").notNull(),
  direction: text("direction").notNull(), // long | short
  entryPrice: numeric("entry_price", { precision: 20, scale: 8 }).notNull(),
  exitPrice: numeric("exit_price", { precision: 20, scale: 8 }),
  quantity: numeric("quantity", { precision: 20, scale: 8 }).notNull(),
  status: text("status").notNull().default("open"), // open | closed
  entryReason: text("entry_reason").notNull(),
  exitReason: text("exit_reason"),
  marketConditions: text("market_conditions").notNull(),
  aiRecommendation: text("ai_recommendation").notNull(), // buy | sell | wait | hold
  userAction: text("user_action").notNull(), // followed | ignored | partial
  pnl: numeric("pnl", { precision: 20, scale: 8 }),
  pnlPercent: numeric("pnl_percent", { precision: 10, scale: 4 }),
  stopLoss: numeric("stop_loss", { precision: 20, scale: 8 }),
  takeProfit: numeric("take_profit", { precision: 20, scale: 8 }),
  isReal: boolean("is_real").notNull().default(false),
  orderType: text("order_type").notNull().default("market"), // market | limit
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  closedAt: timestamp("closed_at", { withTimezone: true }),
});

export const insertTradeSchema = createInsertSchema(tradesTable).omit({ id: true });
export type InsertTrade = z.infer<typeof insertTradeSchema>;
export type Trade = typeof tradesTable.$inferSelect;
