const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function seedDatabase() {
  const client = await pool.connect();
  
  try {
    console.log('Seeding database with sample data...');
    
    const seedFile = path.join(__dirname, '../seeds/sample_data.sql');
    const sql = fs.readFileSync(seedFile, 'utf8');
    
    await client.query(sql);
    
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

seedDatabase();
