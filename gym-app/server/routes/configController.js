const pool = require('../db');

const obtenerConfiguraciones = async (req, res) => {
  try {
    const result = await pool.query('SELECT clave, valor FROM configuracion_sistema');
    const config = {};
    result.rows.forEach(row => {
      config[row.clave] = parseInt(row.valor, 10);
    });
    res.json(config);
  } catch (err) {
    console.error("Error obteniendo configuraciones:", err);
    res.status(500).json({ error: "Error al obtener configuraciones del sistema" });
  }
};

module.exports = { obtenerConfiguraciones };
