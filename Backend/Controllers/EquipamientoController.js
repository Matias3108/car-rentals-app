const Equipamiento= require('../Models/Equipamiento')

//crear nuevo equipamiento
const crearEquipamiento=async (req,res)=>{
    try{
        const nuevoEquipamiento= new Equipamiento(req.body);
        await nuevoEquipamiento.save();
        res.status(201).json(nuevoEquipamiento);
    }catch (error) {
        res.status(500), json({ mensaje: 'Error al crear el Equipamiento', error })
    }
}

//obtener equipamientos
const obtenerEquipamientos=async(req,res)=>{
    try{
        const equipamiento= await Equipamiento.find();
         res.status(200).json(equipamiento);
    } catch (error) {
        res.status(500), json({ mensaje: 'Error al obtener los equipamientos', error })
    }
}

//obtener equipamientos por id
const obtenerEquipamientoPorId = async (req, res) => {
  try {
    const equipamiento = await Equipamiento.findById(req.params.id);
    if (!equipamiento) {
      return res.status(404).json({ mensaje: 'Equipamiento no encontrado' });
    }
    res.status(200).json(equipamiento);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el equipamiento', error });
  }
};

//editar un equipamiento
const editarEquipamientos=async(req,res)=>{
    try{
        const equipamientoActualizado=await Equipamiento.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(equipamientoActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al editar el equipamiento', error })
    }
}

//eliminar un equipamiento
const eliminarEquipamiento=async(req,res)=>{
    try{
        await Equipamiento.findByIdAndDelete(req.params.id);
        res.status(200).json({ mensaje: 'Equipamiento eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el equipamiento', error });
    }
}

module.exports={
    crearEquipamiento,
    obtenerEquipamientos,
    obtenerEquipamientoPorId,
    editarEquipamientos,
    eliminarEquipamiento
}