const mongoose = require("mongoose");

const reservaSchema = new mongoose.Schema({
  cliente: {
    dniPasaporte: { type: String, required: true },
    nombres: { type: String, required: true },
    apellidos: { type: String, required: true },
    telefono: { type: String, required: true },
    correo: { type: String, required: true },
    nacionalidad: { type: String, required: true }
  },
  vehiculo: { type: mongoose.Schema.Types.ObjectId, ref: "Vehiculo", required: true },
  seguro: { type: mongoose.Schema.Types.ObjectId, ref: "Seguro", required: true },
  equipamientos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Equipamiento" }],
  ubicacion: { type: mongoose.Schema.Types.ObjectId, ref: "Ubicacion", required: true },
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true },
  formaPago: { type: String, enum: ["tarjeta", "oficina"], required: true },
  total: { type: Number, required: true },
  creadoEn: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Reserva", reservaSchema);
