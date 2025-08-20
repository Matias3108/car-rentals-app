const Ubicacion=require('../Models/Ubicacion')

//crear nueva ubicacion
const crearUbicacion=async(req,res)=>{
    try{
        const nuevaUbicacion= new Ubicacion(req.body)
        await nuevaUbicacion.save();
        res.status(201).json(nuevaUbicacion);
    }catch (error) {
        res.status(500), json({ mensaje: 'Error al crear la Ubicacion', error })
    }
}

//Obtener todas las ubicaciones
const obtenerUbicacion=async(req,res)=>{
    try{
        const ubicaciones= await Ubicacion.find();
        res.status(200).json(ubicaciones);
    } catch (error) {
        res.status(500), json({ mensaje: 'Error al obtener las ubicaciones', error })
    }
}

//Obtener una ubicacion por id
const obtenerUbicacionPorId = async (req, res) => {
  try {
    const ubicacion = await Ubicacion.findById(req.params.id);
    if (!ubicacion) {
      return res.status(404).json({ mensaje: 'Ubicacion no encontrada' });
    }
    res.status(200).json(ubicacion);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la Ubicacion', error });
  }
};

//editar Ubicaciones
const editarUbicacion=async(req,res)=>{
    try{
        const ubicacionActualizada= await Ubicacion.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(ubicacionActualizada);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al editar la Ubicacion', error })
    }
}
//eliminar una ubicacion
const eliminarUbicacion=async(req,res)=>{
    try{
        await Ubicacion.findByIdAndDelete(req.params.id);
        res.status(200).json({ mensaje: 'Ubicacion eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la ubicacion', error });
    }
}


module.exports={
    crearUbicacion,
    obtenerUbicacion,
    obtenerUbicacionPorId,
    editarUbicacion,
    eliminarUbicacion
}