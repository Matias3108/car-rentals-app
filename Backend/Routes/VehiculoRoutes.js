const express = require('express');
const router = express.Router();

const {
  crearVehiculo,
  obtenerVehiculos,
  obtenerVehiculoPorId,
  editarVehiculo,
  eliminarVehiculo
} = require('../Controllers/VehiculoController');

// Ruta base: /api/vehiculos
router.post('/', crearVehiculo);
router.get('/', obtenerVehiculos);
router.get('/:id', obtenerVehiculoPorId);
router.put('/:id', editarVehiculo);
router.delete('/:id', eliminarVehiculo);

module.exports = router;