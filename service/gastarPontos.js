const connectDB = require('../config/db');

async function gastarPontos(idCliente, idPrato) {
    const client = await connectDB();
    try {

        const pontosQuery = 'SELECT pontos FROM cliente WHERE id = $1';
        const pontosResult = await client.query(pontosQuery, [idCliente]);

        if (pontosResult.rows.length === 0) {
            console.log(`Cliente com ID ${idCliente} não encontrado.`);
            return;
        }

        const pontosCliente = pontosResult.rows[0].pontos;

        const pratoQuery = 'SELECT valor FROM prato WHERE id = $1';
        const pratoResult = await client.query(pratoQuery, [idPrato]);

        if (pratoResult.rows.length === 0) {
            console.log(`Prato com ID ${idPrato} não encontrado.`);
            return;
        }

        const valorPrato = pratoResult.rows[0].valor;

        console.log(`Pontos do cliente: ${pontosCliente}`);
        console.log(`Valor do prato: ${valorPrato}`);


        let pontosNecessarios = Math.floor(valorPrato);
        const temCentavos = valorPrato % 1 !== 0;

        if (temCentavos) {
            pontosNecessarios += 1; // Usa um ponto extra para cobrir os centavos
        }

        if (pontosCliente >= pontosNecessarios) {
            const pontosRestantes = pontosCliente - pontosNecessarios; // Calcula os pontos restantes
            const atualizarPontos = 'UPDATE cliente SET pontos = $1 WHERE id = $2';
            await client.query(atualizarPontos, [pontosRestantes, idCliente]);

            console.log(`Cliente ${idCliente} usou ${pontosNecessarios} pontos para comprar o prato ${idPrato}.`);
            console.log(`Pontos restantes: ${pontosRestantes}`);
            console.log("Operação de gastar pontos concluída.");
        } else {
            console.log('Pontos insuficientes para realizar a compra.');
        }
    } catch (err) {
        console.error('Erro ao gastar pontos:', err);
    }
}

(async () => {
    const idCliente = 8;
    const idPrato = 1;

    console.log("Tentando gastar pontos...");
    await gastarPontos(idCliente, idPrato);
})();

module.exports = { gastarPontos };
