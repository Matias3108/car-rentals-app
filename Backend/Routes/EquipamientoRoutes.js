const express = require('express');
const router = express.Router();

const {
    crearEquipamiento,
    obtenerEquipamientos,
    obtenerEquipamientoPorId,
    editarEquipamientos,
    eliminarEquipamiento
}=require('../Controllers/EquipamientoController')

// Ruta base: /api/equipamientos
router.post('/', crearEquipamiento);
router.get('/', obtenerEquipamientos);
router.get('/:id',obtenerEquipamientoPorId);
router.put('/:id', editarEquipamientos);
router.delete('/:id', eliminarEquipamiento);

module.exports = router;