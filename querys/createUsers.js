const connectDB = require('../config/db');

async function createUsers() {
    const client = await connectDB();

    try {
        await client.query(`
            CREATE ROLE administrador WITH LOGIN PASSWORD '123';
            GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO administrador;
        `);

        await client.query(`
            CREATE ROLE gerente WITH LOGIN PASSWORD '123';
            GRANT SELECT, DELETE, UPDATE ON ALL TABLES IN SCHEMA public TO gerente;
        `);

        await client.query(`
            CREATE ROLE funcionario WITH LOGIN PASSWORD '123';
            GRANT INSERT ON ALL TABLES IN SCHEMA public TO funcionario;
            GRANT SELECT ON registros_vendas TO funcionario;
        `);

        console.log('Usuários criados com sucesso!');
    } catch (err) {
        console.error('Erro ao criar usuários:', err);
    } finally {
        await client.end();
    }
}

module.exports = { createUsers };
