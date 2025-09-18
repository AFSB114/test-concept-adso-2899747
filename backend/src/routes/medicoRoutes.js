const express = require('express');
const router = express.Router();

// Rutas básicas para médicos (implementar luego)
router.get('/', (req, res) => res.json({ message: 'Lista de médicos' }));
router.post('/', (req, res) => res.json({ message: 'Crear médico' }));

module.exports = router;