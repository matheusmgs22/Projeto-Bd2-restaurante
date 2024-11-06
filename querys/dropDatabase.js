const { Client } = require('pg');

async function connectDB() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '205252',
    database: 'postgres',  // Conectar ao banco de dados postgre - e não ao restaurante
  });

  try {
    await client.connect();
    return client;
  } catch (err) {
    console.error('Erro ao conectar ao PostgreSQL:', err.stack);
  }
}

// Função para deletar o banco de dados
async function dropDatabase() {
  const client = await connectDB();

  try {
    // desconectar todos os usuarios do banco de dados restaurante
    await client.query(`
      SELECT pg_terminate_backend(pg_stat_activity.pid)
      FROM pg_stat_activity
      WHERE pg_stat_activity.datname = 'restaurante'
      AND pid <> pg_backend_pid();
    `);

    // Deletar o banco de dados restaurante
    await client.query('DROP DATABASE IF EXISTS restaurante;');
    console.log('Banco de dados destruído com sucesso!');
  } catch (err) {
    console.error('Erro ao destruir o banco de dados:', err);
  } finally {
    await client.end();
  }
}

dropDatabase();
