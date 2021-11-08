const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: '1111',
  host: 'localhost',
  port: 5432,
  database: 'users'
});

pool.connect();

module.exports = pool;
