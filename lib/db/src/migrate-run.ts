import pg from "pg";
import fs from "fs";
import path from "path";

const { Pool } = pg;

async function runMigrate() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL env variable is required");
    process.exit(1);
  }

  const pool = new Pool({ connectionString: url });
  const client = await pool.connect();

  try {
    console.log("Dropping existing tables...");
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
    console.log("Existing tables dropped successfully.");

    // Read the generated SQL migration file
    const sqlFilePath = path.resolve(process.cwd(), "lib/db/drizzle/0000_minor_sir_ram.sql");
    console.log(`Reading SQL migration file: ${sqlFilePath}`);
    const sqlContent = fs.readFileSync(sqlFilePath, "utf-8");

    // Split statements on breakpoint markers
    const statements = sqlContent.split("--> statement-breakpoint");
    console.log(`Executing ${statements.length} SQL statements...`);

    for (const statement of statements) {
      const trimmed = statement.trim();
      if (trimmed) {
        await client.query(trimmed);
      }
    }

    console.log("Migration executed successfully! All tables created.");
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

runMigrate().catch(console.error);
