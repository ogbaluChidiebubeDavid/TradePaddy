import { db } from "./index";
import { tradesTable } from "./schema/trades";
import { desc } from "drizzle-orm";

async function run() {
  console.log("Listing last 30 trades from database...");
  try {
    const list = await db.select().from(tradesTable).orderBy(desc(tradesTable.id)).limit(30);
    console.log(`Found ${list.length} trades:`);
    list.forEach(t => {
      console.log(`ID: ${t.id} | Asset: ${t.asset} | Direction: ${t.direction} | Status: ${t.status} | Real: ${t.isReal} | Entry: ${t.entryPrice} | Exit: ${t.exitPrice} | PnL: ${t.pnl} | PnL%: ${t.pnlPercent}`);
    });
  } catch (err) {
    console.error("Failed to query trades:", err);
  }
  process.exit(0);
}

run();
