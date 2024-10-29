const connectDB = require('./connect');

async function insertData() {
  const client = await connectDB();
    try {
      const query = `
        INSERT INTO cliente (nome, sexo, idade, nascimento, pontos) VALUES
        ('João Silva', 'm', 30, '1993-05-10', 0),
        ('Maria Souza', 'f', 25, '1998-07-15', 0),
        ('Pedro Santos', 'm', 40, '1984-09-25', 200),
        ('Ana Paula', 'f', 35, '1989-02-18', 0),
        ('Lucas Almeida', 'm', 28, '1996-03-22', 0),
        ('Fernanda Lima', 'f', 32, '1991-12-30', 0),
        ('Gustavo Ribeiro', 'm', 45, '1979-11-05', 0),
        ('Letícia Ferreira', 'f', 22, '2001-08-19', 0),
        ('Rafael Costa', 'm', 38, '1985-06-12', 0),
        ('Juliana Menezes', 'f', 27, '1997-04-01', 0);

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

insertData();
module.exports = insertData;
