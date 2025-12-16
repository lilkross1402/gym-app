const pool = require('../models/db');

// Obtener clases inscritas por usuario
const getClasesPorUsuario = async (req, res) => {
  const { usuario } = req.params;
  try {
    const result = await pool.query(
      'SELECT id, nombre_clase, entrenador, horario, fecha_inscripcion, dia FROM clases_inscritas WHERE usuario = $1',
      [usuario]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener clases inscritas' });
  }
};

// Obtener todas las clases disponibles
const getClasesDisponibles = async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clases_disponibles');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener clases disponibles' });
  }
};

// Inscribir al usuario en una clase
const inscribirClase = async (req, res) => {
  const { usuario, clase_id } = req.body;

  if (!usuario || !clase_id) {
    return res.status(400).json({ error: 'Datos incompletos para inscripción' });
  }

  try {
    // Verificar si la clase existe
    const claseQuery = await pool.query(
      'SELECT * FROM clases_disponibles WHERE id = $1',
      [clase_id]
    );

    if (claseQuery.rowCount === 0) {
      return res.status(404).json({ error: 'Clase no encontrada' });
    }

    const { nombre_clase, entrenador, horario, dia } = claseQuery.rows[0];

    // Verificar si ya está inscrito
    const yaInscrito = await pool.query(
      'SELECT 1 FROM clases_inscritas WHERE usuario = $1 AND nombre_clase = $2',
      [usuario, nombre_clase]
    );

    if (yaInscrito.rowCount > 0) {
      return res.status(400).json({ error: 'Ya estás inscrito en esta clase' });
    }

    // Insertar en clases inscritas
    await pool.query(
      'INSERT INTO clases_inscritas (usuario, nombre_clase, entrenador, horario, dia) VALUES ($1, $2, $3, $4, $5)',
      [usuario, nombre_clase, entrenador, horario, dia]
    );

    res.status(201).json({ mensaje: 'Clase inscrita con éxito' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al inscribir clase' });
  }
};

// Eliminar clase inscrita por ID
const eliminarClase = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM clases_inscritas WHERE id = $1', [id]);
    res.json({ mensaje: 'Clase eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar clase' });
  }
};

module.exports = {
  getClasesPorUsuario,
  getClasesDisponibles,
  inscribirClase,
  eliminarClase
};
