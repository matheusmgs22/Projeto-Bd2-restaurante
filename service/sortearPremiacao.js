const connectDB = require('../config/db');

async function criarProcedureReajustarPrecos() {
    const client = await connectDB();

    try {
        const query = `
            CREATE OR REPLACE PROCEDURE reajustar_precos(IN percentual NUMERIC)
            LANGUAGE plpgsql
            AS $$
            BEGIN
                UPDATE prato
                SET valor = valor + (valor * (percentual / 100));
                RAISE NOTICE 'Preços reajustados em % com sucesso!', percentual;
            END;
            $$;
        `;

        await client.query(query);
        console.log('Procedure reajustar_precos criada com sucesso!');
    } catch (err) {
        console.error('Erro ao criar o procedure:', err);
    } finally {
        await client.end();
    }
}

if (require.main === module) {
    criarProcedureReajustarPrecos();
}

module.exports = criarProcedureReajustarPrecos;

// execute o procedure com: CALL public.reajustar_precos(10)
