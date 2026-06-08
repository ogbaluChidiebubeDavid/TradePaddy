import { pgTable, text, serial, timestamp, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const portfolioSnapshotsTable = pgTable("portfolio_snapshots", {
  id: serial("id").primaryKey(),
  totalValue: numeric("total_value", { precision: 20, scale: 8 }).notNull(),
  totalPnl: numeric("total_pnl", { precision: 20, scale: 8 }).notNull(),
  cashBalance: numeric("cash_balance", { precision: 20, scale: 8 }).notNull(),
  investedValue: numeric("invested_value", { precision: 20, scale: 8 }).notNull(),
  timestamp: timestamp("timestamp", { withTimezone: true }).notNull().defaultNow(),
});

export const insertPortfolioSnapshotSchema = createInsertSchema(portfolioSnapshotsTable).omit({ id: true });
export type InsertPortfolioSnapshot = z.infer<typeof insertPortfolioSnapshotSchema>;
export type PortfolioSnapshot = typeof portfolioSnapshotsTable.$inferSelect;
