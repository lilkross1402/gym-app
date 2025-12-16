const pool = require('../db');
const jwt = require('jsonwebtoken');

// Subida de foto de perfil del usuario autenticado
const uploadPhoto = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No autorizado' });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No se adjuntó ninguna imagen' });
    }

    // Guardar la imagen en la base de datos
    await pool.query(
      'INSERT INTO user_photos (user_id, image, mime_type) VALUES ($1, $2, $3)',
      [userId, file.buffer, file.mimetype]
    );

    res.json({ message: 'Foto de perfil actualizada correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al subir la foto de perfil' });
  }
};

module.exports = { uploadPhoto };
