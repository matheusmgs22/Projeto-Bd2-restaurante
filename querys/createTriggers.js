const connectDB = require('../config/db');

async function createTriggers() {
  const client = await connectDB();

  try {
    const query = `
      -- Trigger para definir disponibilidade como 0 se o ingrediente inserido estiver vencido
      CREATE TRIGGER ingredientes_AFTER_INSERT AFTER INSERT ON ingredientes
      FOR EACH ROW
      BEGIN
        IF NEW.data_validade < CURRENT_DATE THEN
          UPDATE prato
          JOIN usos ON usos.id_prato = prato.id
          SET prato.disponibilidade = 0
          WHERE usos.id_ingrediente = NEW.id AND prato.id = usos.id_prato;
        END IF;
      END;

      -- Trigger para atualizar a disponibilidade de prato após atualização de ingrediente
      CREATE TRIGGER ingredientes_AFTER_UPDATE AFTER UPDATE ON ingredientes
      FOR EACH ROW
      BEGIN
        IF NEW.data_validade < CURRENT_DATE THEN
          UPDATE prato
          JOIN usos ON usos.id_prato = prato.id
          SET prato.disponibilidade = 0
          WHERE usos.id_ingrediente = NEW.id AND prato.id = usos.id_prato;
        END IF;
      END;

      -- Trigger para atualizar a quantidade de ingredientes ao inserir em usos
      CREATE TRIGGER usos_AFTER_INSERT AFTER INSERT ON usos
      FOR EACH ROW
      BEGIN
        IF (SELECT quantidade FROM ingredientes WHERE id = NEW.id_ingrediente) > 0 THEN
          UPDATE ingredientes
          SET quantidade = quantidade - 1
          WHERE id = NEW.id_ingrediente;
        END IF;
      END;

      -- Trigger para verificar disponibilidade do prato antes de inserir venda
      CREATE TRIGGER venda_BEFORE_INSERT BEFORE INSERT ON venda
      FOR EACH ROW
      BEGIN
        DECLARE disponibilidade INT;
        DECLARE ingrediente_vencido INT DEFAULT 0;

        -- Obter o valor de disponibilidade do prato
        SELECT disponibilidade INTO disponibilidade
        FROM prato
        WHERE id = NEW.id_prato;

        -- Verifica se o prato está indisponível e atualiza o motivo
        IF disponibilidade = 0 THEN
          SET NEW.motivo = 'Prato indisponível';
        END IF;

        -- Verificar se há ingredientes vencidos associados ao prato e atualizar o motivo
        SELECT COUNT(*) INTO ingrediente_vencido
        FROM ingredientes
        JOIN usos ON usos.id_ingrediente = ingredientes.id
        WHERE usos.id_prato = NEW.id_prato
          AND ingredientes.data_validade < CURRENT_DATE;

        IF ingrediente_vencido > 0 THEN
          SET NEW.motivo = 'Ingredientes vencidos no prato';
        END IF;

        -- Se nenhum problema for encontrado, define o motivo como "Venda realizada"
        IF disponibilidade != 0 AND ingrediente_vencido = 0 THEN
          SET NEW.motivo = 'Venda realizada';
        END IF;
      END;

      -- Trigger para reduzir a quantidade de ingredientes e atualizar pontos do cliente após venda
      CREATE TRIGGER venda_AFTER_INSERT AFTER INSERT ON venda
      FOR EACH ROW
      BEGIN
        -- Reduz a quantidade de ingredientes para o prato vendido
        UPDATE ingredientes
        SET quantidade = quantidade - 1
        WHERE id IN (
          SELECT id_ingrediente
          FROM usos
          WHERE id_prato = NEW.id_prato
        )
        AND quantidade > 0;

        -- Atualiza os pontos do cliente com base no valor da venda
        UPDATE cliente
        SET pontos = pontos + (NEW.quantidade * NEW.valor) / 10
        WHERE id = NEW.id_cliente;
      END;
    `;

    await client.query(query);
    console.log('Triggers criados com sucesso!');
  } catch (err) {
    console.error('Erro ao criar triggers:', err);
  } finally {
    await client.end();
  }
}

// createTriggers(); // Descomente para testar a função
module.exports = createTriggers;
