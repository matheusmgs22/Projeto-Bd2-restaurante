const { connectDB } = require('../config/db');

// Inserir fornecedor
async function inserirFornecedor(nome, estado_origem) {
    const client = await connectDB();
    try {
        const query = 'INSERT INTO fornecedor (nome, estado_origem) VALUES ($1, $2)';
        await client.query(query, [nome, estado_origem]);
        console.log('Fornecedor inserido com sucesso!');
    } catch (err) {
        console.error('Erro ao inserir fornecedor:', err);
        throw err;
    }
}

// Atualizar fornecedor
async function atualizarFornecedor(id, nome, estado_origem) {
    const client = await connectDB();
    try {
        const query = 'UPDATE fornecedor SET nome = $1, estado_origem = $2 WHERE id = $3';
        await client.query(query, [nome, estado_origem, id]);
        console.log('Fornecedor atualizado com sucesso!');
    } catch (err) {
        console.error('Erro ao atualizar fornecedor:', err);
        throw err;
    }
}

// Deletar fornecedor
async function deletarFornecedor(id) {
    const client = await connectDB();
    try {
        const query = 'DELETE FROM fornecedor WHERE id = $1';
        await client.query(query, [id]);
        console.log('Fornecedor deletado com sucesso!');
    } catch (err) {
        console.error('Erro ao deletar fornecedor:', err);
        throw err;
    }
}

module.exports = { inserirFornecedor, atualizarFornecedor, deletarFornecedor };
