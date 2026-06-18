import { db } from "./index";
import { sql } from "drizzle-orm";

async function run() {
  console.log("Testing Drizzle DB connection using connection string in .env...");
  try {
    const res = await db.execute(sql`SELECT COUNT(*) FROM trades`);
    console.log("Database connection successful!");
    console.log("Trades count result:", res.rows[0]);
  } catch (err) {
    console.error("Database connection failed:", err);
  }
  process.exit(0);
}

run();
