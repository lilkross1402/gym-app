const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Registro
router.post('/registro', register);

// Login
router.post('/login', login);

module.exports = router;
