const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false // o { rejectUnauthorized: false } si estás en producción
});

module.exports = pool;
