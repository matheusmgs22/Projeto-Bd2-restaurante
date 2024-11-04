const connectDB = require('../config/db');

async function sortearPremiacao() {
    const client = await connectDB();
    try {
        const clienteQuery = 'SELECT id FROM cliente ORDER BY RANDOM() LIMIT 1';
        const cliente = await client.query(clienteQuery);

        // Verifica se um cliente foi encontrado
        if (cliente.rows.length === 0) {
            console.log('Nenhum cliente encontrado para premiar.');
            return;
        }

        const clienteId = cliente.rows[0].id;

        const premiacaoQuery = 'UPDATE cliente SET pontos = pontos + 100 WHERE id = $1';
        await client.query(premiacaoQuery, [clienteId]);

        console.log(`Cliente ${clienteId} premiado com 100 pontos.`);
    } catch (err) {
        console.error('Erro ao premiar cliente:', err);
    }
}


if (require.main === module) {
    (async () => {
        await sortearPremiacao();
    })();
}

module.exports = { sortearPremiacao };
