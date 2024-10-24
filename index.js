// Arquivo principal para rodar o sistema

const express = require('express');
const bodyParser = require('body-parser');
const clienteRoutes = require('./routes/clienteRoutes');

const app = express();
app.use(bodyParser.json());


app.use('/api', clienteRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});



/*
const createTables = require('./db/createTables'); //  ta funcionando legal. Ta criando as tabelas
const insertData = require('./db/insertData'); // ta funcionando legal. Ta inserindo os 10 inserts nas tabelas

//createTables();
 insertData();
*/
