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

async function bitgetRequest(
  creds: BitgetCredentials,
  method: string,
  path: string,
  params?: Record<string, string>,
  body?: unknown,
): Promise<unknown> {
  const timestamp = Date.now().toString();
  let requestPath = path;
  if (params && Object.keys(params).length > 0) {
    requestPath += "?" + new URLSearchParams(params).toString();
  }
  const bodyStr = body ? JSON.stringify(body) : "";
  const prehash = timestamp + method.toUpperCase() + requestPath + bodyStr;
  const signature = sign(prehash, creds.secretKey);

  const res = await fetch(BITGET_BASE + requestPath, {
    method,
    headers: {
      "ACCESS-KEY": creds.apiKey,
      "ACCESS-SIGN": signature,
      "ACCESS-TIMESTAMP": timestamp,
      "ACCESS-PASSPHRASE": creds.passphrase,
      "Content-Type": "application/json",
      locale: "en-US",
    },
    body: bodyStr || undefined,
  });

  const data = (await res.json()) as { code: string; msg: string; data: unknown };
  if (data.code !== "00000") {
    throw new Error(`Bitget API error: ${data.msg} (code: ${data.code})`);
  }
  return data.data;
}

export async function validateCredentials(creds: BitgetCredentials): Promise<{ uid: string }> {
  const timestamp = Date.now().toString();
  const requestPath = "/api/v2/spot/account/assets";
  const prehash = timestamp + "GET" + requestPath;
  const signature = sign(prehash, creds.secretKey);

  const res = await fetch(BITGET_BASE + requestPath, {
    headers: {
      "ACCESS-KEY": creds.apiKey,
      "ACCESS-SIGN": signature,
      "ACCESS-TIMESTAMP": timestamp,
      "ACCESS-PASSPHRASE": creds.passphrase,
      "Content-Type": "application/json",
      locale: "en-US",
    },
  });

  const data = (await res.json()) as { code: string; msg: string; data: unknown };
  const AUTH_ERROR_CODES = ["40037", "40101", "40102", "40103", "40200", "40203", "40302", "40006"];
  if (AUTH_ERROR_CODES.includes(data.code)) {
    throw new Error(`Invalid Bitget credentials: ${data.msg}`);
  }
  if (data.code !== "00000") {
    throw new Error(`Bitget error: ${data.msg} (code: ${data.code})`);
  }
  const uid = creds.apiKey.replace(/^bg_/, "").slice(0, 16);
  return { uid };
}

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
  crossedRiskRate?: string;
}

export interface FuturesPosition {
  symbol: string;
  holdSide: string; // long | short
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
  side: string; // buy | sell
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
  side: string; // open_long | close_long | open_short | close_short
  price: string;
  baseVolume: string;
  profit: string;
  tradeSide?: string;
  posMode?: string;
  fees?: string;
  feeCoin?: string;
  cTime: string;
}

export async function getSpotAssets(creds: BitgetCredentials): Promise<SpotAsset[]> {
  const data = await bitgetRequest(creds, "GET", "/api/v2/spot/account/assets");
  const assets = (data as SpotAsset[]) || [];
  return assets.filter(a => parseFloat(a.available || "0") > 0 || parseFloat(a.frozen || "0") > 0 || parseFloat(a.usdtValue || "0") > 0);
}

export async function getFuturesAccounts(creds: BitgetCredentials): Promise<FuturesAccount[]> {
  try {
    const data = await bitgetRequest(creds, "GET", "/api/v2/mix/account/accounts", {
      productType: "USDT-FUTURES",
    });
    return (data as FuturesAccount[]) || [];
  } catch {
    return [];
  }
}

export async function getFuturesPositions(creds: BitgetCredentials): Promise<FuturesPosition[]> {
  try {
    const data = await bitgetRequest(creds, "GET", "/api/v2/mix/position/allPosition", {
      productType: "USDT-FUTURES",
      marginCoin: "USDT",
    });
    return (data as FuturesPosition[]) || [];
  } catch {
    return [];
  }
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
  try {
    const data = await bitgetRequest(creds, "GET", "/api/v2/mix/order/fills", {
      productType: "USDT-FUTURES",
      limit,
    });
    const result = data as { fillList?: FuturesFill[] } | FuturesFill[];
    if (Array.isArray(result)) return result;
    return (result as { fillList?: FuturesFill[] }).fillList || [];
  } catch {
    return [];
  }
}

export async function getSpotOrders(creds: BitgetCredentials): Promise<unknown[]> {
  try {
    const data = await bitgetRequest(creds, "GET", "/api/v2/spot/trade/history", { limit: "100" });
    const result = data as { orderList?: unknown[] } | unknown[];
    if (Array.isArray(result)) return result;
    return (result as { orderList?: unknown[] }).orderList || [];
  } catch {
    return [];
  }
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
