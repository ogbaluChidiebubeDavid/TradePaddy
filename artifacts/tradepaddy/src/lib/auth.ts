const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export interface AuthState {
  connected: boolean;
  uid: string | null;
  username: string | null;
  userId: string | null;
}

export async function fetchMe(): Promise<AuthState> {
  const res = await fetch(`${BASE}/api/auth/me`, { credentials: "include" });
  return res.json() as Promise<AuthState>;
}

export async function connectBitget(credentials: {
  apiKey: string;
  secretKey: string;
  passphrase: string;
}): Promise<{ connected: boolean; uid: string; username: string | null }> {
  const res = await fetch(`${BASE}/api/auth/connect`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(credentials),
  });
  if (!res.ok) {
    const err = (await res.json()) as { error: string };
    throw new Error(err.error || "Connection failed");
  }
  return res.json() as Promise<{ connected: boolean; uid: string; username: string | null }>;
}

export async function disconnectBitget(): Promise<void> {
  await fetch(`${BASE}/api/auth/disconnect`, {
    method: "POST",
    credentials: "include",
  });
}
