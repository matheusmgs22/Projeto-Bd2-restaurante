const { Client } = require('pg');

// Função para conectar ao banco
async function connectDB() {

  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '205252',
    database: 'restaurante',  // crie o banco de dados antes, se n, n vai pegar isso aqui.
  });

  try {
    await client.connect();
    return client;
  } catch (err) {
    console.error('Erro ao conectar ao PostgreSQL:', err.stack);
  }
}

// teste de conexão
connectDB().then(() => {}); // tirei o log, se der algum erro coloca dnv


module.exports = connectDB;

