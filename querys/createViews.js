const { connectDB } = require('../config/db');

async function createViews() {
    const client = await connectDB();

    try {
        // vendas por cliente
        await client.query(`
            CREATE VIEW vendas_totais_por_cliente AS
            SELECT c.nome AS cliente, COUNT(v.id) AS total_vendas, SUM(v.valor) AS valor_total
            FROM venda v JOIN cliente c ON v.id_cliente = c.id
            GROUP BY c.nome;
        `);
        // pratos mais pedidos do restaurante
        await client.query(`
            CREATE VIEW frequencia_pedidos_prato AS
            SELECT p.nome AS prato, SUM(v.quantidade) AS total_pedidos, SUM(v.valor) AS valor_total
            FROM prato p
            JOIN venda v ON p.id = v.id_prato
            GROUP BY p.nome
            ORDER BY total_pedidos DESC;

        `);
        // ingredientes mais utilizados nos pratos do restaurante
        await client.query(`
            CREATE OR REPLACE VIEW ingredientes_mais_usados_pratos_disponiveis AS
            SELECT i.nome AS ingrediente, COUNT(u.id_ingrediente) AS frequencia_uso
            FROM ingredientes i
            JOIN usos u ON i.id = u.id_ingrediente
            JOIN prato p ON u.id_prato = p.id
            WHERE p.disponibilidade = TRUE
            GROUP BY i.nome
            ORDER BY frequencia_uso DESC;

        `);

        console.log('Views criadas com sucesso!');
    } catch (err) {
        console.error('Erro ao criar views:', err);
    } finally {
        await client.end();
    }
}

module.exports = { createViews };
