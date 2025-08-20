const express = require('express');
const router = express.Router();

const {
    crearSeguro,
    obtenerSeguros,
    obtenerSeguroPorId,
    editarSeguros,
    eliminarSeguro
}=require('../Controllers/SeguroController')

// Ruta base: /api/seguros
router.post('/', crearSeguro);
router.get('/', obtenerSeguros);
router.get('/:id',obtenerSeguroPorId);
router.put('/:id', editarSeguros);
router.delete('/:id', eliminarSeguro);

module.exports = router;