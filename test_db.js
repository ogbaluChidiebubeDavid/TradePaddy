import pg from 'pg';
const { Client } = pg;

async function run() {
  const connectionString = "postgresql://neondb_owner:npg_uJOL7jTNPFt0@ep-cold-salad-apuu75vl.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
  console.log('Connecting to:', connectionString);
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
