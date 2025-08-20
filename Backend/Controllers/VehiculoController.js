const Vehiculo = require('../Models/Vehiculo');

// Crear nuevo vehículo
const crearVehiculo = async (req, res) => {
  try {
    const nuevoVehiculo = new Vehiculo(req.body);
    await nuevoVehiculo.save();
    res.status(201).json(nuevoVehiculo);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el vehículo', error });
  }
}; 

// Obtener todos los vehículos
const obtenerVehiculos = async (req, res) => {
  try {
    const { marca, tipo, categoria, transmision } = req.query;

    // Armamos objeto de filtros solo con lo que venga en query
    let filtros = {};
    if (marca) filtros.marca = marca;
    if (tipo) filtros.tipo = tipo;
    if (categoria) filtros.categoria = categoria;
    if (transmision) filtros.transmision = transmision;

    const vehiculos = await Vehiculo.find(filtros);
    res.status(200).json(vehiculos);

  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los vehículos', error });
  }
};

//Obtenemos vehiculo por Id
const obtenerVehiculoPorId = async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findById(req.params.id);
    if (!vehiculo) {
      return res.status(404).json({ mensaje: 'Vehículo no encontrado' });
    }
    res.status(200).json(vehiculo);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el vehículo', error });
  }
};

// Editar vehículo
const editarVehiculo = async (req, res) => {
  try {
    const vehiculoActualizado = await Vehiculo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(vehiculoActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al editar el vehículo', error });
  }
};

// Eliminar vehículo
const eliminarVehiculo = async (req, res) => {
  try {
    await Vehiculo.findByIdAndDelete(req.params.id);
    res.status(200).json({ mensaje: 'Vehículo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el vehículo', error });
  }
};

module.exports = {
  crearVehiculo,
  obtenerVehiculos,
  obtenerVehiculoPorId,
  editarVehiculo,
  eliminarVehiculo
};
