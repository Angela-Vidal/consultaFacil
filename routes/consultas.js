const express = require('express');
const router = express.Router();
const { marcarConsulta, buscarConsultas, cancelarConsulta } = require('../controllers/consultaController');

// Rota para marcar uma nova consulta
router.post('/', marcarConsulta);

// Rota para buscar consultas
router.get('/search', buscarConsultas);

// Rota para cancelar um agendamento
router.delete('/:id', cancelarConsulta);

module.exports = router;