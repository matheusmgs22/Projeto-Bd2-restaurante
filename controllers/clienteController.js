const connectDB = require('../db/connect');

// Inserir cliente
async function inserirCliente(nome, sexo, idade, nascimento) {
    const client = await connectDB();
    try {
        const query = 'INSERT INTO cliente (nome, sexo, idade, nascimento) VALUES ($1, $2, $3, $4)';
        await client.query(query, [nome, sexo, idade, nascimento]);
        console.log('Cliente inserido com sucesso!');
    } catch (err) {
        console.error('Erro ao inserir cliente:', err);
    }
}

// Atualizar cliente
async function atualizarCliente(id, nome, sexo, idade, nascimento) {
    const client = await connectDB();
    try {
        const query = 'UPDATE cliente SET nome = $1, sexo = $2, idade = $3, nascimento = $4 WHERE id = $5';
        await client.query(query, [nome, sexo, idade, nascimento, id]);
        console.log('Cliente atualizado com sucesso!');
    } catch (err) {
        console.error('Erro ao atualizar cliente:', err);
    }
}

// Deletar cliente
async function deletarCliente(id) {
    const client = await connectDB();
    try {
        const query = 'DELETE FROM cliente WHERE id = $1';
        await client.query(query, [id]);
        console.log('Cliente deletado com sucesso!');
    } catch (err) {
        console.error('Erro ao deletar cliente:', err);
    }
}

module.exports = { inserirCliente, atualizarCliente, deletarCliente };
