import { Router } from "express";
import { eq, desc } from "drizzle-orm";
import { db, chatSessionsTable, chatMessagesTable, tradesTable, behaviorPatternsTable } from "@workspace/db";
import { GetChatMessagesParams, SendChatMessageParams, SendChatMessageBody } from "@workspace/api-zod";
import { generateChatResponse } from "../lib/ai";
import { getSpotAssets, getFuturesAccounts, getFuturesPositions, type BitgetCredentials } from "../lib/bitget";

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

  // Check if user is referencing a trade link or ID
  let referencedTrade: any = undefined;
  const tradeIdMatch = parsed.data.content.match(/(?:share\/trade\/|trade\/|trade\s+#?|#)(\d+)/i);
  if (tradeIdMatch) {
    const tradeId = parseInt(tradeIdMatch[1], 10);
    if (!isNaN(tradeId)) {
      const [trade] = await db
        .select()
        .from(tradesTable)
        .where(eq(tradesTable.id, tradeId))
        .limit(1);
      if (trade) {
        referencedTrade = trade;
      }
    }
  }

  // Get real trade data from DB (synced from Bitget)
  const [trades, patterns] = await Promise.all([
    db.select().from(tradesTable).orderBy(desc(tradesTable.createdAt)).limit(100),
    db.select().from(behaviorPatternsTable),
  ]);

  const closedTrades = trades.filter((t) => t.status === "closed");
  const openTrades = trades.filter((t) => t.status === "open");
  const totalPnl = closedTrades.reduce((sum, t) => sum + parseFloat(t.pnl ?? "0"), 0);
  const wins = closedTrades.filter((t) => parseFloat(t.pnl ?? "0") > 0).length;
  const winRate = closedTrades.length > 0 ? (wins / closedTrades.length) * 100 : 0;

  // Asset breakdown
  const assetPnlMap = new Map<string, number>();
  for (const t of closedTrades) {
    assetPnlMap.set(t.asset, (assetPnlMap.get(t.asset) ?? 0) + parseFloat(t.pnl ?? "0"));
  }
  const topAssets = [...assetPnlMap.entries()]
    .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
    .slice(0, 5)
    .map(([asset, pnl]) => `${asset}: ${pnl >= 0 ? "+" : ""}${pnl.toFixed(2)} USDT`);

  // Fetch live Bitget portfolio if connected
  let livePortfolio = "";
  let portfolioValue: number | undefined = undefined;
  const creds = req.session.bitget as BitgetCredentials | undefined;
  if (creds) {
    try {
      const [spotAssets, futuresAccounts, positions] = await Promise.all([
        getSpotAssets(creds),
        getFuturesAccounts(creds),
        getFuturesPositions(creds),
      ]);
      const spotTotal = spotAssets.reduce((s, a) => s + parseFloat(a.usdtValue || "0"), 0);
      const futuresEquity = futuresAccounts.reduce((s, a) => s + parseFloat(a.equity || "0"), 0);
      portfolioValue = spotTotal + futuresEquity;
      const spotStr = spotAssets
        .filter(a => parseFloat(a.usdtValue || "0") > 1)
        .map(a => `${a.coinName}: ${parseFloat(a.available || "0").toFixed(4)} (~$${parseFloat(a.usdtValue || "0").toFixed(2)})`)
        .join(", ");
      const posStr = positions
        .map(p => `${p.symbol} ${p.holdSide} x${p.leverage} | Entry: $${parseFloat(p.openPriceAvg).toFixed(4)} | PnL: ${parseFloat(p.unrealizedPL || "0") >= 0 ? "+" : ""}$${parseFloat(p.unrealizedPL || "0").toFixed(2)}`)
        .join("; ");
      livePortfolio = `\nLIVE BITGET PORTFOLIO:\n- Spot balance: $${spotTotal.toFixed(2)} USDT total | Holdings: ${spotStr || "none"}\n- Futures equity: $${futuresEquity.toFixed(2)} USDT\n- Open positions: ${positions.length > 0 ? posStr : "none"}`;
    } catch { /* skip if fails */ }
  }

  const recentTrades = closedTrades.slice(0, 10).map(t =>
    `${t.asset} ${t.direction} | Entry: $${parseFloat(t.entryPrice).toFixed(4)} | Exit: $${parseFloat(t.exitPrice ?? t.entryPrice).toFixed(4)} | PnL: ${parseFloat(t.pnl ?? "0") >= 0 ? "+" : ""}$${parseFloat(t.pnl ?? "0").toFixed(2)}`
  ).join("\n");

  const openPositionsStr = openTrades.map(t =>
    `${t.asset} ${t.direction} | Entry: $${parseFloat(t.entryPrice).toFixed(4)} | Qty: ${t.quantity}`
  ).join(", ");

  const enrichedContext = {
    portfolioValue, // will be set from live data if available
    winRate: Math.round(winRate * 10) / 10,
    totalPnl: Math.round(totalPnl * 100) / 100,
    totalTrades: closedTrades.length,
    openPositions: openTrades.length,
    recentPatterns: patterns.slice(0, 5).map((p) => `${p.type} (${p.severity}): ${p.description}`),
    topAssets,
    recentTrades,
    openPositionsStr,
    livePortfolio,
    dataSource: creds ? "Real Bitget account data" : "Demo data",
    referencedTrade,
  };

  const aiContent = await generateChatResponse(
    parsed.data.content,
    history.slice(0, -1).map((m) => ({ role: m.role, content: m.content })),
    enrichedContext,
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
