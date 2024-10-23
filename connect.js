const { Client } = require('pg');  // vamos usar o PG para conectar ao Postgre
const client = new Client({
  host: 'localhost',       // deixa padrão
  port: 5432,              // Porta padrão do PostgreSQL
  user: 'postgres',     // postgres é o usuario padrão
  password: '205252',
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

connectDB();
