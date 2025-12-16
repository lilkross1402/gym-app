const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas principales
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/clases', require('./routes/clasesRoutes'));
app.use('/api/clases-disponibles', require('./routes/clasesDisponiblesRoutes'));
app.use('/api/configuraciones', require('./routes/configRoutes')); // ✅ Configuración

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend corriendo en puerto ${PORT}`));
