const express = require('express');
const router = express.Router();

const {
    crearUbicacion,
    obtenerUbicacion,
    obtenerUbicacionPorId,
    editarUbicacion,
    eliminarUbicacion
}=require('../Controllers/UbicacionController')

// Ruta base: /api/ubicacion
router.post('/', crearUbicacion);
router.get('/', obtenerUbicacion);
router.get('/:id',obtenerUbicacionPorId);
router.put('/:id', editarUbicacion);
router.delete('/:id', eliminarUbicacion);

module.exports = router;