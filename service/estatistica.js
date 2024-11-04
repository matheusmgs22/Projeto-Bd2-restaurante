const connectDB = require('../config/db');

async function exibirEstatisticas() {
    const client = await connectDB();
    try {
        const estatisticasQuery = `
            WITH vendas_por_produto AS (
                SELECT
                    id_prato,
                    EXTRACT(MONTH FROM dia) AS mes_venda,
                    SUM(quantidade) AS total_vendido,
                    SUM(valor) AS valor_total
                FROM venda
                GROUP BY id_prato, mes_venda
            ),
            produto_mais_vendido AS (
                SELECT id_prato, total_vendido, valor_total
                FROM vendas_por_produto
                ORDER BY total_vendido DESC
                LIMIT 1
            ),
            produto_menos_vendido AS (
                SELECT id_prato, total_vendido, valor_total
                FROM vendas_por_produto
                ORDER BY total_vendido ASC
                LIMIT 1
            )
            SELECT
                -- Produto mais vendido
                (SELECT p.nome FROM prato p JOIN produto_mais_vendido pmv ON p.id = pmv.id_prato) AS produto_mais_vendido,

                -- Valor ganho com o produto mais vendido
                (SELECT SUM(vd.valor) FROM venda vd JOIN produto_mais_vendido pmv ON vd.id_prato = pmv.id_prato) AS valor_mais_vendido,

                -- Mês de maior e menor vendas do produto mais vendido
                (SELECT EXTRACT(MONTH FROM vd.dia)
                 FROM venda vd
                 JOIN produto_mais_vendido pmv ON vd.id_prato = pmv.id_prato
                 GROUP BY EXTRACT(MONTH FROM vd.dia)
                 ORDER BY SUM(vd.quantidade) DESC
                 LIMIT 1) AS mes_maior_venda_produto_mais_svendido,

                (SELECT EXTRACT(MONTH FROM vd.dia)
                 FROM venda vd
                 JOIN produto_mais_vendido pmv ON vd.id_prato = pmv.id_prato
                 GROUP BY EXTRACT(MONTH FROM vd.dia)
                 ORDER BY SUM(vd.quantidade) ASC
                 LIMIT 1) AS mes_menor_venda_produto_mais_vendido,

                -- Produto menos vendido
                (SELECT p.nome FROM prato p JOIN produto_menos_vendido pmv ON p.id = pmv.id_prato) AS produto_menos_vendido,

                -- Valor ganho com o produto menos vendido
                (SELECT SUM(vd.valor) FROM venda vd JOIN produto_menos_vendido pmv ON vd.id_prato = pmv.id_prato) AS valor_menos_vendido,

                -- Mês de maior e menor vendas do produto menos vendido
                (SELECT EXTRACT(MONTH FROM vd.dia)
                 FROM venda vd
                 JOIN produto_menos_vendido pmv ON vd.id_prato = pmv.id_prato
                 GROUP BY EXTRACT(MONTH FROM vd.dia)
                 ORDER BY SUM(vd.quantidade) DESC
                 LIMIT 1) AS mes_maior_venda_produto_menos_vendido,

                (SELECT EXTRACT(MONTH FROM vd.dia)
                 FROM venda vd
                 JOIN produto_menos_vendido pmv ON vd.id_prato = pmv.id_prato
                 GROUP BY EXTRACT(MONTH FROM vd.dia)
                 ORDER BY SUM(vd.quantidade) ASC
                 LIMIT 1) AS mes_menor_venda_produto_menos_vendido
        `;

        const resultado = await client.query(estatisticasQuery);
        console.log("Estatísticas de Vendas:", resultado.rows);
    } catch (err) {
        console.error('Erro ao exibir estatísticas:', err);
    } finally {
        await client.end();
    }
}

(async () => {
    console.log("Calculando e exibindo estatísticas de vendas...");
    await exibirEstatisticas();
    console.log("Exibição de estatísticas concluída.");
})();

module.exports = { exibirEstatisticas };
