import "express-session";
import type { BitgetCredentials } from "../lib/bitget";

declare module "express-session" {
  interface SessionData {
    bitget?: BitgetCredentials;
    uid?: string;
  }
}
