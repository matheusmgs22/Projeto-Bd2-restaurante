// Gente, minha ideia é assim que o banco de dados for criado, também ser criado as tabelas e inserts.
// Se vcs quiserem, a gente muda isso depois.

const { Client } = require('pg');

// Função para criar o banco de dados e as tabelas
async function createDatabaseAndTables() {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    password: '205252',
    port: 5432,
  });

  await client.connect();

  let newClient;

  try {
    const dbExists = await client.query("SELECT 1 FROM pg_database WHERE datname = 'restaurante'");
    if (dbExists.rows.length === 0) {
      await client.query('CREATE DATABASE restaurante');
      console.log('Banco de dados criado com sucesso!');
    } else {
      console.log('Banco de dados já existe, conectando-se a ele...');
    }

    await client.end();

    newClient = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'restaurante',
      password: '205252',
      port: 5432,
    });

    await newClient.connect();

    // Criar tabelas
    const query = `
      -- Tabela de clientes
      CREATE TABLE cliente (
          id SERIAL PRIMARY KEY,
          nome VARCHAR(100),
          sexo CHAR(1) CHECK (sexo IN ('m', 'f', 'o')),
          idade INT,
          nascimento DATE,
          pontos INT DEFAULT 0
      );

      -- Tabela de pratos
      CREATE TABLE prato (
          id SERIAL PRIMARY KEY,
          nome VARCHAR(100),
          descricao TEXT,
          valor DECIMAL(10, 2),
          disponibilidade BOOLEAN
      );

      -- Tabela de fornecedores
      CREATE TABLE fornecedor (
          id SERIAL PRIMARY KEY,
          nome VARCHAR(100),
          estado_origem VARCHAR(2) CHECK (estado_origem IN
          ('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'))
      );

      -- Tabela de ingredientes
      CREATE TABLE ingredientes (
          id SERIAL PRIMARY KEY,
          nome VARCHAR(100),
          data_fabricacao DATE,
          data_validade DATE,
          quantidade INT,
          observacao TEXT
      );

      -- Tabela de usos (relação prato-ingrediente)
      CREATE TABLE usos (
          id_prato INT REFERENCES prato(id),
          id_ingrediente INT REFERENCES ingredientes(id),
          PRIMARY KEY(id_prato, id_ingrediente)
      );

      -- Tabela de vendas
      CREATE TABLE venda (
          id SERIAL PRIMARY KEY,
          id_cliente INT REFERENCES cliente(id),
          id_prato INT REFERENCES prato(id),
          quantidade INT,
          dia DATE,
          hora TIME,
          valor DECIMAL(10, 2)
      );
    `;

    await newClient.query(query);
    console.log('Tabelas criadas com sucesso!');

    await insertData(newClient);

  } catch (err) {
    console.error('Erro ao criar banco de dados ou tabelas:', err);
  } finally {
    if (newClient) {
      await newClient.end();
    }
  }
}

// Função para inserir dados iniciais
async function insertData(client) {
  try {
    const query = `
      -- Inserir 10 clientes
      INSERT INTO cliente (nome, sexo, idade, nascimento) VALUES
      ('João Silva', 'm', 30, '1993-05-10'),
      ('Maria Souza', 'f', 25, '1998-07-15'),
      ('Pedro Santos', 'm', 40, '1984-09-25'),
      ('Ana Paula', 'f', 35, '1989-02-18'),
      ('Lucas Almeida', 'm', 28, '1996-03-22'),
      ('Fernanda Lima', 'f', 32, '1991-12-30'),
      ('Gustavo Ribeiro', 'm', 45, '1979-11-05'),
      ('Letícia Ferreira', 'f', 22, '2001-08-19'),
      ('Rafael Costa', 'm', 38, '1985-06-12'),
      ('Juliana Menezes', 'f', 27, '1997-04-01');

      -- Inserir 10 pratos
      INSERT INTO prato (nome, descricao, valor, disponibilidade) VALUES
      ('Filé à Parmegiana', 'Filé de frango empanado com molho de tomate e queijo gratinado.', 70.00, TRUE),
      ('Moqueca de Peixe', 'Peixe cozido com leite de coco e azeite de dendê.', 100.00, TRUE),
      ('Risoto de Cogumelos', 'Risoto cremoso com mix de cogumelos.', 120.00, TRUE),
      ('Lasanha à Bolonhesa', 'Massa com molho à bolonhesa e queijo gratinado.', 60.00, TRUE),
      ('Salmão Grelhado', 'Salmão grelhado com purê e legumes.', 100.50, TRUE),
      ('Strogonoff de Frango', 'Frango em molho cremoso com batata palha.', 50.00, TRUE),
      ('Escondidinho de Carne Seca', 'Purê de mandioca com carne seca desfiada.', 120.50, TRUE),
      ('Picanha na Chapa', 'Picanha grelhada com arroz, feijão e vinagrete.', 150.00, TRUE),
      ('Bacalhau à Gomes de Sá', 'Bacalhau desfiado com batatas e ovos.', 70.00, TRUE),
      ('Frango à Pizzaiolo', 'Peito de frango com molho de tomate, orégano e queijo.', 80.00, TRUE);

      -- Inserir 10 fornecedores
      INSERT INTO fornecedor (nome, estado_origem) VALUES
      ('Fornecedor A', 'SP'),
      ('Fornecedor B', 'RJ'),
      ('Fornecedor C', 'MG'),
      ('Fornecedor D', 'BA'),
      ('Fornecedor E', 'PE'),
      ('Fornecedor F', 'CE'),
      ('Fornecedor G', 'RS'),
      ('Fornecedor H', 'AM'),
      ('Fornecedor I', 'SC'),
      ('Fornecedor J', 'PR');

      -- Inserir 10 ingredientes
      INSERT INTO ingredientes (nome, data_fabricacao, data_validade, quantidade, observacao) VALUES
      ('Farinha de Trigo', '2024-01-01', '2024-06-01', 10, 'Está acabando'),
      ('Tomate', '2024-02-15', '2024-07-15', 30, 'Frescos'),
      ('Peito de Frango', '2024-03-10', '2024-08-10', 100, 'Grande quantidade'),
      ('Queijo Muçarela', '2024-04-05', '2024-09-05', 40, 'Comprar mais'),
      ('Camarão', '2024-05-20', '2024-10-20', 60, 'Manter refrigerado'),
      ('Arroz Arbóreo', '2024-06-18', '2024-11-18', 20, 'Ok'),
      ('Azeite de Oliva', '2024-07-25', '2024-12-25', 80, 'Ok'),
      ('Batata', '2024-08-30', '2025-01-30', 90, 'Grande quantidade'),
      ('Bacalhau', '2024-09-12', '2025-02-12', 10, 'Refrigerado'),
      ('Cenoura', '2024-10-10', '2025-03-10', 10, 'Ok');

      -- Inserir vendas (exemplo)
      INSERT INTO venda (id_cliente, id_prato, quantidade, dia, hora, valor) VALUES
      (1, 1, 2, '2024-10-20', '19:00', 140.00),
      (2, 2, 1, '2024-10-20', '20:00', 100.00);
    `;

    await client.query(query);
    console.log('Dados inseridos com sucesso!');

  } catch (err) {
    console.error('Erro ao inserir dados:', err);
  }
}
// Chamar a função principal
createDatabaseAndTables();
