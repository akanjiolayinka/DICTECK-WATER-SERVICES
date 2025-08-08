import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const { Pool } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Local PostgreSQL configuration
const pool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DB || 'dicteck_water_services',
  password: process.env.POSTGRES_PASSWORD || '1234567',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
});

// Helper function to execute queries
const query = async (text, params) => {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
};

async function setupDatabase() {
  try {
    console.log('Starting database setup...');
    console.log('Connection details:');
    console.log(`  Host: ${process.env.POSTGRES_HOST || 'localhost'}`);
    console.log(`  Port: ${process.env.POSTGRES_PORT || '5432'}`);
    console.log(`  Database: ${process.env.POSTGRES_DB || 'dicteck_water_services'}`);
    console.log(`  User: ${process.env.POSTGRES_USER || 'postgres'}`);
    console.log();
    
    // Read and execute the main schema file
    console.log('📋 Creating database schema...');
    const schemaPath = path.join(__dirname, 'init.sql');
    const schemaContent = fs.readFileSync(schemaPath, 'utf8');
    
    // Split the SQL content by semicolons and execute each statement
    const schemaStatements = schemaContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    for (const statement of schemaStatements) {
      if (statement.trim()) {
        try {
          await query(statement);
          console.log('✓ Schema statement executed successfully');
        } catch (error) {
          if (error.message.includes('already exists')) {
            console.log('⚠ Table already exists, skipping...');
          } else {
            console.log('⚠ Schema statement error:', error.message);
          }
        }
      }
    }
    
    // Read and execute the sample data file
    console.log('\n📊 Inserting sample data...');
    const dataPath = path.join(__dirname, 'sample-data.sql');
    const dataContent = fs.readFileSync(dataPath, 'utf8');
    
    const dataStatements = dataContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    for (const statement of dataStatements) {
      if (statement.trim()) {
        try {
          await query(statement);
          console.log('✓ Data statement executed successfully');
        } catch (error) {
          if (error.message.includes('already exists') || error.message.includes('duplicate')) {
            console.log('⚠ Data already exists, skipping...');
          } else {
            console.log('⚠ Data statement error:', error.message);
          }
        }
      }
    }
    
    console.log('\n✅ Database setup completed successfully!');
    
    // Test the connection and show results
    const result = await query('SELECT COUNT(*) FROM services');
    console.log(`📊 Services table has ${result.rows[0].count} records`);
    
    // Show all tables
    const tablesResult = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);
    
    console.log('\n📋 Created tables:');
    tablesResult.rows.forEach(row => {
      console.log(`  - ${row.table_name}`);
    });
    
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    console.error('🔧 Please ensure:');
    console.error('  1. PostgreSQL is running');
    console.error('  2. Database "dicteck_water_services" exists');
    console.error('  3. Username and password are correct');
    console.error('  4. You have permission to create tables');
  } finally {
    await pool.end();
    process.exit(0);
  }
}

setupDatabase();
