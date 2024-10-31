const { connectDB } = require('../config/db');

// Inserir venda
async function inserirVenda(id_cliente, id_prato, quantidade, dia, hora, valor) {
    const client = await connectDB();
    try {
        const query = 'INSERT INTO venda (id_cliente, id_prato, quantidade, dia, hora, valor) VALUES ($1, $2, $3, $4, $5, $6)';
        await client.query(query, [id_cliente, id_prato, quantidade, dia, hora, valor]);
        console.log('Venda inserida com sucesso!');
    } catch (err) {
        console.error('Erro ao inserir venda:', err);
        throw err;
    }
}

// Atualizar venda
async function atualizarVenda(id, id_cliente, id_prato, quantidade, dia, hora, valor) {
    const client = await connectDB();
    try {
        const query = 'UPDATE venda SET id_cliente = $1, id_prato = $2, quantidade = $3, dia = $4, hora = $5, valor = $6 WHERE id = $7';
        await client.query(query, [id_cliente, id_prato, quantidade, dia, hora, valor, id]);
        console.log('Venda atualizada com sucesso!');
    } catch (err) {
        console.error('Erro ao atualizar venda:', err);
        throw err;
    }
}

// Deletar venda
async function deletarVenda(id) {
    const client = await connectDB();
    try {
        const query = 'DELETE FROM venda WHERE id = $1';
        await client.query(query, [id]);
        console.log('Venda deletada com sucesso!');
    } catch (err) {
        console.error('Erro ao deletar venda:', err);
        throw err;
    }
}

module.exports = { inserirVenda, atualizarVenda, deletarVenda };
