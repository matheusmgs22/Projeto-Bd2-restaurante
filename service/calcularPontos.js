const connectDB = require('../config/db');

async function FunctionCalcularPontos() {
    const client = await connectDB();

    const criarFunctionSQL = `
        CREATE OR REPLACE FUNCTION calcular_pontos(valor_compra NUMERIC)
        RETURNS INTEGER AS $$
        DECLARE
            pontos INTEGER;
        BEGIN
            -- Verificar se o valor da compra é negativo
            IF valor_compra < 0 THEN
                RAISE EXCEPTION 'O valor da compra não pode ser negativo.';
            END IF;

            -- Calcular os pontos: 1 ponto para cada 10 reais
            pontos := FLOOR(valor_compra / 10);

            -- Retornar os pontos calculados
            RETURN pontos;
        END;
        $$ LANGUAGE plpgsql;
    `;

    try {
        // Executar o SQL para criar a function no PostgreSQL
        await client.query(criarFunctionSQL);
        console.log('Função calcular_pontos criada com sucesso!');
    } catch (err) {
        console.error('Erro ao criar a função calcular_pontos:', err);
    } finally {
        await client.end();
    }
}

FunctionCalcularPontos();
