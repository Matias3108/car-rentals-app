const mongoose = require('mongoose');

const UbicacionSchema=mongoose.Schema({
    nombre:{
        type: String,
        require:true
    }
},{
    Timestamp:true
})

module.exports=mongoose.model('Ubicacion',UbicacionSchema)