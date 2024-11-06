const { Client } = require('pg');

async function connectDB(database = 'postgres') {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '205252',
    database: database,
  });

  try {
    await client.connect();
    return client;
  } catch (err) {
    console.error('Erro ao conectar ao PostgreSQL:', err.stack);
  }
}


async function createDatabase() {
  const client = await connectDB('postgres');  // Conectar ao banco 'postgres'

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

  const newClient = await connectDB('restaurante');

  try {
    console.log('Conectado ao banco de dados "restaurante"!');

  } catch (err) {
    console.error('Erro ao conectar ao banco de dados "restaurante":', err);
  } finally {
    await newClient.end();
  }
}

// Chamar a função para criar o banco de dados
createDatabase();
