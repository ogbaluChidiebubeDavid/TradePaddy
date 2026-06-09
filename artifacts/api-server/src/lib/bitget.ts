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

  const headers: Record<string, string> = {
    "ACCESS-KEY": creds.apiKey,
    "ACCESS-SIGN": signature,
    "ACCESS-TIMESTAMP": timestamp,
    "ACCESS-PASSPHRASE": creds.passphrase,
    "Content-Type": "application/json",
    locale: "en-US",
  };

  const res = await fetch(BITGET_BASE + requestPath, {
    method,
    headers,
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

  const AUTH_ERROR_CODES = ["40037", "40101", "40102", "40103", "40200", "40203", "40302"];
  if (AUTH_ERROR_CODES.includes(data.code)) {
    throw new Error(`Invalid Bitget credentials: ${data.msg}`);
  }
  if (data.code !== "00000") {
    throw new Error(`Bitget error: ${data.msg} (code: ${data.code})`);
  }

  const uid = creds.apiKey.replace(/^bg_/, "").slice(0, 16);
  return { uid };
}

export async function getSpotAssets(creds: BitgetCredentials): Promise<unknown[]> {
  const data = await bitgetRequest(creds, "GET", "/api/v2/spot/account/assets");
  return (data as unknown[]) || [];
}

export async function getFuturesAccount(creds: BitgetCredentials): Promise<unknown> {
  try {
    const data = await bitgetRequest(creds, "GET", "/api/v2/mix/account/accounts", {
      productType: "USDT-FUTURES",
    });
    return data;
  } catch {
    return [];
  }
}

export async function getFuturesPositions(creds: BitgetCredentials): Promise<unknown[]> {
  try {
    const data = await bitgetRequest(creds, "GET", "/api/v2/mix/position/allPosition", {
      productType: "USDT-FUTURES",
      marginCoin: "USDT",
    });
    return (data as unknown[]) || [];
  } catch {
    return [];
  }
}

export async function getFuturesOrders(creds: BitgetCredentials, limit = 20): Promise<unknown[]> {
  try {
    const data = await bitgetRequest(creds, "GET", "/api/v2/mix/order/history", {
      productType: "USDT-FUTURES",
      limit: String(limit),
    });
    const result = data as { orderList?: unknown[] };
    return result?.orderList || (data as unknown[]) || [];
  } catch {
    return [];
  }
}

export async function getSpotOrders(creds: BitgetCredentials, limit = 20): Promise<unknown[]> {
  try {
    const data = await bitgetRequest(creds, "GET", "/api/v2/spot/trade/history", {
      limit: String(limit),
    });
    const result = data as { fillList?: unknown[] };
    return result?.fillList || (data as unknown[]) || [];
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
    symbol: params.symbol + "USDT",
    side: params.side,
    orderType: params.orderType,
    size: params.size,
    price: params.price,
    force: "gtc",
  });
}
