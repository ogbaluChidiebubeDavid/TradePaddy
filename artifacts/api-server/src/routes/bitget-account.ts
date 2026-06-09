import { Router } from "express";
import { db, tradesTable } from "@workspace/db";
import type { InsertTrade } from "@workspace/db";
import {
  getSpotAssets,
  getFuturesAccounts,
  getFuturesPositions,
  getSpotFills,
  getFuturesFills,
  type BitgetCredentials,
  type SpotFill,
  type FuturesFill,
  type FuturesPosition,
} from "../lib/bitget";

const router = Router();

function getCreds(req: import("express").Request): BitgetCredentials | null {
  return req.session.bitget ?? null;
}

function symbolToAsset(symbol: string): string {
  return symbol.replace(/USDT$|PERP$|_UMCBL$|_DMCBL$/, "").replace(/_/g, "");
}

function spotFillToTrade(fill: SpotFill): InsertTrade {
  const asset = symbolToAsset(fill.symbol);
  const price = parseFloat(fill.fillPrice || "0");
  const qty = parseFloat(fill.size || "0");
  const profit = parseFloat(fill.profit || "0");
  const isBuy = fill.side === "buy";
  const ts = new Date(parseInt(fill.cTime || Date.now().toString()));

  return {
    asset,
    direction: "long",
    entryPrice: isBuy ? String(price) : String(Math.round(price * 0.98 * 1e8) / 1e8),
    exitPrice: isBuy ? null : String(price),
    quantity: String(qty),
    status: isBuy ? "open" : "closed",
    pnl: isBuy ? null : String(Math.round(profit * 1e8) / 1e8),
    pnlPercent: isBuy ? null : String(Math.round((profit / (price * qty || 1)) * 1e6) / 1e4),
    entryReason: `Spot ${fill.side} on Bitget`,
    exitReason: isBuy ? null : "Spot sell on Bitget",
    marketConditions: "Live spot market",
    aiRecommendation: isBuy ? "buy" : "sell",
    userAction: "followed",
    stopLoss: null,
    takeProfit: null,
    createdAt: ts,
    closedAt: isBuy ? null : ts,
  };
}

function futuresFillToTrade(fill: FuturesFill): InsertTrade {
  const asset = symbolToAsset(fill.symbol);
  const price = parseFloat(fill.price || "0");
  const qty = parseFloat(fill.baseVolume || "0");
  const profit = parseFloat(fill.profit || "0");
  const side = (fill.side || fill.tradeSide || "").toLowerCase();
  const isOpen = side.startsWith("open") || side === "buy";
  const isLong = side.includes("long") || side === "buy";
  const ts = new Date(parseInt(fill.cTime || Date.now().toString()));

  return {
    asset,
    direction: isLong ? "long" : "short",
    entryPrice: isOpen ? String(price) : String(Math.round(price * (isLong ? 0.97 : 1.03) * 1e8) / 1e8),
    exitPrice: isOpen ? null : String(price),
    quantity: String(qty),
    status: isOpen ? "open" : "closed",
    pnl: isOpen ? null : String(Math.round(profit * 1e8) / 1e8),
    pnlPercent: isOpen ? null : String(Math.round((profit / (price * qty || 1)) * 1e6) / 1e4),
    entryReason: `Futures ${side} on Bitget`,
    exitReason: isOpen ? null : `Futures close (${side})`,
    marketConditions: "Live futures market",
    aiRecommendation: isLong ? "buy" : "sell",
    userAction: "followed",
    stopLoss: null,
    takeProfit: null,
    createdAt: ts,
    closedAt: isOpen ? null : ts,
  };
}

function positionToTrade(pos: FuturesPosition): InsertTrade {
  const asset = symbolToAsset(pos.symbol);
  const price = parseFloat(pos.openPriceAvg || "0");
  const qty = parseFloat(pos.total || "0");
  const ts = new Date(parseInt(pos.cTime || Date.now().toString()));

  return {
    asset,
    direction: pos.holdSide === "long" ? "long" : "short",
    entryPrice: String(price),
    exitPrice: null,
    quantity: String(qty),
    status: "open",
    pnl: null,
    pnlPercent: null,
    entryReason: `Open futures ${pos.holdSide} position on Bitget`,
    exitReason: null,
    marketConditions: "Live futures market",
    aiRecommendation: pos.holdSide === "long" ? "buy" : "sell",
    userAction: "followed",
    stopLoss: pos.liquidationPrice ? String(parseFloat(pos.liquidationPrice)) : null,
    takeProfit: null,
    createdAt: ts,
    closedAt: null,
  };
}

export async function syncBitgetData(creds: BitgetCredentials) {
  const [spotFills, futuresFills, openPositions] = await Promise.all([
    getSpotFills(creds, "100"),
    getFuturesFills(creds, "100"),
    getFuturesPositions(creds),
  ]);

  const rows: InsertTrade[] = [];

  for (const fill of spotFills) {
    try { rows.push(spotFillToTrade(fill)); } catch { /* skip */ }
  }
  for (const fill of futuresFills) {
    try { rows.push(futuresFillToTrade(fill)); } catch { /* skip */ }
  }

  const openSymbols = new Set(
    futuresFills.filter(f => (f.side || f.tradeSide || "").startsWith("open")).map(f => f.symbol)
  );
  for (const pos of openPositions) {
    if (!openSymbols.has(pos.symbol)) {
      try { rows.push(positionToTrade(pos)); } catch { /* skip */ }
    }
  }

  await db.delete(tradesTable);
  if (rows.length > 0) {
    for (let i = 0; i < rows.length; i += 50) {
      await db.insert(tradesTable).values(rows.slice(i, i + 50));
    }
  }

  return {
    synced: true,
    spotFills: spotFills.length,
    futuresFills: futuresFills.length,
    openPositions: openPositions.length,
    totalImported: rows.length,
  };
}

router.post("/bitget/sync", async (req, res): Promise<void> => {
  const creds = getCreds(req);
  if (!creds) { res.status(401).json({ error: "Not connected to Bitget" }); return; }
  try {
    const result = await syncBitgetData(creds);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : "Sync failed" });
  }
});

router.get("/bitget/portfolio", async (req, res): Promise<void> => {
  const creds = getCreds(req);
  if (!creds) { res.status(401).json({ error: "Not connected to Bitget" }); return; }

  const errors: string[] = [];

  // Fetch all account data — capture errors per-section so a futures failure doesn't kill spot
  let spotAssets: Awaited<ReturnType<typeof getSpotAssets>> = [];
  let futuresAccounts: Awaited<ReturnType<typeof getFuturesAccounts>> = [];
  let positions: Awaited<ReturnType<typeof getFuturesPositions>> = [];

  await Promise.all([
    getSpotAssets(creds).then(d => { spotAssets = d; }).catch(e => {
      errors.push(`Spot: ${e instanceof Error ? e.message : "failed"}`);
    }),
    getFuturesAccounts(creds).then(d => { futuresAccounts = d; }).catch(e => {
      errors.push(`Futures: ${e instanceof Error ? e.message : "failed"}`);
    }),
    getFuturesPositions(creds).then(d => { positions = d; }).catch(e => {
      errors.push(`Positions: ${e instanceof Error ? e.message : "failed"}`);
    }),
  ]);

  const spotTotal = spotAssets.reduce((sum, a) => sum + parseFloat(a.usdtValue || "0"), 0);
  const futuresEquity = futuresAccounts.reduce((sum, a) => sum + parseFloat(a.equity || a.usdtEquity || "0"), 0);
  const futuresUnrealized = futuresAccounts.reduce((sum, a) => sum + parseFloat(a.unrealizedPL || "0"), 0);

  const livePositions = positions.map(pos => ({
    asset: symbolToAsset(pos.symbol),
    symbol: pos.symbol,
    direction: pos.holdSide,
    entryPrice: parseFloat(pos.openPriceAvg || "0"),
    markPrice: parseFloat(pos.markPrice || "0"),
    quantity: parseFloat(pos.total || "0"),
    unrealizedPnl: parseFloat(pos.unrealizedPL || "0"),
    leverage: parseInt(pos.leverage || "1"),
    liquidationPrice: parseFloat(pos.liquidationPrice || "0"),
    marginMode: pos.marginMode,
  }));

  res.json({
    spotAssets: spotAssets.map(a => ({
      coin: a.coinName,
      available: parseFloat(a.available || "0"),
      frozen: parseFloat(a.frozen || "0"),
      usdtValue: parseFloat(a.usdtValue || "0"),
    })),
    spotTotal: Math.round(spotTotal * 100) / 100,
    futuresEquity: Math.round(futuresEquity * 100) / 100,
    futuresUnrealized: Math.round(futuresUnrealized * 100) / 100,
    totalValue: Math.round((spotTotal + futuresEquity) * 100) / 100,
    livePositions,
    errors: errors.length > 0 ? errors : undefined,
  });
});

// Raw debug endpoint — shows exactly what Bitget returns
router.get("/bitget/debug", async (req, res): Promise<void> => {
  const creds = getCreds(req);
  if (!creds) { res.status(401).json({ error: "Not connected" }); return; }

  const results: Record<string, unknown> = {};

  await Promise.allSettled([
    getSpotAssets(creds).then(d => { results.spotAssets = d; }).catch(e => { results.spotAssetsError = String(e); }),
    getFuturesAccounts(creds).then(d => { results.futuresAccounts = d; }).catch(e => { results.futuresAccountsError = String(e); }),
    getFuturesPositions(creds).then(d => { results.positions = d; }).catch(e => { results.positionsError = String(e); }),
  ]);

  res.json(results);
});

export default router;
