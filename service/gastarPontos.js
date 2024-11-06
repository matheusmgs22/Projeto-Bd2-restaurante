const connectDB = require('../config/db'); // ajuste o caminho para o seu arquivo de conexão


async function criarProcedureGastarPontos() {
    const client = await connectDB();
    try {

        const procedureSQL = `
            CREATE OR REPLACE PROCEDURE gastar_pontos(id_cliente INT, id_prato INT)
            LANGUAGE plpgsql
            AS $$
            DECLARE
                pontos_cliente INT;
                valor_prato NUMERIC;
                pontos_necessarios INT;
                pontos_restantes INT;
            BEGIN
                -- Obtém os pontos do cliente
                SELECT pontos INTO pontos_cliente FROM cliente WHERE id = id_cliente;
                IF NOT FOUND THEN
                    RAISE EXCEPTION 'Cliente com ID % não encontrado', id_cliente;
                END IF;

                -- Obtém o valor do prato
                SELECT valor INTO valor_prato FROM prato WHERE id = id_prato;
                IF NOT FOUND THEN
                    RAISE EXCEPTION 'Prato com ID % não encontrado', id_prato;
                END IF;

                -- Calcula os pontos necessários
                pontos_necessarios := FLOOR(valor_prato);
                IF valor_prato % 1 <> 0 THEN
                    pontos_necessarios := pontos_necessarios + 1; -- Ponto extra para cobrir centavos
                END IF;

                -- Verifica se o cliente tem pontos suficientes
                IF pontos_cliente >= pontos_necessarios THEN
                    pontos_restantes := pontos_cliente - pontos_necessarios;
                    UPDATE cliente SET pontos = pontos_restantes WHERE id = id_cliente;
                    RAISE NOTICE 'Cliente % usou % pontos para comprar o prato %', id_cliente, pontos_necessarios, id_prato;
                ELSE
                    RAISE NOTICE 'Pontos insuficientes para realizar a compra';
                END IF;
            END;
            $$;
        `;

        // Executa o comando para criar o procedure
        await client.query(procedureSQL);
        console.log("Procedure 'gastar_pontos' criada com sucesso.");
    } catch (err) {
        console.error("Erro ao criar o procedure 'gastar_pontos':", err);
    } finally {
        await client.end();
    }
}

// Executa a função para criar o procedure
(async () => {
    await criarProcedureGastarPontos();
})();

// Para usar: CALL public.gastar_pontos(8, 1);
