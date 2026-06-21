import pg from 'pg';
const { Client } = pg;

async function run() {
  const connectionString = process.env.DATABASE_URL || "postgresql://neondb_owner:YOUR_PASSWORD_HERE@ep-cold-salad-apuu75vl-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
  console.log('Connecting to database...');
  const client = new Client({ connectionString });

  try {
    await client.connect();
    console.log('Connected!');
    const res = await client.query('SELECT COUNT(*) FROM trades');
    console.log('Number of trades in DB:', res.rows[0].count);
  } catch (err) {
    console.error('Connection error:', err);
  } finally {
    await client.end();
  }
}

run();
