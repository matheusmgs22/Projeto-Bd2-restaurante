const { Pool } = require('pg');

// isso daqui vai funcionar somente para conectar, crie o Database antes em createDatabase.js

const connectDB = async () => {
  const client = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'restaurante',
    password: '205252',
    port: 5432,
  });

  await client.connect();
  return client;
};

module.exports = connectDB;
