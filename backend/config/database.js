const useSQLite = true; // Change to false when PostgreSQL is available

if (useSQLite) {
  module.exports = require('./database-sqlite');
} else {
  const { Pool } = require('pg');
  const dotenv = require('dotenv');

  dotenv.config();

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });

  pool.on('connect', () => {
    console.log('Connected to PostgreSQL database');
  });

  pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
  });

  module.exports = {
    query: (text, params) => pool.query(text, params),
    pool
  };
}