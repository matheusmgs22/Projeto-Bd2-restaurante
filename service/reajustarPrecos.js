const connectDB = require('../config/db');

async function reajustarPrecos(percentual) {
    const client = await connectDB();

    try {
        const query = `
            UPDATE prato
            SET valor = valor + (valor * $1 / 100);
        `;
        await client.query(query, [percentual]);
        console.log(`Preços reajustados em ${percentual}% com sucesso!`);
    } catch (err) {
        console.error('Erro ao reajustar preços:', err);
    } finally {
        await client.end();
    }
}

if (require.main === module) {
    const percentualReajuste = 10;
    if (!percentualReajuste) {
        console.error('Por favor, forneça um percentual de reajuste.');
        process.exit(1);
    }
    reajustarPrecos(parseFloat(percentualReajuste));
}

module.exports = reajustarPrecos;
