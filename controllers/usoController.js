const { connectDB } = require('../config/db');

// Inserir uso
async function inserirUso(id_prato, id_ingrediente) {
    const client = await connectDB();
    try {
        const query = 'INSERT INTO usos (id_prato, id_ingrediente) VALUES ($1, $2)';
        await client.query(query, [id_prato, id_ingrediente]);
        console.log('Uso inserido com sucesso!');
    } catch (err) {
        console.error('Erro ao inserir uso:', err);
        throw err;
    }
}

// Atualizar uso
async function atualizarUso(id_prato, id_ingrediente) {
    const client = await connectDB();
    try {
        const query = 'UPDATE usos SET id_ingrediente = $1 WHERE id_prato = $2';
        await client.query(query, [id_ingrediente, id_prato]);
        console.log('Uso atualizado com sucesso!');
    } catch (err) {
        console.error('Erro ao atualizar uso:', err);
        throw err;
    }
}

// Deletar uso
async function deletarUso(id_prato, id_ingrediente) {
    const client = await connectDB();
    try {
        const query = 'DELETE FROM usos WHERE id_prato = $1 AND id_ingrediente = $2';
        await client.query(query, [id_prato, id_ingrediente]);
        console.log('Uso deletado com sucesso!');
    } catch (err) {
        console.error('Erro ao deletar uso:', err);
        throw err;
    }
}

module.exports = { inserirUso, atualizarUso, deletarUso };
