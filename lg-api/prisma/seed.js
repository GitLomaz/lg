require('dotenv').config({ path: '.env' });
const fs = require('fs');
const { Client } = require('pg');

async function main() {
  const sql = fs.readFileSync('./prisma/seed.sql', 'utf8');
  const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('No DIRECT_URL or DATABASE_URL found in environment');
    process.exit(1);
  }

  const client = new Client({ connectionString });
  try {
    await client.connect();
    console.log('Connected to DB, running seed...');
    await client.query(sql);
    console.log('Seed completed');
  } catch (err) {
    console.error('Error running seed:', err);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

main();
