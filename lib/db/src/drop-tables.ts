import pg from "pg";

const { Pool } = pg;

async function dropAll() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL env variable is required");
    process.exit(1);
  }

  console.log("Connecting to database and dropping tables...");
  const pool = new Pool({ connectionString: url });
  const client = await pool.connect();
  try {
    await client.query(`
      DROP TABLE IF EXISTS "trades" CASCADE;
      DROP TABLE IF EXISTS "journal_entries" CASCADE;
      DROP TABLE IF EXISTS "trade_replays" CASCADE;
      DROP TABLE IF EXISTS "behavior_patterns" CASCADE;
      DROP TABLE IF EXISTS "coaching_reports" CASCADE;
      DROP TABLE IF EXISTS "risk_reports" CASCADE;
      DROP TABLE IF EXISTS "portfolio_snapshots" CASCADE;
      DROP TABLE IF EXISTS "market_analyses" CASCADE;
      DROP TABLE IF EXISTS "chat_sessions" CASCADE;
      DROP TABLE IF EXISTS "chat_messages" CASCADE;
      DROP TABLE IF EXISTS "users" CASCADE;
    `);
    console.log("Successfully dropped all tables!");
  } catch (err) {
    console.error("Failed to drop tables:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

dropAll().catch(console.error);
