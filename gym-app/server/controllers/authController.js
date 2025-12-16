const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registro de usuarios
const register = async (req, res) => {
  const { nombre, correo, usuario, contrasena } = req.body;

  try {
    const hash = await bcrypt.hash(contrasena, 10);
    const result = await pool.query(
      `INSERT INTO users (nombre, correo, usuario, password)
       VALUES ($1, $2, $3, $4)
       RETURNING id, nombre, correo, usuario`,
      [nombre, correo, usuario, hash]
    );

    res.status(201).json({
      message: 'Usuario registrado',
      user: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

// Login de usuarios
const login = async (req, res) => {
  const { usuario, contrasena } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE usuario = $1',
      [usuario]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(contrasena, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: user.id, usuario: user.usuario },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login exitoso',
      token,
      usuario: user.usuario,
      nombre: user.nombre,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

module.exports = { register, login };
