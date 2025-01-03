const connectDB = require('../config/db');

async function insertData() {
  const client = await connectDB();
    try {
      const query = `
        INSERT INTO cliente (nome, sexo, idade, nascimento, pontos) VALUES
        ('João Silva', 'm', 30, '1993-05-10', 100),
        ('Maria Souza', 'f', 25, '1998-07-15', 100),
        ('Pedro Santos', 'm', 40, '1984-09-25', 200),
        ('Ana Paula', 'f', 35, '1989-02-18', 100),
        ('Lucas Almeida', 'm', 28, '1996-03-22', 200),
        ('Fernanda Lima', 'f', 32, '1991-12-30', 300),
        ('Gustavo Ribeiro', 'm', 45, '1979-11-05', 400),
        ('Letícia Ferreira', 'f', 22, '2001-08-19', 100),
        ('Rafael Costa', 'm', 38, '1985-06-12', 100),
        ('Juliana Menezes', 'f', 27, '1997-04-01', 50);

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
        (1, 1, 2, '2024-10-21', '18:30', 140.00),  -- João Silva compra 2 Filé à Parmegiana
        (2, 2, 1, '2024-10-21', '20:00', 100.00),  -- Maria Souza compra 1 Moqueca de Peixe
        (3, 3, 3, '2024-10-22', '12:00', 360.00),  -- Pedro Santos compra 3 Risoto de Cogumelos
        (4, 4, 1, '2024-10-22', '14:30', 60.00),   -- Ana Paula compra 1 Lasanha à Bolonhesa
        (5, 5, 2, '2024-10-23', '20:15', 201.00),  -- Lucas Almeida compra 2 Salmão Grelhado
        (6, 6, 1, '2024-10-23', '19:45', 50.00),   -- Fernanda Lima compra 1 Strogonoff de Frango
        (7, 7, 2, '2024-10-24', '13:00', 241.00),  -- Gustavo Ribeiro compra 2 Escondidinho de Carne Seca
        (8, 8, 1, '2024-10-24', '16:30', 150.00),  -- Letícia Ferreira compra 1 Picanha na Chapa
        (9, 9, 1, '2024-10-25', '17:00', 70.00),   -- Rafael Costa compra 1 Bacalhau à Gomes de Sá
        (10, 10, 1, '2024-10-25', '20:00', 80.00); -- Juliana Menezes compra 1 Frango à Pizzaiolo

        -- Pizza Margherita usa Farinha de Trigo, Tomate e Queijo Muçarela
        INSERT INTO usos (id_prato, id_ingrediente) VALUES (1, 1); -- Farinha de Trigo
        INSERT INTO usos (id_prato, id_ingrediente) VALUES (1, 2); -- Tomate
        INSERT INTO usos (id_prato, id_ingrediente) VALUES (1, 4); -- Queijo Muçarela

        -- Salada Caesar usa Alface, Tomate e Azeite de Oliva
        INSERT INTO usos (id_prato, id_ingrediente) VALUES (2, 2); -- Tomate
        INSERT INTO usos (id_prato, id_ingrediente) VALUES (2, 7); -- Azeite de Oliva

        -- Risoto de Camarão usa Camarão, Arroz Arbóreo e Azeite de Oliva
        INSERT INTO usos (id_prato, id_ingrediente) VALUES (3, 5); -- Camarão
        INSERT INTO usos (id_prato, id_ingrediente) VALUES (3, 6); -- Arroz Arbóreo
        INSERT INTO usos (id_prato, id_ingrediente) VALUES (3, 7); -- Azeite de Oliva

        -- Frango à Parmegiana usa Peito de Frango, Farinha de Trigo e Queijo Muçarela
        INSERT INTO usos (id_prato, id_ingrediente) VALUES (4, 3); -- Peito de Frango
        INSERT INTO usos (id_prato, id_ingrediente) VALUES (4, 1); -- Farinha de Trigo
        INSERT INTO usos (id_prato, id_ingrediente) VALUES (4, 4); -- Queijo Muçarela

        -- Bacalhau à Portuguesa usa Bacalhau, Batata e Azeite de Oliva
        INSERT INTO usos (id_prato, id_ingrediente) VALUES (5, 9); -- Bacalhau
        INSERT INTO usos (id_prato, id_ingrediente) VALUES (5, 8); -- Batata
        INSERT INTO usos (id_prato, id_ingrediente) VALUES (5, 7); -- Azeite de Oliva

      `;

      await client.query(query);
      console.log('Dados inseridos com sucesso!');
    } catch (err) {
      console.error('Erro ao inserir dados:', err);
    }
  }

insertData();
module.exports = insertData;
