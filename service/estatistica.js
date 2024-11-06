const connectDB = require('../config/db');

async function criarProcedimento() {
    const client = await connectDB();
    try {
        const criarProcedimentoSQL = `
            CREATE OR REPLACE PROCEDURE calcular_estatisticas_vendas()
            LANGUAGE plpgsql
            AS $$
            DECLARE
                record RECORD;
            BEGIN
                -- Produto mais vendido
                RAISE NOTICE 'Produto mais vendido:';
                FOR record IN
                    WITH vendas_por_produto AS (
                        SELECT
                            id_prato,
                            SUM(quantidade) AS total_vendido,
                            SUM(valor) AS valor_total
                        FROM venda
                        GROUP BY id_prato
                    )
                    SELECT p.nome, vp.total_vendido, vp.valor_total
                    FROM vendas_por_produto vp
                    JOIN prato p ON vp.id_prato = p.id
                    ORDER BY vp.total_vendido DESC
                    LIMIT 1
                LOOP
                    RAISE NOTICE 'Nome: %, Total Vendido: %, Valor Total: %',
                        record.nome, record.total_vendido, record.valor_total;
                END LOOP;

                -- Produto menos vendido
                RAISE NOTICE 'Produto menos vendido:';
                FOR record IN
                    WITH vendas_por_produto AS (
                        SELECT
                            id_prato,
                            SUM(quantidade) AS total_vendido,
                            SUM(valor) AS valor_total
                        FROM venda
                        GROUP BY id_prato
                    )
                    SELECT p.nome, vp.total_vendido, vp.valor_total
                    FROM vendas_por_produto vp
                    JOIN prato p ON vp.id_prato = p.id
                    ORDER BY vp.total_vendido ASC
                    LIMIT 1
                LOOP
                    RAISE NOTICE 'Nome: %, Total Vendido: %, Valor Total: %',
                        record.nome, record.total_vendido, record.valor_total;
                END LOOP;

                -- Mês de maior e menor vendas do produto mais vendido
                RAISE NOTICE 'Mês de maior e menor vendas do produto mais vendido:';
                FOR record IN
                    WITH vendas_por_produto AS (
                        SELECT
                            id_prato,
                            EXTRACT(MONTH FROM dia) AS mes_venda,
                            SUM(quantidade) AS total_vendido
                        FROM venda
                        GROUP BY id_prato, mes_venda
                    ),
                    produto_mais_vendido AS (
                        SELECT id_prato
                        FROM vendas_por_produto
                        ORDER BY total_vendido DESC
                        LIMIT 1
                    )
                    SELECT
                        (SELECT EXTRACT(MONTH FROM vd.dia)
                         FROM venda vd
                         JOIN produto_mais_vendido pmv ON vd.id_prato = pmv.id_prato
                         GROUP BY EXTRACT(MONTH FROM vd.dia)
                         ORDER BY SUM(vd.quantidade) DESC
                         LIMIT 1) AS mes_maior_venda_produto_mais_vendido,

                        (SELECT EXTRACT(MONTH FROM vd.dia)
                         FROM venda vd
                         JOIN produto_mais_vendido pmv ON vd.id_prato = pmv.id_prato
                         GROUP BY EXTRACT(MONTH FROM vd.dia)
                         ORDER BY SUM(vd.quantidade) ASC
                         LIMIT 1) AS mes_menor_venda_produto_mais_vendido
                LOOP
                    RAISE NOTICE 'Maior Mês: %, Menor Mês: %',
                        record.mes_maior_venda_produto_mais_vendido,
                        record.mes_menor_venda_produto_mais_vendido;
                END LOOP;

                -- Mês de maior e menor vendas do produto menos vendido
                RAISE NOTICE 'Mês de maior e menor vendas do produto menos vendido:';
                FOR record IN
                    WITH vendas_por_produto AS (
                        SELECT
                            id_prato,
                            EXTRACT(MONTH FROM dia) AS mes_venda,
                            SUM(quantidade) AS total_vendido
                        FROM venda
                        GROUP BY id_prato, mes_venda
                    ),
                    produto_menos_vendido AS (
                        SELECT id_prato
                        FROM vendas_por_produto
                        ORDER BY total_vendido ASC
                        LIMIT 1
                    )
                    SELECT
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
                LOOP
                    RAISE NOTICE 'Maior Mês: %, Menor Mês: %',
                        record.mes_maior_venda_produto_menos_vendido,
                        record.mes_menor_venda_produto_menos_vendido;
                END LOOP;

            END;
            $$;
        `;

        // Executando o comando para criar o procedimento
        await client.query(criarProcedimentoSQL);
        console.log("Procedimento 'calcular_estatisticas_vendas' criado com sucesso!");
    } catch (err) {
        console.error('Erro ao criar procedimento:', err);
    } finally {
        await client.end();
    }
}

(async () => {
    console.log("Criando procedimento no banco de dados...");
    await criarProcedimento();
    console.log("Procedimento criado com sucesso.");
})();
