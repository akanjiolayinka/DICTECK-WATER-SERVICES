import pg from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const { Pool } = pg;

async function createDatabase() {
  // First connect to the default postgres database
  const adminPool = new Pool({
    user: process.env.POSTGRES_USER || 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    database: 'postgres', // Connect to default database
    password: process.env.POSTGRES_PASSWORD || '123456789',
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
  });

  try {
    console.log('🗄️  Creating database...');
    
    // Check if database already exists
    const checkDb = await adminPool.query(
      'SELECT 1 FROM pg_database WHERE datname = $1',
      [process.env.POSTGRES_DB || 'dicteck_water_services']
    );
    
    if (checkDb.rows.length > 0) {
      console.log(`✅ Database '${process.env.POSTGRES_DB || 'dicteck_water_services'}' already exists!`);
    } else {
      // Create the database
      await adminPool.query(`CREATE DATABASE ${process.env.POSTGRES_DB || 'dicteck_water_services'}`);
      console.log(`✅ Database '${process.env.POSTGRES_DB || 'dicteck_water_services'}' created successfully!`);
    }
    
  } catch (error) {
    console.error('❌ Failed to create database:', error.message);
  } finally {
    await adminPool.end();
  }
}

createDatabase();
