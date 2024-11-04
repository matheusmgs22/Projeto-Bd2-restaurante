const connectDB = require('../config/db');

function calcularPontos(valorCompra) {

    if (valorCompra < 0) {
        console.error('O valor da compra não pode ser negativo.');
        return 0;
    }

    const pontos = Math.floor(valorCompra / 10);
    console.log(`Pontos acumulados na compra de R$${valorCompra.toFixed(2)}: ${pontos}`);
    return pontos;
}
(async () => {
    const valorCompra = 100;
    const pontos = await calcularPontos(valorCompra); // Chamada assíncrona
    console.log(`Pontos ganhos: ${pontos}`);
})();



module.exports = { calcularPontos };
