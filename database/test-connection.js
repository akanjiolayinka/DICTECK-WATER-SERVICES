import pg from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const { Pool } = pg;

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

async function testConnection() {
  try {
    console.log('Testing PostgreSQL connection...');
    console.log('Connection details:');
    console.log(`  Host: ${process.env.POSTGRES_HOST || 'localhost'}`);
    console.log(`  Port: ${process.env.POSTGRES_PORT || '5432'}`);
    console.log(`  Database: ${process.env.POSTGRES_DB || 'dicteck_water_services'}`);
    console.log(`  User: ${process.env.POSTGRES_USER || 'postgres'}`);
    console.log();
    
    // Test basic connection
    const result = await query('SELECT NOW() as current_time, version() as db_version');
    console.log('✅ Database connection successful!');
    console.log('📅 Current time:', result.rows[0].current_time);
    console.log('🗄️ Database version:', result.rows[0].db_version);
    
    // Test if our tables exist
    const tablesResult = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);
    
    console.log('\n📊 Available tables:');
    if (tablesResult.rows.length === 0) {
      console.log('  No tables found. Run "npm run db:setup" to create the database schema.');
    } else {
      tablesResult.rows.forEach(row => {
        console.log(`  - ${row.table_name}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('🔧 Please check:');
    console.error('  1. PostgreSQL is running');
    console.error('  2. Database "dicteck_water_services" exists');
    console.error('  3. Username "postgres" and password "1234567" are correct');
    console.error('  4. Connection settings in .env file');
    console.error('  5. PostgreSQL is accepting connections on localhost:5432');
  } finally {
    await pool.end();
    process.exit(0);
  }
}

testConnection();
