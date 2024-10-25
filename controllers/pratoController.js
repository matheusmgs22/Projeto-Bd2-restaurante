const connectDB = require('../db/connect');

// Inserir prato
async function inserirPrato(nome, descricao, valor, disponibilidade) {
    const client = await connectDB();
    try {
        const query = 'INSERT INTO prato (nome, descricao, valor, disponibilidade) VALUES ($1, $2, $3, $4)';
        await client.query(query, [nome, descricao, valor, disponibilidade]);
        console.log('Prato inserido com sucesso!');
    } catch (err) {
        console.error('Erro ao inserir prato:', err);
        throw err;
    }
}

// Atualizar prato
async function atualizarPrato(id, nome, descricao, valor, disponibilidade) {
    const client = await connectDB();
    try {
        const query = 'UPDATE prato SET nome = $1, descricao = $2, valor = $3, disponibilidade = $4 WHERE id = $5';
        await client.query(query, [nome, descricao, valor, disponibilidade, id]);
        console.log('Prato atualizado com sucesso!');
    } catch (err) {
        console.error('Erro ao atualizar prato:', err);
        throw err;
    }
}

// Deletar prato
async function deletarPrato(id) {
    const client = await connectDB();
    try {
        const query = 'DELETE FROM prato WHERE id = $1';
        await client.query(query, [id]);
        console.log('Prato deletado com sucesso!');
    } catch (err) {
        console.error('Erro ao deletar prato:', err);
        throw err;
    }
}

module.exports = { inserirPrato, atualizarPrato, deletarPrato };
