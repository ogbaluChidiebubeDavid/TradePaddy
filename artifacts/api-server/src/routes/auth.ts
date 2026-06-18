import { Router } from "express";
import { validateCredentials, getUserInfo } from "../lib/bitget";
import { syncBitgetData } from "./bitget-account";

const router = Router();

router.post("/auth/connect", async (req, res): Promise<void> => {
  const { apiKey, secretKey, passphrase } = req.body as {
    apiKey?: string;
    secretKey?: string;
    passphrase?: string;
  };

  if (!apiKey || !secretKey || !passphrase) {
    res.status(400).json({ error: "apiKey, secretKey, and passphrase are required" });
    return;
  }

  try {
    const creds = { apiKey, secretKey, passphrase };

    // Validate creds (also returns spot assets) + fetch user info in parallel
    const [validation, userInfo] = await Promise.all([
      validateCredentials(creds),
      getUserInfo(creds),
    ]);

    req.session.bitget = creds;
    req.session.uid = validation.uid;
    req.session.explicitLogout = undefined;

    // username: prefer real Bitget nick, then userId, then null
    const username = userInfo.nick || (userInfo.userId ? `UID ${userInfo.userId}` : null);
    req.session.username = username;
    req.session.userId = userInfo.userId || null;

    // Sync trade history immediately to database before completing auth connection
    try {
      await syncBitgetData(creds);
    } catch (syncErr) {
      console.error("Failed to sync Bitget data during connection:", syncErr);
    }

    res.json({
      connected: true,
      uid: validation.uid,
      username,
      userId: userInfo.userId || null,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Invalid credentials";
    res.status(401).json({ error: msg });
  }
});

router.post("/auth/disconnect", (req, res): void => {
  req.session.bitget = undefined;
  req.session.uid = undefined;
  req.session.username = undefined;
  req.session.userId = undefined;
  req.session.explicitLogout = true;
  res.json({ connected: false });
});

router.get("/auth/me", async (req, res): Promise<void> => {
  if (
    !req.session.bitget &&
    !req.session.explicitLogout &&
    process.env.BITGET_API_KEY &&
    process.env.BITGET_SECRET_KEY &&
    process.env.BITGET_PASSPHRASE
  ) {
    try {
      const creds = {
        apiKey: process.env.BITGET_API_KEY,
        secretKey: process.env.BITGET_SECRET_KEY,
        passphrase: process.env.BITGET_PASSPHRASE,
      };
      const [validation, userInfo] = await Promise.all([
        validateCredentials(creds),
        getUserInfo(creds),
      ]);
      req.session.bitget = creds;
      req.session.uid = validation.uid;
      const username = userInfo.nick || (userInfo.userId ? `UID ${userInfo.userId}` : null);
      req.session.username = username;
      req.session.userId = userInfo.userId || null;

      // Sync data in background (non-blocking)
      syncBitgetData(creds).catch(() => {});
    } catch (err) {
      console.error("Auto-connect from environment variables failed:", err);
    }
  }

  if (req.session.bitget) {
    res.json({
      connected: true,
      uid: req.session.uid ?? null,
      username: req.session.username ?? null,
      userId: req.session.userId ?? null,
    });
  } else {
    res.json({ connected: false, uid: null, username: null, userId: null });
  }
});

export default router;
