import { Router } from "express";
import { eq, desc } from "drizzle-orm";
import { db, journalEntriesTable } from "@workspace/db";
import {
  ListJournalEntriesQueryParams,
  GetJournalEntryParams,
  UpdateJournalEntryParams,
  UpdateJournalEntryBody,
} from "@workspace/api-zod";

const router = Router();

router.get("/journal", async (req, res): Promise<void> => {
  const parsed = ListJournalEntriesQueryParams.safeParse(req.query);
  const asset = parsed.success ? parsed.data.asset : undefined;
  const limit = parsed.success && parsed.data.limit ? parsed.data.limit : 100;

  let query = db.select().from(journalEntriesTable).$dynamic();
  if (asset) query = query.where(eq(journalEntriesTable.asset, asset.toUpperCase()));

  const entries = await query.orderBy(desc(journalEntriesTable.createdAt)).limit(limit);
  res.json(entries.map(formatEntry));
});

router.get("/journal/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetJournalEntryParams.safeParse({ id: raw });
  if (!params.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const [entry] = await db.select().from(journalEntriesTable).where(eq(journalEntriesTable.id, params.data.id));
  if (!entry) {
    res.status(404).json({ error: "Journal entry not found" });
    return;
  }
  res.json(formatEntry(entry));
});

router.patch("/journal/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = UpdateJournalEntryParams.safeParse({ id: raw });
  if (!params.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const parsed = UpdateJournalEntryBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [updated] = await db
    .update(journalEntriesTable)
    .set({
      notes: parsed.data.notes,
      lessonsLearned: parsed.data.lessonsLearned,
    })
    .where(eq(journalEntriesTable.id, params.data.id))
    .returning();

  if (!updated) {
    res.status(404).json({ error: "Entry not found" });
    return;
  }
  res.json(formatEntry(updated));
});

function formatEntry(e: typeof journalEntriesTable.$inferSelect) {
  return {
    id: e.id,
    tradeId: e.tradeId,
    asset: e.asset,
    direction: e.direction,
    entryPrice: parseFloat(e.entryPrice),
    exitPrice: parseFloat(e.exitPrice),
    entryReason: e.entryReason,
    exitReason: e.exitReason ?? null,
    marketConditions: e.marketConditions,
    aiRecommendation: e.aiRecommendation,
    userAction: e.userAction,
    result: e.result,
    pnl: parseFloat(e.pnl),
    pnlPercent: parseFloat(e.pnlPercent),
    lessonsLearned: e.lessonsLearned ?? null,
    notes: e.notes ?? null,
    behaviorFlags: (e.behaviorFlags as string[]) ?? [],
    createdAt: e.createdAt.toISOString(),
  };
}

export default router;
