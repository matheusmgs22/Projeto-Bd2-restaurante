const express = require('express');
const router = express.Router();
const { inserirUso, atualizarUso, deletarUso } = require('../controllers/usoController');

// Rota para inserir uso
router.post('/uso', (req, res) => {
    const { id_prato, id_ingrediente } = req.body;
    inserirUso(id_prato, id_ingrediente)
        .then(() => res.send('Uso inserido com sucesso!'))
        .catch(err => res.status(500).send(err.message));
});

// Rota para atualizar uso
router.put('/uso', (req, res) => {
    const { id_prato, id_ingrediente } = req.body;
    atualizarUso(id_prato, id_ingrediente)
        .then(() => res.send('Uso atualizado com sucesso!'))
        .catch(err => res.status(500).send(err.message));
});

// Rota para deletar uso
router.delete('/uso', (req, res) => {
    const { id_prato, id_ingrediente } = req.body;
    deletarUso(id_prato, id_ingrediente)
        .then(() => res.send('Uso deletado com sucesso!'))
        .catch(err => res.status(500).send(err.message));
});

module.exports = router;
