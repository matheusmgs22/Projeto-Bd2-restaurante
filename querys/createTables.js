const connectDB = require('../config/db');

async function createTables() {
  const client = await connectDB();
c
  try {
    const query = `
      -- Criar tabelas
      CREATE TABLE IF NOT EXISTS cliente (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100),
        sexo CHAR(1) CHECK (sexo IN ('m', 'f', 'o')),
        idade INT,
        nascimento DATE,
        pontos INT DEFAULT 0
      );

      CREATE TABLE IF NOT EXISTS prato (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100),
        descricao TEXT,
        valor DECIMAL(10, 2),
        disponibilidade BOOLEAN
      );

      CREATE TABLE IF NOT EXISTS fornecedor (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100),
        estado_origem VARCHAR(2) CHECK (estado_origem IN ('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'))
      );

      CREATE TABLE IF NOT EXISTS ingredientes (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100),
        data_fabricacao DATE,
        data_validade DATE,
        quantidade INT,
        observacao TEXT
      );

      CREATE TABLE IF NOT EXISTS usos (
        id_prato INT REFERENCES prato(id),
        id_ingrediente INT REFERENCES ingredientes(id),
        PRIMARY KEY(id_prato, id_ingrediente)
      );

      CREATE TABLE IF NOT EXISTS venda (
        id SERIAL PRIMARY KEY,
        id_cliente INT REFERENCES cliente(id),
        id_prato INT REFERENCES prato(id),
        quantidade INT,
        dia DATE,
        hora TIME,
        valor DECIMAL(10, 2)
      );
    `;

    await client.query(query);
    console.log('Tabelas criadas com sucesso!');
  } catch (err) {
    console.error('Erro ao criar tabelas:', err);
  } finally {
    await client.end();
  }
}

// createTables(); // Só para testar essa função.
module.exports = createTables; // Exporta a função
