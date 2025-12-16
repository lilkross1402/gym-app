const express = require('express');
const router = express.Router();
const pool = require('../models/db');

// Obtener duración de sesión
router.get('/duracion-sesion', async (_req, res) => {
  try {
    const result = await pool.query(
      'SELECT valor FROM configuracion_sistema WHERE clave = $1',
      ['duracion_sesion_inactividad']
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Configuración no encontrada' });
    }
    res.json({ duracion: parseInt(result.rows[0].valor, 10) });
  } catch (err) {
    console.error("Error al obtener duración de sesión:", err);
    res.status(500).json({ error: 'Error al obtener duración de sesión' });
  }
});

// Obtener tiempo de advertencia
router.get('/tiempo-advertencia', async (_req, res) => {
  try {
    const result = await pool.query(
      'SELECT valor FROM configuracion_sistema WHERE clave = $1',
      ['tiempo_advertencia_ms']
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Configuración no encontrada' });
    }
    res.json({ advertencia: parseInt(result.rows[0].valor, 10) });
  } catch (err) {
    console.error("Error al obtener tiempo de advertencia:", err);
    res.status(500).json({ error: 'Error al obtener tiempo de advertencia' });
  }
});

// Obtener toda la configuración a la vez (opcional)
router.get('/', async (_req, res) => {
  try {
    const result = await pool.query(
      'SELECT clave, valor FROM configuraciones'
    );
    const configuraciones = {};
    result.rows.forEach(row => {
      configuraciones[row.clave] = parseInt(row.valor, 10);
    });
    res.json(configuraciones);
  } catch (err) {
    console.error("Error al obtener configuraciones del sistema:", err);
    res.status(500).json({ error: 'Error al obtener configuraciones del sistema' });
  }
});

module.exports = router;
