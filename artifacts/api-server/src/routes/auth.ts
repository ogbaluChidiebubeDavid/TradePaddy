import { Router } from "express";
import { validateCredentials } from "../lib/bitget";
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
    const info = await validateCredentials(creds);
    req.session.bitget = creds;
    req.session.uid = info.uid;

    // Auto-sync trade history in background
    syncBitgetData(creds).catch(() => { /* non-blocking */ });

    res.json({ connected: true, uid: info.uid });
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
    res.json({ connected: true, uid: req.session.uid ?? null });
  } else {
    res.json({ connected: false, uid: null });
  }
});

export default router;
