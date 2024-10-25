const express = require('express');
const router = express.Router();
const { inserirVenda, atualizarVenda, deletarVenda } = require('../controllers/vendaController');

// Rota para inserir venda
router.post('/venda', (req, res) => {
    const { id_cliente, id_prato, quantidade, dia, hora, valor } = req.body;
    inserirVenda(id_cliente, id_prato, quantidade, dia, hora, valor)
        .then(() => res.send('Venda inserida com sucesso!'))
        .catch(err => res.status(500).send(err.message));
});

// Rota para atualizar venda
router.put('/venda/:id', (req, res) => {
    const { id_cliente, id_prato, quantidade, dia, hora, valor } = req.body;
    const { id } = req.params;
    atualizarVenda(id, id_cliente, id_prato, quantidade, dia, hora, valor)
        .then(() => res.send('Venda atualizada com sucesso!'))
        .catch(err => res.status(500).send(err.message));
});

// Rota para deletar venda
router.delete('/venda/:id', (req, res) => {
    const { id } = req.params;
    deletarVenda(id)
        .then(() => res.send('Venda deletada com sucesso!'))
        .catch(err => res.status(500).send(err.message));
});

module.exports = router;
