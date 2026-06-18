import { defineConfig } from "drizzle-kit";
import path from "path";
import fs from "fs";

if (!process.env.DATABASE_URL) {
  const envPaths = [
    path.resolve(process.cwd(), ".env"),
    path.resolve(process.cwd(), "../../.env"),
    path.resolve(process.cwd(), "lib/db/.env")
  ];
  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, "utf-8");
      for (const line of envContent.split("\n")) {
        const match = line.match(/^\s*DATABASE_URL\s*=\s*["']?(.*?)["']?\s*$/);
        if (match) {
          process.env.DATABASE_URL = match[1];
          break;
        }
      }
    }
    if (process.env.DATABASE_URL) break;
  }
}

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL, ensure the database is provisioned");
}

export default defineConfig({
  schema: "./src/schema/*.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
