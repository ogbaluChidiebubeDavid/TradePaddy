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

    // Validate credentials and fetch user info in parallel
    const [info, userInfo] = await Promise.all([
      validateCredentials(creds),
      getUserInfo(creds),
    ]);

    req.session.bitget = creds;
    req.session.uid = info.uid;
    req.session.username = userInfo.nick || userInfo.userId || null;
    req.session.userId = userInfo.userId || null;

    // Auto-sync trade history in background (non-blocking)
    syncBitgetData(creds).catch(() => { /* non-blocking */ });

    res.json({
      connected: true,
      uid: info.uid,
      username: req.session.username,
      userId: req.session.userId,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Invalid credentials";
    res.status(401).json({ error: msg });
  }
});

router.post("/auth/disconnect", (req, res): void => {
  req.session.destroy(() => {
    res.json({ connected: false });
  });
});

router.get("/auth/me", (req, res): void => {
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
