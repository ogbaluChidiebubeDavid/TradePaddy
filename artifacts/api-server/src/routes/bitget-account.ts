import { Router } from "express";
import {
  getSpotAssets,
  getFuturesAccount,
  getFuturesPositions,
  getFuturesOrders,
  getSpotOrders,
  type BitgetCredentials,
} from "../lib/bitget";

const router = Router();

function getCreds(req: import("express").Request): BitgetCredentials | null {
  return req.session.bitget ?? null;
}

router.get("/bitget/assets", async (req, res): Promise<void> => {
  const creds = getCreds(req);
  if (!creds) {
    res.status(401).json({ error: "Not connected to Bitget. Please connect your account first." });
    return;
  }
  try {
    const [spotAssets, futuresAccounts, positions] = await Promise.all([
      getSpotAssets(creds),
      getFuturesAccount(creds),
      getFuturesPositions(creds),
    ]);
    res.json({ spotAssets, futuresAccounts, positions });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to fetch assets";
    res.status(500).json({ error: msg });
  }
});

router.get("/bitget/positions", async (req, res): Promise<void> => {
  const creds = getCreds(req);
  if (!creds) {
    res.status(401).json({ error: "Not connected to Bitget" });
    return;
  }
  try {
    const positions = await getFuturesPositions(creds);
    res.json(positions);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to fetch positions";
    res.status(500).json({ error: msg });
  }
});

router.get("/bitget/orders", async (req, res): Promise<void> => {
  const creds = getCreds(req);
  if (!creds) {
    res.status(401).json({ error: "Not connected to Bitget" });
    return;
  }
  try {
    const [futuresOrders, spotOrders] = await Promise.all([
      getFuturesOrders(creds),
      getSpotOrders(creds),
    ]);
    res.json({ futuresOrders, spotOrders });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to fetch orders";
    res.status(500).json({ error: msg });
  }
});

export default router;
