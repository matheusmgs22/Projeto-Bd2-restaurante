// Arquivo principal para rodar o sistema

const express = require('express');
const app = express();
const clienteRoutes = require('./routes/clienteRoutes');
const pratoRoutes = require('./routes/pratoRoutes');
const fornecedorRoutes = require('./routes/fornecedorRoutes');

app.use(express.json());

app.use('/api', clienteRoutes);
app.use('/api', pratoRoutes);
app.use('/api', fornecedorRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});



/*
const createTables = require('./db/createTables'); //  ta funcionando legal. Ta criando as tabelas
const insertData = require('./db/insertData'); // ta funcionando legal. Ta inserindo os 10 inserts nas tabelas

//createTables();
 insertData();
*/
