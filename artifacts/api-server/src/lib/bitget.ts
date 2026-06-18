import * as crypto from "crypto";

const BITGET_BASE = "https://api.bitget.com";

export interface BitgetCredentials {
  apiKey: string;
  secretKey: string;
  passphrase: string;
}

// No global fallback flag to prevent network hiccups from locking into mock mode permanently

function isMock(creds: BitgetCredentials): boolean {
  return (
    creds.apiKey?.startsWith("bg_test") ||
    creds.apiKey?.startsWith("mock") ||
    creds.secretKey?.startsWith("bg_test") ||
    creds.passphrase?.startsWith("bg_test")
  );
}

function sign(message: string, secretKey: string): string {
  return crypto.createHmac("sha256", secretKey).update(message).digest("base64");
}

function buildHeaders(creds: BitgetCredentials, method: string, requestPath: string, bodyStr = "") {
  const timestamp = Date.now().toString();
  const prehash = timestamp + method.toUpperCase() + requestPath + bodyStr;
  return {
    "ACCESS-KEY": creds.apiKey,
    "ACCESS-SIGN": sign(prehash, creds.secretKey),
    "ACCESS-TIMESTAMP": timestamp,
    "ACCESS-PASSPHRASE": creds.passphrase,
    "Content-Type": "application/json",
    locale: "en-US",
  };
}

async function bitgetRequest(
  creds: BitgetCredentials,
  method: string,
  path: string,
  params?: Record<string, string>,
  body?: unknown,
): Promise<unknown> {
  let requestPath = path;
  if (params && Object.keys(params).length > 0) {
    requestPath += "?" + new URLSearchParams(params).toString();
  }
  const bodyStr = body ? JSON.stringify(body) : "";
  const headers = buildHeaders(creds, method, requestPath, bodyStr);

  const res = await fetch(BITGET_BASE + requestPath, {
    method,
    headers,
    body: bodyStr || undefined,
  });

  const data = (await res.json()) as { code: string; msg: string; data: unknown };
  if (data.code !== "00000") {
    throw new Error(`${data.msg} (code: ${data.code})`);
  }
  return data.data;
}

async function getPricesMap(): Promise<Map<string, number>> {
  const pricesMap = new Map<string, number>();
  pricesMap.set("USDT", 1.0);
  pricesMap.set("USDC", 1.0);
  try {
    const tickersRes = await fetch("https://api.bitget.com/api/v2/spot/market/tickers");
    const tickersData = await tickersRes.json() as { code: string; data?: any[] };
    if (tickersData.code === "00000" && Array.isArray(tickersData.data)) {
      for (const t of tickersData.data) {
        if (t.symbol.endsWith("USDT")) {
          const coin = t.symbol.replace(/USDT$/, "");
          pricesMap.set(coin, parseFloat(t.lastPr || "0"));
        }
      }
    }
  } catch (priceErr) {
    console.warn("Failed to fetch spot prices for valuation:", priceErr);
  }
  return pricesMap;
}

function formatSpotAssets(assets: any[], pricesMap: Map<string, number>): SpotAsset[] {
  return assets
    .filter(a => parseFloat(a.available || "0") > 0 || parseFloat(a.frozen || "0") > 0)
    .map(a => {
      const coin = a.coin || a.coinName || "";
      const available = parseFloat(a.available || "0");
      const frozen = parseFloat(a.frozen || "0");
      const price = pricesMap.get(coin) ?? 0;
      const usdtValue = (available + frozen) * price;
      return {
        coin,
        coinName: coin,
        available: a.available || "0",
        frozen: a.frozen || "0",
        locked: a.locked || a.frozen || "0",
        usdtValue: usdtValue.toFixed(4)
      };
    });
}

// ─── Credential Validation ─────────────────────────────────────────────────

export async function validateCredentials(creds: BitgetCredentials): Promise<{
  uid: string;
  spotAssets: SpotAsset[];
}> {
  if (isMock(creds)) {
    const spotAssets: SpotAsset[] = [
      { coin: "USDT", coinName: "USDT", available: "5420.50", frozen: "0.00", locked: "0.00", usdtValue: "5420.50" },
      { coin: "BTC", coinName: "BTC", available: "0.1245", frozen: "0.00", locked: "0.00", usdtValue: "8403.75" },
      { coin: "ETH", coinName: "ETH", available: "1.4500", frozen: "0.00", locked: "0.00", usdtValue: "4930.00" },
      { coin: "SOL", coinName: "SOL", available: "24.5000", frozen: "0.00", locked: "0.00", usdtValue: "3920.00" }
    ];
    return { uid: creds.apiKey.slice(-8) || "87654321", spotAssets };
  }
  const requestPath = "/api/v2/spot/account/assets";
  const headers = buildHeaders(creds, "GET", requestPath);
  try {
    const res = await fetch(BITGET_BASE + requestPath, { headers });
    const data = (await res.json()) as { code: string; msg: string; data: unknown };

    const AUTH_ERROR_CODES = ["40037", "40101", "40102", "40103", "40200", "40203", "40302", "40006"];
    if (AUTH_ERROR_CODES.includes(data.code)) {
      throw new Error(`Invalid Bitget credentials: ${data.msg}`);
    }
    if (data.code !== "00000") {
      throw new Error(`Bitget error: ${data.msg} (code: ${data.code})`);
    }

    const rawAssets = (data.data as any[]) || [];
    const pricesMap = await getPricesMap();
    const spotAssets = formatSpotAssets(rawAssets, pricesMap);
    
    // Fetch actual UID from account info
    let uid = creds.apiKey.slice(-8);
    try {
      const infoData = await bitgetRequest(creds, "GET", "/api/v2/spot/account/info") as Record<string, any>;
      if (infoData && infoData.userId) {
        uid = String(infoData.userId);
      }
    } catch { /* fallback */ }

    return { uid, spotAssets };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "";
    if (msg.includes("Invalid Bitget credentials")) {
      throw err;
    }
    // If using real credentials, throw the error instead of fallback to mock
    if (!isMock(creds)) {
      throw err;
    }
    console.warn("Bitget API network failure for mock credentials:", msg);
    const spotAssets: SpotAsset[] = [
      { coin: "USDT", coinName: "USDT", available: "5420.50", frozen: "0.00", locked: "0.00", usdtValue: "5420.50" },
      { coin: "BTC", coinName: "BTC", available: "0.1245", frozen: "0.00", locked: "0.00", usdtValue: "8403.75" },
      { coin: "ETH", coinName: "ETH", available: "1.4500", frozen: "0.00", locked: "0.00", usdtValue: "4930.00" },
      { coin: "SOL", coinName: "SOL", available: "24.5000", frozen: "0.00", locked: "0.00", usdtValue: "3920.00" }
    ];
    return { uid: creds.apiKey.slice(-8) || "87654321", spotAssets };
  }
}

// ─── User Info ────────────────────────────────────────────────────────────

export interface BitgetUserInfo {
  userId: string;
  nick: string;
}

export async function getUserInfo(creds: BitgetCredentials): Promise<BitgetUserInfo> {
  if (isMock(creds)) {
    return { userId: "87654321", nick: "PaddyTrader_Demo" };
  }
  
  try {
    const data = await bitgetRequest(creds, "GET", "/api/v2/spot/account/info") as Record<string, any>;
    if (data && data.userId) {
      return {
        userId: String(data.userId),
        nick: `Trader ${String(data.userId).slice(-4)}`
      };
    }
  } catch (err) {
    console.error("Failed to fetch v2 spot account info for user info:", err);
  }

  return { userId: creds.apiKey.slice(-8), nick: "Trader" };
}

// ─── Types ────────────────────────────────────────────────────────────────

export interface SpotAsset {
  coin: string;
  coinName: string;
  available: string;
  frozen: string;
  locked: string;
  usdtValue?: string;
}

export interface FuturesAccount {
  marginCoin: string;
  available: string;
  frozen: string;
  unrealizedPL: string;
  equity: string;
  usdtEquity?: string;
}

export interface FuturesPosition {
  symbol: string;
  holdSide: string;
  openPriceAvg: string;
  markPrice: string;
  marginSize: string;
  available: string;
  total: string;
  unrealizedPL: string;
  liquidationPrice: string;
  leverage: string;
  marginMode: string;
  cTime: string;
}

export interface SpotFill {
  tradeId: string;
  orderId: string;
  symbol: string;
  side: string;
  fillPrice: string;
  size: string;
  fillAmount: string;
  profit: string;
  fees: string;
  feeCoin: string;
  cTime: string;
  uTime: string;
}

export interface FuturesFill {
  tradeId: string;
  symbol: string;
  side: string;
  price: string;
  baseVolume: string;
  profit: string;
  tradeSide?: string;
  posMode?: string;
  fees?: string;
  feeCoin?: string;
  cTime: string;
}

// ─── Account Endpoints ────────────────────────────────────────────────────

export async function getSpotAssets(creds: BitgetCredentials): Promise<SpotAsset[]> {
  if (isMock(creds)) {
    return [
      { coin: "USDT", coinName: "USDT", available: "5420.50", frozen: "0.00", locked: "0.00", usdtValue: "5420.50" },
      { coin: "BTC", coinName: "BTC", available: "0.1245", frozen: "0.00", locked: "0.00", usdtValue: "8403.75" },
      { coin: "ETH", coinName: "ETH", available: "1.4500", frozen: "0.00", locked: "0.00", usdtValue: "4930.00" },
      { coin: "SOL", coinName: "SOL", available: "24.5000", frozen: "0.00", locked: "0.00", usdtValue: "3920.00" }
    ];
  }
  try {
    const data = await bitgetRequest(creds, "GET", "/api/v2/spot/account/assets");
    const assets = (data as any[]) || [];
    const pricesMap = await getPricesMap();
    return formatSpotAssets(assets, pricesMap);
  } catch (err) {
    throw new Error(`Spot assets: ${err instanceof Error ? err.message : "failed"}`);
  }
}

const FUTURES_PRODUCT_TYPES = ["USDT-FUTURES", "COIN-FUTURES", "USDT-FUTURES-ISOLATED"];

export async function getFuturesAccounts(creds: BitgetCredentials): Promise<FuturesAccount[]> {
  if (isMock(creds)) {
    return [
      { marginCoin: "USDT", available: "3500.00", frozen: "0.00", unrealizedPL: "245.50", equity: "3745.50", usdtEquity: "3745.50" }
    ];
  }
  const results: FuturesAccount[] = [];
  for (const productType of FUTURES_PRODUCT_TYPES) {
    try {
      const data = await bitgetRequest(creds, "GET", "/api/v2/mix/account/accounts", { productType });
      const accounts = (data as FuturesAccount[]) || [];
      for (const acc of accounts) {
        if (parseFloat(acc.equity || "0") > 0 || parseFloat(acc.available || "0") > 0) {
          results.push(acc);
        }
      }
    } catch { /* skip unsupported product type */ }
  }
  return results;
}

export async function getFuturesPositions(creds: BitgetCredentials): Promise<FuturesPosition[]> {
  if (isMock(creds)) {
    return [
      {
        symbol: "SOLUSDT_UMCBL",
        holdSide: "long",
        openPriceAvg: "154.20",
        markPrice: "162.50",
        marginSize: "300.00",
        available: "30.00",
        total: "30.00",
        unrealizedPL: "249.00",
        liquidationPrice: "135.50",
        leverage: "10",
        marginMode: "isolated",
        cTime: String(Date.now() - 4 * 3600 * 1000)
      },
      {
        symbol: "BTCUSDT_UMCBL",
        holdSide: "short",
        openPriceAvg: "68200.00",
        markPrice: "67950.00",
        marginSize: "500.00",
        available: "0.10",
        total: "0.10",
        unrealizedPL: "25.00",
        liquidationPrice: "72500.00",
        leverage: "20",
        marginMode: "isolated",
        cTime: String(Date.now() - 2 * 3600 * 1000)
      }
    ];
  }
  const results: FuturesPosition[] = [];
  for (const productType of ["USDT-FUTURES", "COIN-FUTURES"]) {
    try {
      const data = await bitgetRequest(creds, "GET", "/api/v2/mix/position/allPosition", {
        productType,
        marginCoin: productType === "USDT-FUTURES" ? "USDT" : "BTC",
      });
      const positions = (data as FuturesPosition[]) || [];
      results.push(...positions.filter(p => parseFloat(p.total || "0") > 0));
    } catch { /* skip */ }
  }
  return results;
}

export async function getSpotFills(creds: BitgetCredentials, limit = "100"): Promise<SpotFill[]> {
  if (isMock(creds)) {
    const baseTime = Date.now();
    return [
      {
        tradeId: "mock_spot_1",
        orderId: "ord_spot_1",
        symbol: "SOLUSDT",
        side: "buy",
        fillPrice: "145.50",
        size: "15.00",
        fillAmount: "2182.50",
        profit: "0.00",
        fees: "2.18",
        feeCoin: "USDT",
        cTime: String(baseTime - 86400 * 1000 * 2),
        uTime: String(baseTime - 86400 * 1000 * 2)
      },
      {
        tradeId: "mock_spot_2",
        orderId: "ord_spot_2",
        symbol: "SOLUSDT",
        side: "sell",
        fillPrice: "168.20",
        size: "15.00",
        fillAmount: "2523.00",
        profit: "340.50",
        fees: "2.52",
        feeCoin: "USDT",
        cTime: String(baseTime - 86400 * 1000),
        uTime: String(baseTime - 86400 * 1000)
      },
      {
        tradeId: "mock_spot_3",
        orderId: "ord_spot_3",
        symbol: "BTCUSDT",
        side: "buy",
        fillPrice: "66500.00",
        size: "0.05",
        fillAmount: "3325.00",
        profit: "0.00",
        fees: "3.32",
        feeCoin: "USDT",
        cTime: String(baseTime - 86400 * 1000 * 4),
        uTime: String(baseTime - 86400 * 1000 * 4)
      }
    ];
  }
  try {
    const data = await bitgetRequest(creds, "GET", "/api/v2/spot/trade/fills", { limit });
    const result = data as { fillList?: SpotFill[] } | SpotFill[];
    if (Array.isArray(result)) return result;
    return (result as { fillList?: SpotFill[] }).fillList || [];
  } catch {
    return [];
  }
}

export async function getFuturesFills(creds: BitgetCredentials, limit = "100"): Promise<FuturesFill[]> {
  if (isMock(creds)) {
    const baseTime = Date.now();
    return [
      {
        tradeId: "mock_fut_1",
        symbol: "SOLUSDT_UMCBL",
        side: "open_long",
        price: "154.20",
        baseVolume: "30.00",
        profit: "0.00",
        tradeSide: "buy",
        cTime: String(baseTime - 4 * 3600 * 1000)
      },
      {
        tradeId: "mock_fut_2",
        symbol: "BTCUSDT_UMCBL",
        side: "open_short",
        price: "68200.00",
        baseVolume: "0.10",
        profit: "0.00",
        tradeSide: "sell",
        cTime: String(baseTime - 2 * 3600 * 1000)
      },
      {
        tradeId: "mock_fut_3",
        symbol: "ETHUSDT_UMCBL",
        side: "open_long",
        price: "3250.00",
        baseVolume: "2.00",
        profit: "0.00",
        tradeSide: "buy",
        cTime: String(baseTime - 86400 * 1000 * 3)
      },
      {
        tradeId: "mock_fut_4",
        symbol: "ETHUSDT_UMCBL",
        side: "close_long",
        price: "3420.00",
        baseVolume: "2.00",
        profit: "340.00",
        tradeSide: "sell",
        cTime: String(baseTime - 86400 * 1000 * 2.8)
      }
    ];
  }
  const results: FuturesFill[] = [];
  for (const productType of ["USDT-FUTURES", "COIN-FUTURES"]) {
    try {
      const data = await bitgetRequest(creds, "GET", "/api/v2/mix/order/fills", { productType, limit });
      const result = data as { fillList?: FuturesFill[] } | FuturesFill[];
      const fills = Array.isArray(result) ? result : ((result as { fillList?: FuturesFill[] }).fillList || []);
      results.push(...fills);
    } catch { /* skip */ }
  }
  return results;
}

export async function placeOrder(
  creds: BitgetCredentials,
  params: {
    symbol: string;
    side: "buy" | "sell";
    orderType: "limit" | "market";
    size: string;
    price?: string;
  },
): Promise<unknown> {
  if (isMock(creds)) {
    return { orderId: "mock_order_" + Math.random().toString(36).substring(7) };
  }
  let symbol = params.symbol.toUpperCase();
  if (!symbol.endsWith("USDT")) {
    symbol = symbol + "USDT";
  }
  return bitgetRequest(creds, "POST", "/api/v2/spot/trade/place-order", undefined, {
    symbol,
    side: params.side,
    orderType: params.orderType,
    size: params.size,
    price: params.price,
    force: "gtc",
  });
}

export async function placeFuturesOrder(
  creds: BitgetCredentials,
  params: {
    symbol: string;
    side: "buy" | "sell";
    orderType: "limit" | "market";
    size: string;
    price?: string;
    tradeSide?: "open" | "close";
  },
): Promise<unknown> {
  if (isMock(creds)) {
    return { orderId: "mock_futures_order_" + Math.random().toString(36).substring(7) };
  }
  let symbol = params.symbol.toUpperCase();
  symbol = symbol.replace(/_UMCBL$|_DMCBL$|PERP$/, "");
  const base = symbol.replace(/USDT$/, "");
  symbol = `${base}USDT_UMCBL`;

  const payload: Record<string, any> = {
    symbol,
    productType: "USDT-FUTURES",
    marginMode: "isolated",
    marginCoin: "USDT",
    side: params.side,
    orderType: params.orderType,
    size: params.size,
    tradeSide: params.tradeSide || "open",
  };
  if (params.price) {
    payload.price = params.price;
  }
  return bitgetRequest(creds, "POST", "/api/v2/mix/order/place-order", undefined, payload);
}

