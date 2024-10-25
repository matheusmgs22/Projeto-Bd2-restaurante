const express = require('express');
const router = express.Router();
const { inserirFornecedor, atualizarFornecedor, deletarFornecedor } = require('../controllers/fornecedorController');

// Rota para inserir fornecedor
router.post('/fornecedor', (req, res) => {
    const { nome, estado_origem } = req.body;
    inserirFornecedor(nome, estado_origem)
        .then(() => res.send('Fornecedor inserido com sucesso!'))
        .catch(err => res.status(500).send(err.message));
});

// Rota para atualizar fornecedor
router.put('/fornecedor/:id', (req, res) => {
    const { nome, estado_origem } = req.body;
    const { id } = req.params;
    atualizarFornecedor(id, nome, estado_origem)
        .then(() => res.send('Fornecedor atualizado com sucesso!'))
        .catch(err => res.status(500).send(err.message));
});

// Rota para deletar fornecedor
router.delete('/fornecedor/:id', (req, res) => {
    const { id } = req.params;
    deletarFornecedor(id)
        .then(() => res.send('Fornecedor deletado com sucesso!'))
        .catch(err => res.status(500).send(err.message));
});

module.exports = router;
