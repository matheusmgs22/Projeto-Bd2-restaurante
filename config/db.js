const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '205252',
  database: 'restaurante',
});

// Função para conectar ao banco
async function connectDB() {
  try {
    await client.connect();
    console.log('Conectado ao PostgreSQL com sucesso!');
  } catch (err) {
    console.error('Erro ao conectar ao PostgreSQL:', err.stack);
  } finally {
    await client.end();
  }
}

module.exports = { connectDB };
