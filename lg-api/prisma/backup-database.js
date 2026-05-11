require('dotenv').config({ path: '.env' });
const fs = require('fs');
const { Client } = require('pg');

// Define the order of tables to handle foreign key constraints
const TABLES = [
  'user',
  'passwords',
  'auth_providers',
  'sessions',
  'genre',
  'tag',
  'game',
  '_gameTotag',
  'game_asset',
  'game_play',
  'game_translation',
  'game_favorite',
  'game_rating',
  'game_comment',
  'game_comment_like',
  'achievement',
  'achievement_translation',
  '_achievementTouser',
  'score'
];

function escapeValue(value) {
  if (value === null || value === undefined) {
    return 'NULL';
  }
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }
  if (typeof value === 'number') {
    return value.toString();
  }
  if (value instanceof Date) {
    return `'${value.toISOString()}'`;
  }
  // String - escape single quotes
  return `'${String(value).replace(/'/g, "''")}'`;
}

function generateInsert(tableName, rows) {
  if (rows.length === 0) return '';
  
  const columns = Object.keys(rows[0]);
  let sql = '';
  
  rows.forEach(row => {
    const values = columns.map(col => escapeValue(row[col])).join(', ');
    sql += `INSERT INTO "${tableName}" (${columns.map(c => `"${c}"`).join(', ')}) VALUES (${values});\n`;
  });
  
  return sql;
}

async function backupDatabase() {
  const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('No DIRECT_URL or DATABASE_URL found in environment');
    process.exit(1);
  }

  const client = new Client({ connectionString });
  let backupSql = '';
  
  try {
    await client.connect();
    console.log('Connected to database...');
    
    backupSql += '-- Database backup generated on ' + new Date().toISOString() + '\n';
    backupSql += '-- This file contains all data from the database\n\n';
    
    for (const tableName of TABLES) {
      try {
        // Check if table exists
        const tableCheck = await client.query(`
          SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = $1
          );
        `, [tableName]);
        
        if (!tableCheck.rows[0].exists) {
          console.log(`⚠️  Table "${tableName}" does not exist, skipping...`);
          continue;
        }
        
        const result = await client.query(`SELECT * FROM "${tableName}"`);
        
        if (result.rows.length > 0) {
          console.log(`📦 Backing up ${result.rows.length} rows from "${tableName}"`);
          backupSql += `\n-- Table: ${tableName} (${result.rows.length} rows)\n`;
          backupSql += generateInsert(tableName, result.rows);
        } else {
          console.log(`✓  Table "${tableName}" is empty`);
          backupSql += `\n-- Table: ${tableName} (empty)\n`;
        }
      } catch (err) {
        console.error(`❌ Error backing up table "${tableName}":`, err.message);
        backupSql += `\n-- ERROR backing up table: ${tableName}\n-- ${err.message}\n`;
      }
    }
    
    // Save to file with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const filename = `./prisma/backup-${timestamp}.sql`;
    const filenameLatest = `./prisma/backup-latest.sql`;
    
    fs.writeFileSync(filename, backupSql);
    fs.writeFileSync(filenameLatest, backupSql);
    
    console.log('\n✅ Backup completed successfully!');
    console.log(`   Saved to: ${filename}`);
    console.log(`   Also saved as: ${filenameLatest}`);
    console.log('\nTo restore, you can run:');
    console.log('   node prisma/seed.js (but change seed.js to point to backup-latest.sql)');
    
  } catch (err) {
    console.error('❌ Error during backup:', err);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

backupDatabase();
