const { Pool } = require('pg');

const connectDB = async (database = 'postgres') => {
  const client = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: database,
    password: '205252',
    port: 5432,
  });

  await client.connect();
  return client;
};

async function createDatabase() {
  const client = await connectDB('postgres');

  try {
    const dbExists = await client.query("SELECT 1 FROM pg_database WHERE datname = 'restaurante'");
    if (dbExists.rows.length === 0) {
      await client.query('CREATE DATABASE restaurante');
      console.log('Banco de dados criado com sucesso!');
    } else {
      console.log('Banco de dados já existe.');
    }
  } catch (err) {
    console.error('Erro ao criar banco de dados:', err);
  } finally {
    await client.end();
  }
}

// Chamar a função
createDatabase();
