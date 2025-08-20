const mongoose = require('mongoose');

const EquipamientoSchema= mongoose.Schema({
    nombre:{
        type:String,
        require:true
    },
    precio:{
        type:Number,
        require:true
    }
},{
    Timestamp:true
});

module.exports=mongoose.model('Equipamiento',EquipamientoSchema)