const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'restaurante',
  password: '205252',
  port: 5432,
});


const connectDB = async () => pool;

module.exports = connectDB;
