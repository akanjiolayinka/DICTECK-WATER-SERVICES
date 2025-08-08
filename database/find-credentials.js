import pg from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const { Pool } = pg;

// List of passwords to try
const passwordsToTry = [
  '1234567',    // Current password in .env
  '123456789',
  '123456',
  '12345678',
  '1234567890'
];

// List of common PostgreSQL usernames to try
const usersToTry = [
  'postgres',
  'root',
  'admin',
  'user'
];

async function testConnection(user, password) {
  const pool = new Pool({
    user: user,
    host: process.env.POSTGRES_HOST || 'localhost',
    database: 'postgres', // Connect to default postgres database first
    password: password,
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    connectionTimeoutMillis: 5000, // 5 second timeout
  });

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT version()');
    client.release();
    await pool.end();
    return { success: true, version: result.rows[0].version };
  } catch (error) {
    await pool.end();
    return { success: false, error: error.message };
  }
}

async function findCorrectCredentials() {
  console.log('🔍 Testing PostgreSQL credentials...\n');
  
  for (const user of usersToTry) {
    console.log(`👤 Testing user: ${user}`);
    
    for (const password of passwordsToTry) {
      process.stdout.write(`  🔐 Trying password: ${password}... `);
      
      const result = await testConnection(user, password);
      
      if (result.success) {
        console.log('✅ SUCCESS!');
        console.log(`\n🎉 Found working credentials:`);
        console.log(`   User: ${user}`);
        console.log(`   Password: ${password}`);
        console.log(`   Database version: ${result.version}\n`);
        
        // Now test if our target database exists
        await testTargetDatabase(user, password);
        return { user, password };
      } else {
        console.log('❌ Failed');
        if (result.error.includes('password authentication failed')) {
          // Continue trying other passwords
        } else if (result.error.includes('database') && result.error.includes('does not exist')) {
          // Database doesn't exist but credentials work
          console.log('  ℹ️  Credentials work but database doesn\'t exist');
        } else {
          console.log(`  Error: ${result.error}`);
        }
      }
    }
    console.log();
  }
  
  console.log('❌ No working credentials found.');
  console.log('\n🔧 Please check:');
  console.log('  1. PostgreSQL is running');
  console.log('  2. PostgreSQL is accepting connections on localhost:5432');
  console.log('  3. Try running: net start postgresql-x64-[version] (Windows)');
  console.log('  4. Or check PostgreSQL service in Windows Services');
  
  return null;
}

async function testTargetDatabase(user, password) {
  console.log('🗄️  Testing target database...');
  
  const pool = new Pool({
    user: user,
    host: process.env.POSTGRES_HOST || 'localhost',
    database: process.env.POSTGRES_DB || 'dicteck_water_services',
    password: password,
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    connectionTimeoutMillis: 5000,
  });

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT current_database()');
    client.release();
    await pool.end();
    console.log(`✅ Target database '${result.rows[0].current_database}' exists and is accessible!`);
    return true;
  } catch (error) {
    await pool.end();
    if (error.message.includes('does not exist')) {
      console.log(`⚠️  Database '${process.env.POSTGRES_DB || 'dicteck_water_services'}' does not exist.`);
      console.log('   You can create it by running:');
      console.log(`   CREATE DATABASE ${process.env.POSTGRES_DB || 'dicteck_water_services'};`);
    } else {
      console.log(`❌ Error accessing target database: ${error.message}`);
    }
    return false;
  }
}

async function checkPostgreSQLService() {
  console.log('🔍 Checking PostgreSQL service status...\n');
  
  // Try to get PostgreSQL service information
  try {
    const { exec } = await import('child_process');
    const { promisify } = await import('util');
    const execPromise = promisify(exec);
    
    // Check if PostgreSQL service is running (Windows)
    const { stdout } = await execPromise('sc query postgresql* 2>nul || echo "No PostgreSQL service found"');
    console.log('PostgreSQL Service Status:');
    console.log(stdout);
    
    // Try to find PostgreSQL installation
    const { stdout: pgVersion } = await execPromise('postgres --version 2>nul || echo "postgres command not found"');
    console.log('PostgreSQL Version Check:');
    console.log(pgVersion);
    
  } catch (error) {
    console.log('Could not check service status:', error.message);
  }
}

// Main execution
(async () => {
  await checkPostgreSQLService();
  const credentials = await findCorrectCredentials();
  
  if (credentials) {
    console.log('\n📝 To update your .env file with the correct credentials:');
    console.log(`POSTGRES_USER=${credentials.user}`);
    console.log(`POSTGRES_PASSWORD=${credentials.password}`);
  }
  
  process.exit(0);
})();
