import { Pool } from 'pg';

// Local PostgreSQL configuration
const pool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DB || 'dicteck_water_services',
  password: process.env.POSTGRES_PASSWORD || '1234567',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
});

export { pool as db };

// Helper function to execute queries
export const query = async (text: string, params?: unknown[]) => {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
};

// Helper function to close the pool
export const closePool = async () => {
  await pool.end();
};
