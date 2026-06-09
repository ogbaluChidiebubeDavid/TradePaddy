import * as crypto from "crypto";

const BITGET_BASE = "https://api.bitget.com";

export interface BitgetCredentials {
  apiKey: string;
  secretKey: string;
  passphrase: string;
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

// ─── Credential Validation ─────────────────────────────────────────────────

export async function validateCredentials(creds: BitgetCredentials): Promise<{
  uid: string;
  spotAssets: SpotAsset[];
}> {
  const requestPath = "/api/v2/spot/account/assets";
  const headers = buildHeaders(creds, "GET", requestPath);
  const res = await fetch(BITGET_BASE + requestPath, { headers });
  const data = (await res.json()) as { code: string; msg: string; data: unknown };

  const AUTH_ERROR_CODES = ["40037", "40101", "40102", "40103", "40200", "40203", "40302", "40006"];
  if (AUTH_ERROR_CODES.includes(data.code)) {
    throw new Error(`Invalid Bitget credentials: ${data.msg}`);
  }
  if (data.code !== "00000") {
    throw new Error(`Bitget error: ${data.msg} (code: ${data.code})`);
  }

  const spotAssets = (data.data as SpotAsset[]) || [];
  const uid = creds.apiKey.slice(-8); // last 8 chars of API key as safe identifier
  return { uid, spotAssets };
}

// ─── User Info ────────────────────────────────────────────────────────────

export interface BitgetUserInfo {
  userId: string;
  nick: string;
}

export async function getUserInfo(creds: BitgetCredentials): Promise<BitgetUserInfo> {
  // Try v2 user info
  try {
    const data = await bitgetRequest(creds, "GET", "/api/v2/user/info") as Record<string, unknown>;
    if (data && (data.nick || data.userId)) {
      return {
        userId: String(data.userId ?? ""),
        nick: String(data.nick ?? ""),
      };
    }
  } catch { /* try next */ }

  // Try v1 user info fallback
  try {
    const data = await bitgetRequest(creds, "GET", "/api/spot/v1/account/getInfo") as Record<string, unknown>;
    if (data) {
      return {
        userId: String(data.user_id ?? data.userId ?? ""),
        nick: String(data.nick ?? data.nickName ?? ""),
      };
    }
  } catch { /* fallback */ }

  return { userId: "", nick: "" };
}

// ─── Types ────────────────────────────────────────────────────────────────

export interface SpotAsset {
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
  try {
    const data = await bitgetRequest(creds, "GET", "/api/v2/spot/account/assets");
    const assets = (data as SpotAsset[]) || [];
    // Show all assets that have ANY balance — don't filter on usdtValue (may be absent)
    return assets.filter(a => parseFloat(a.available || "0") > 0 || parseFloat(a.frozen || "0") > 0);
  } catch (err) {
    throw new Error(`Spot assets: ${err instanceof Error ? err.message : "failed"}`);
  }
}

const FUTURES_PRODUCT_TYPES = ["USDT-FUTURES", "COIN-FUTURES", "USDT-FUTURES-ISOLATED"];

export async function getFuturesAccounts(creds: BitgetCredentials): Promise<FuturesAccount[]> {
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
  return bitgetRequest(creds, "POST", "/api/v2/spot/trade/place-order", undefined, {
    symbol: params.symbol.toUpperCase() + "USDT",
    side: params.side,
    orderType: params.orderType,
    size: params.size,
    price: params.price,
    force: "gtc",
  });
}
