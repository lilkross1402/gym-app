const pool = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Obtener perfil del usuario autenticado
const getProfile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No autorizado' });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const userResult = await pool.query(
      'SELECT id, nombre, correo, usuario FROM users WHERE id = $1',
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const photoResult = await pool.query(
      'SELECT image, mime_type FROM user_photos WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1',
      [userId]
    );

    let imageBase64 = null;
    let mimeType = null;

    if (photoResult.rows.length > 0) {
      imageBase64 = photoResult.rows[0].image.toString('base64');
      mimeType = photoResult.rows[0].mime_type;
    }

    res.json({
      user: userResult.rows[0],
      photo: imageBase64 ? `data:${mimeType};base64,${imageBase64}` : null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener el perfil' });
  }
};

// Actualizar datos del usuario
const updateProfile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No autorizado' });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { nombre, correo, usuario, contrasena } = req.body;
    let query = 'UPDATE users SET nombre = $1, correo = $2, usuario = $3';
    const values = [nombre, correo, usuario];

    if (contrasena && contrasena.trim() !== "") {
      const hash = await bcrypt.hash(contrasena, 10);
      query += ', password = $4 WHERE id = $5';
      values.push(hash, userId);
    } else {
      query += ' WHERE id = $4';
      values.push(userId);
    }

    await pool.query(query, values);
    res.json({ message: 'Perfil actualizado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar perfil' });
  }
};

module.exports = { getProfile, updateProfile };
