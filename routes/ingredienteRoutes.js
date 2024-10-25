const express = require('express');
const router = express.Router();
const { inserirIngrediente, atualizarIngrediente, deletarIngrediente } = require('../controllers/ingredienteController');

// Rota para inserir ingrediente
router.post('/ingrediente', (req, res) => {
    const { nome, data_fabricacao, data_validade, quantidade, observacao } = req.body;
    inserirIngrediente(nome, data_fabricacao, data_validade, quantidade, observacao)
        .then(() => res.send('Ingrediente inserido com sucesso!'))
        .catch(err => res.status(500).send(err.message));
});

// Rota para atualizar ingrediente
router.put('/ingrediente/:id', (req, res) => {
    const { nome, data_fabricacao, data_validade, quantidade, observacao } = req.body;
    const { id } = req.params;
    atualizarIngrediente(id, nome, data_fabricacao, data_validade, quantidade, observacao)
        .then(() => res.send('Ingrediente atualizado com sucesso!'))
        .catch(err => res.status(500).send(err.message));
});

// Rota para deletar ingrediente
router.delete('/ingrediente/:id', (req, res) => {
    const { id } = req.params;
    deletarIngrediente(id)
        .then(() => res.send('Ingrediente deletado com sucesso!'))
        .catch(err => res.status(500).send(err.message));
});

module.exports = router;
