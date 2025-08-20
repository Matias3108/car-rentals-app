const Reserva = require("../Models/Reservas");
const Vehiculo = require("../Models/Vehiculo");
const Seguro = require("../Models/Seguro");
const Equipamiento = require("../Models/Equipamiento");

const crearReserva = async (req, res) => {
  try {
    const {
      cliente,
      vehiculo,
      seguro,
      equipamientos,
      ubicacion,
      fechaInicio,
      fechaFin,
      formaPago
    } = req.body;

    // Calcular días
    const dias = Math.ceil(
      (new Date(fechaFin) - new Date(fechaInicio)) / (1000 * 60 * 60 * 24)
    );

    // Buscar datos necesarios
    const vehiculoData = await Vehiculo.findById(vehiculo);
    const seguroData = await Seguro.findById(seguro);
    const equipamientosData = await Equipamiento.find({ _id: { $in: equipamientos } });

    // Calcular total
    const total =
      vehiculoData.costoPorDia * dias +
      (seguroData?.precio || 0) +
      equipamientosData.reduce((sum, e) => sum + e.precio, 0);

    // Guardar reserva
    const nuevaReserva = new Reserva({
      cliente,
      vehiculo,
      seguro,
      equipamientos,
      ubicacion,
      fechaInicio,
      fechaFin,
      formaPago,
      total,
    });

    const reservaGuardada = await nuevaReserva.save();

    // 🔹 Responder rápido
    res.status(201).json({
      message: "Reserva creada correctamente",
      reserva: reservaGuardada,
    });

  } catch (err) {
    console.error("❌ Error al crear reserva:", err);
    res.status(500).json({ message: "Error en el servidor" });
  }
};


// Listar todas las reservas
const listarReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find()
      .populate("vehiculo")
      .populate("seguro")
      .populate("equipamientos")
      .populate("ubicacion");
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las reservas" });
  }
};

// Obtener una reserva por ID
const obtenerReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id)
      .populate("vehiculo")
      .populate("seguro")
      .populate("equipamientos")
      .populate("ubicacion");

    if (!reserva) return res.status(404).json({ message: "Reserva no encontrada" });

    res.json(reserva);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la reserva" });
  }
};

// Actualizar una reserva
const actualizarReserva = async (req, res) => {
  try {
    const reservaActualizada = await Reserva.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!reservaActualizada) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    res.json(reservaActualizada);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la reserva" });
  }
};

// Eliminar una reserva
const eliminarReserva = async (req, res) => {
  try {
    const reservaEliminada = await Reserva.findByIdAndDelete(req.params.id);

    if (!reservaEliminada) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    res.json({ message: "Reserva eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la reserva" });
  }
};

module.exports = {
  crearReserva,
  listarReservas,
  obtenerReserva,
  actualizarReserva,
  eliminarReserva
};
