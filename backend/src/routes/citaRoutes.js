const express = require('express');
const router = express.Router();

// Rutas básicas para citas (implementar luego)
router.get('/', (req, res) => res.json({ message: 'Lista de citas' }));
router.post('/', (req, res) => res.json({ message: 'Crear cita' }));

module.exports = router;