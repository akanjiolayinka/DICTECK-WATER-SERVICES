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
  password: process.env.POSTGRES_PASSWORD || '123456789',
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
    console.log('🚀 Starting database setup...\n');
    
    // Create users table
    console.log('📋 Creating users table...');
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Users table created');
    
    // Create services table
    console.log('📋 Creating services table...');
    await query(`
      CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2),
        duration_hours INTEGER,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Services table created');
    
    // Create service_requests table
    console.log('📋 Creating service_requests table...');
    await query(`
      CREATE TABLE IF NOT EXISTS service_requests (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        service_id INTEGER REFERENCES services(id),
        status VARCHAR(50) DEFAULT 'pending',
        scheduled_date TIMESTAMP,
        address TEXT,
        notes TEXT,
        estimated_cost DECIMAL(10, 2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Service requests table created');
    
    // Create testimonials table
    console.log('📋 Creating testimonials table...');
    await query(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        service_id INTEGER REFERENCES services(id),
        rating INTEGER CHECK (rating >= 1 AND rating <= 5),
        comment TEXT,
        is_approved BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Testimonials table created');
    
    // Create gallery table
    console.log('📋 Creating gallery table...');
    await query(`
      CREATE TABLE IF NOT EXISTS gallery (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        description TEXT,
        image_url VARCHAR(500),
        service_id INTEGER REFERENCES services(id),
        is_featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Gallery table created');
    
    // Insert sample services
    console.log('\n📊 Inserting sample services...');
    const services = [
      ['Water System Installation', 'Complete water system installation for residential and commercial properties', 1500.00, 8],
      ['Pipe Repair & Maintenance', 'Professional pipe repair and maintenance services', 250.00, 3],
      ['Water Quality Testing', 'Comprehensive water quality testing and analysis', 150.00, 2],
      ['Emergency Plumbing', '24/7 emergency plumbing services', 350.00, 4],
      ['Drainage System Cleaning', 'Professional drainage system cleaning and maintenance', 200.00, 4]
    ];
    
    for (const [name, description, price, duration] of services) {
      try {
        await query(
          'INSERT INTO services (name, description, price, duration_hours) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING',
          [name, description, price, duration]
        );
        console.log(`✅ Inserted service: ${name}`);
      } catch (error) {
        console.log(`⚠️  Service '${name}' might already exist`);
      }
    }
    
    // Create indexes
    console.log('\n🔍 Creating indexes...');
    const indexes = [
      'CREATE INDEX IF NOT EXISTS idx_service_requests_user_id ON service_requests(user_id)',
      'CREATE INDEX IF NOT EXISTS idx_service_requests_service_id ON service_requests(service_id)',
      'CREATE INDEX IF NOT EXISTS idx_service_requests_status ON service_requests(status)',
      'CREATE INDEX IF NOT EXISTS idx_testimonials_user_id ON testimonials(user_id)',
      'CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON testimonials(is_approved)',
      'CREATE INDEX IF NOT EXISTS idx_gallery_service_id ON gallery(service_id)',
      'CREATE INDEX IF NOT EXISTS idx_gallery_featured ON gallery(is_featured)'
    ];
    
    for (const indexQuery of indexes) {
      try {
        await query(indexQuery);
        console.log('✅ Index created');
      } catch (error) {
        console.log('⚠️  Index might already exist');
      }
    }
    
    console.log('\n🎉 Database setup completed successfully!');
    
    // Test the setup
    const result = await query('SELECT COUNT(*) FROM services');
    console.log(`📊 Services table has ${result.rows[0].count} records`);
    
    // Show all tables
    const tablesResult = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);
    
    console.log('\n📋 Database tables:');
    tablesResult.rows.forEach(row => {
      console.log(`  ✓ ${row.table_name}`);
    });
    
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

setupDatabase();
