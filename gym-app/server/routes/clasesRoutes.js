const express = require('express');
const router = express.Router();
const {
  getClasesPorUsuario,
  getClasesDisponibles,
  inscribirClase,
  eliminarClase
} = require('../controllers/clasesController');

router.get('/disponibles', getClasesDisponibles);
router.post('/inscribir', inscribirClase);
router.delete('/eliminar/:id', eliminarClase);

router.get('/:usuario', getClasesPorUsuario);

module.exports = router;
