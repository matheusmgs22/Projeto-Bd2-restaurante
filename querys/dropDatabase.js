const connectDB = require('../config/db');

// Função para deletar o banco de dados
async function dropDatabase() {
const client = await connectDB();

try {
	// Desconectar todos os usuarios do banco de dados
	await client.query(`
	SELECT pg_terminate_backend(pg_stat_activity.pid)
	FROM pg_stat_activity
	WHERE pg_stat_activity.datname = 'restaurante'
	AND pid <> pg_backend_pid();
	`);

	// Deletar o banco de dados
	await client.query('DROP DATABASE IF EXISTS restaurante;');
	console.log('Banco de dados destruído com sucesso!');
} catch (err) {
	console.error('Erro ao destruir o banco de dados:', err);
} finally {
	await client.end();
}
}

dropDatabase();
