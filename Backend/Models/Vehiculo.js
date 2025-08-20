// Models/VehiculoModel.js
const mongoose = require('mongoose');

const VehiculoSchema = new mongoose.Schema({
  marca: {
    type: String,
    required: true
  },
  modelo: {
    type: String,
    required: true
  },
  año: {
    type: Number,
    required: true
  },
  matricula: {
    type: String,
    required: true,
    unique: true
  },
  color: {
    type: String,
    required: true
  },
  tipo: {
    type: String, // Ej: "Sedán", "SUV"
    required: true
  },
  categoria: {
    type: String, // Ej: "Económico", "Estándar", "Lujo"
    required: true
  },
  transmision: {
    type: String, // "Automático" o "Manual"
    required: true
  },
  capacidadPersonas: {
    type: Number,
    required: true
  },
  capacidadMaletas: {
    type: Number,
    required: true
  },
  caracteristicas: {
    type: [String], // Lista de extras
    default: []
  },
  costoPorDia: {
    type: Number,
    required: true
  },
  disponible: {
    type: Boolean,
    default: true
  },
  imagen: {
    type: String, // URL de la imagen
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Vehiculo', VehiculoSchema);

