const Seguro = require('../Models/Seguro');

// Crear nuevo seguro
const crearSeguro = async (req, res) => {
    try {
        const nuevoSeguro = new Seguro(req.body);
        await nuevoSeguro.save();
        res.status(201).json(nuevoSeguro);
    } catch (error) {
        res.status(500), json({ mensaje: 'Error al crear el Seguro', error })
    }
};
// Obtener los seguros
const obtenerSeguros = async (req, res) => {
    try {
        const seguros = await Seguro.find();
        res.status(200).json(seguros);
    } catch (error) {
        res.status(500), json({ mensaje: 'Error al obtener los seguros', error })
    }
};
//Obtener seguro por id
const obtenerSeguroPorId = async (req, res) => {
  try {
    const seguro = await Seguro.findById(req.params.id);
    if (!seguro) {
      return res.status(404).json({ mensaje: 'Seguro no encontrado' });
    }
    res.status(200).json(seguro);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el seguro', error });
  }
};
//Editar los seguros
const editarSeguros = async (req, res) => {
    try {
        const seguroActualizado = await Seguro.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(seguroActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al editar el seguro', error })
    }
}
//Eliminar los seguros
const eliminarSeguro = async (req, res) => {
    try {
        await Seguro.findByIdAndDelete(req.params.id);
        res.status(200).json({ mensaje: 'Seguro eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el vehículo', error });
    }
}

module.exports = {
    crearSeguro,
    obtenerSeguros,
    obtenerSeguroPorId,
    editarSeguros,
    eliminarSeguro
}