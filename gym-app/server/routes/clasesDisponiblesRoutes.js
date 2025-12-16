const express = require('express');
const router = express.Router();
const pool = require('../models/db');

// Obtener todas las clases disponibles
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clases_disponibles');
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error al obtener clases disponibles:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

module.exports = router;
