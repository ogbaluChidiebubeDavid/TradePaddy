import { Router } from "express";
import { eq, desc } from "drizzle-orm";
import { db, chatSessionsTable, chatMessagesTable, tradesTable, behaviorPatternsTable } from "@workspace/db";
import { GetChatMessagesParams, SendChatMessageParams, SendChatMessageBody } from "@workspace/api-zod";
import { generateChatResponse } from "../lib/ai";

const router = Router();

router.get("/chat", async (_req, res): Promise<void> => {
  const sessions = await db.select().from(chatSessionsTable).orderBy(desc(chatSessionsTable.updatedAt)).limit(20);

  const result = await Promise.all(
    sessions.map(async (s) => {
      const messages = await db
        .select()
        .from(chatMessagesTable)
        .where(eq(chatMessagesTable.sessionId, s.id));
      return {
        id: s.id,
        title: s.title,
        messageCount: messages.length,
        createdAt: s.createdAt.toISOString(),
        updatedAt: s.updatedAt.toISOString(),
      };
    })
  );

  res.json(result);
});

router.post("/chat", async (_req, res): Promise<void> => {
  const [session] = await db
    .insert(chatSessionsTable)
    .values({ title: "New Chat" })
    .returning();

  res.status(201).json({
    id: session.id,
    title: session.title,
    messageCount: 0,
    createdAt: session.createdAt.toISOString(),
    updatedAt: session.updatedAt.toISOString(),
  });
});

router.get("/chat/:sessionId/messages", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.sessionId) ? req.params.sessionId[0] : req.params.sessionId;
  const params = GetChatMessagesParams.safeParse({ sessionId: raw });
  if (!params.success) {
    res.status(400).json({ error: "Invalid sessionId" });
    return;
  }

  const messages = await db
    .select()
    .from(chatMessagesTable)
    .where(eq(chatMessagesTable.sessionId, params.data.sessionId))
    .orderBy(chatMessagesTable.createdAt);

  res.json(messages.map((m) => ({ ...m, createdAt: m.createdAt.toISOString() })));
});

router.post("/chat/:sessionId/messages", async (req, res): Promise<void> => {
  const rawId = Array.isArray(req.params.sessionId) ? req.params.sessionId[0] : req.params.sessionId;
  const params = SendChatMessageParams.safeParse({ sessionId: rawId });
  if (!params.success) {
    res.status(400).json({ error: "Invalid sessionId" });
    return;
  }

  const parsed = SendChatMessageBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const sessionId = params.data.sessionId;

  // Store user message
  const [userMsg] = await db
    .insert(chatMessagesTable)
    .values({ sessionId, role: "user", content: parsed.data.content })
    .returning();

  // Get history for context
  const history = await db
    .select()
    .from(chatMessagesTable)
    .where(eq(chatMessagesTable.sessionId, sessionId))
    .orderBy(chatMessagesTable.createdAt)
    .limit(10);

  // Get portfolio context
  const [trades, patterns] = await Promise.all([
    db.select().from(tradesTable).limit(50),
    db.select().from(behaviorPatternsTable),
  ]);

  const closedTrades = trades.filter((t) => t.status === "closed");
  const totalPnl = closedTrades.reduce((sum, t) => sum + parseFloat(t.pnl ?? "0"), 0);
  const wins = closedTrades.filter((t) => parseFloat(t.pnl ?? "0") > 0).length;
  const winRate = closedTrades.length > 0 ? (wins / closedTrades.length) * 100 : 0;
  const openPositions = trades.filter((t) => t.status === "open").length;

  const aiContent = await generateChatResponse(
    parsed.data.content,
    history.slice(0, -1).map((m) => ({ role: m.role, content: m.content })),
    {
      portfolioValue: 100000 + totalPnl,
      winRate,
      totalPnl,
      openPositions,
      recentPatterns: patterns.slice(0, 3).map((p) => p.type),
    }
  );

  // Store AI response
  const [assistantMsg] = await db
    .insert(chatMessagesTable)
    .values({ sessionId, role: "assistant", content: aiContent })
    .returning();

  // Update session title from first user message
  if (history.length <= 1) {
    const title = parsed.data.content.slice(0, 50) + (parsed.data.content.length > 50 ? "..." : "");
    await db.update(chatSessionsTable).set({ title, updatedAt: new Date() }).where(eq(chatSessionsTable.id, sessionId));
  } else {
    await db.update(chatSessionsTable).set({ updatedAt: new Date() }).where(eq(chatSessionsTable.id, sessionId));
  }

  res.status(201).json({
    userMessage: { ...userMsg, createdAt: userMsg.createdAt.toISOString() },
    assistantMessage: { ...assistantMsg, createdAt: assistantMsg.createdAt.toISOString() },
  });
});

export default router;
