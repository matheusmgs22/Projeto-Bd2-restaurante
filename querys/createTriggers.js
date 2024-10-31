const { connectDB } = require('../config/db');

async function createTriggers() {
  const client = await connectDB();

  try {
    const query = `
      -- Criar triggers

      CREATE TRIGGER atualizar_pontos_cliente
      AFTER INSERT ON venda
      FOR EACH ROW
      BEGIN
        UPDATE cliente
        SET pontos = pontos + CAST((NEW.quantidade * NEW.valor) / 10 AS INTEGER)
        WHERE id = NEW.id_cliente;
      END;

      CREATE TRIGGER verificar_disponibilidade_prato_apos_inserir
      AFTER INSERT ON ingredientes
      FOR EACH ROW
      WHEN NEW.data_validade < CURRENT_DATE
      BEGIN
        UPDATE prato
        SET disponibilidade = 0
        WHERE id IN (
          SELECT id_prato
          FROM usos
          WHERE id_ingrediente = NEW.id
        );
      END;

      CREATE TRIGGER verificar_disponibilidade_prato_apos_atualizar
      AFTER UPDATE ON ingredientes
      FOR EACH ROW
      WHEN NEW.data_validade < CURRENT_DATE
      BEGIN
        UPDATE prato
        SET disponibilidade = 0
        WHERE id IN (
          SELECT id_prato
          FROM usos
          WHERE id_ingrediente = NEW.id
        );
      END;

      CREATE TRIGGER verificar_disponibilidade_prato_na_venda
      BEFORE INSERT ON venda
      FOR EACH ROW
      WHEN (SELECT disponibilidade FROM prato WHERE id = NEW.id_prato) = 0
      BEGIN
        SELECT RAISE(ABORT, 'Este prato está indisponível no momento. A compra não pode ser realizada.');
      END;

      CREATE TRIGGER atualizar_quantidade_ingrediente_apos_venda
      AFTER INSERT ON venda
      FOR EACH ROW
      BEGIN
        UPDATE ingredientes
        SET quantidade = quantidade - 1
        WHERE id IN (
          SELECT id_ingrediente
          FROM usos
          WHERE id_prato = NEW.id_prato
        );
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
