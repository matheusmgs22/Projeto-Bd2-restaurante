const express = require('express');
const router = express.Router();
const {
    inserirPrato,
    atualizarPrato,
    deletarPrato,
    consultarPratoPorId,
    consultarTodosPratos
} = require('../controllers/pratoController');

// Rota para inserir prato
router.post('/prato', async (req, res) => {
    const { nome, descricao, valor, disponibilidade } = req.body;
    try {
        const novoPrato = await inserirPrato(nome, descricao, valor, disponibilidade);
        res.status(201).json(novoPrato);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para atualizar prato
router.put('/prato/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, valor, disponibilidade } = req.body;
    try {
        const pratoAtualizado = await atualizarPrato(id, nome, descricao, valor, disponibilidade);
        res.status(200).json(pratoAtualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para deletar prato
router.delete('/prato/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await deletarPrato(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para consultar prato por ID
router.get('/prato/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const prato = await consultarPratoPorId(id);
        res.status(200).json(prato);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para consultar todos os pratos
router.get('/pratos', async (req, res) => {
    try {
        const pratos = await consultarTodosPratos();
        res.status(200).json(pratos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
