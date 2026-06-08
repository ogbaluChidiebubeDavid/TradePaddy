import { Router } from "express";
import { validateCredentials } from "../lib/bitget";

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
    const info = await validateCredentials({ apiKey, secretKey, passphrase });
    req.session.bitget = { apiKey, secretKey, passphrase };
    req.session.uid = info.uid;
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
