const { connectDB } = require('../config/db');

// Inserir ingrediente
async function inserirIngrediente(nome, data_fabricacao, data_validade, quantidade, observacao) {
    const client = await connectDB();
    try {
        const query = 'INSERT INTO ingredientes (nome, data_fabricacao, data_validade, quantidade, observacao) VALUES ($1, $2, $3, $4, $5)';
        await client.query(query, [nome, data_fabricacao, data_validade, quantidade, observacao]);
        console.log('Ingrediente inserido com sucesso!');
    } catch (err) {
        console.error('Erro ao inserir ingrediente:', err);
        throw err;
    }
}

// Atualizar ingrediente
async function atualizarIngrediente(id, nome, data_fabricacao, data_validade, quantidade, observacao) {
    const client = await connectDB();
    try {
        const query = 'UPDATE ingredientes SET nome = $1, data_fabricacao = $2, data_validade = $3, quantidade = $4, observacao = $5 WHERE id = $6';
        await client.query(query, [nome, data_fabricacao, data_validade, quantidade, observacao, id]);
        console.log('Ingrediente atualizado com sucesso!');
    } catch (err) {
        console.error('Erro ao atualizar ingrediente:', err);
        throw err;
    }
}

// Deletar ingrediente
async function deletarIngrediente(id) {
    const client = await connectDB();
    try {
        const query = 'DELETE FROM ingredientes WHERE id = $1';
        await client.query(query, [id]);
        console.log('Ingrediente deletado com sucesso!');
    } catch (err) {
        console.error('Erro ao deletar ingrediente:', err);
        throw err;
    }
}

module.exports = { inserirIngrediente, atualizarIngrediente, deletarIngrediente };
