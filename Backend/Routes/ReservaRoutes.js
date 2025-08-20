const express = require("express");
const {
  crearReserva,
  listarReservas,
  obtenerReserva,
  actualizarReserva,
  eliminarReserva
} = require("../Controllers/ReservaController");

const router = express.Router();

router.post("/", crearReserva);
router.get("/", listarReservas);
router.get("/:id", obtenerReserva);
router.put("/:id", actualizarReserva);
router.delete("/:id", eliminarReserva);

module.exports = router;

