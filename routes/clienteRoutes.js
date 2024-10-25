const express = require('express');
const router = express.Router();
const { inserirCliente, atualizarCliente, deletarCliente } = require('../controllers/clienteController');

// Rota para inserir cliente
router.post('/cliente', (req, res) => {
    const { nome, sexo, idade, nascimento, pontos } = req.body;
    inserirCliente(nome, sexo, idade, nascimento, pontos)
        .then(() => res.send('Cliente inserido com sucesso!'))
        .catch(err => res.status(500).send(err.message));
});

// Rota para atualizar cliente
router.put('/cliente/:id', (req, res) => {
    const { id } = req.params;
    const { nome, sexo, idade, nascimento, pontos } = req.body;
    atualizarCliente(id, nome, sexo, idade, nascimento, pontos)
        .then(() => res.send('Cliente atualizado com sucesso!'))
        .catch(err => res.status(500).send(err.message));
});

// Rota para deletar cliente
router.delete('/cliente/:id', (req, res) => {
    const { id } = req.params;
    deletarCliente(id)
        .then(() => res.send('Cliente deletado com sucesso!'))
        .catch(err => res.status(500).send(err.message));
});

module.exports = router;
