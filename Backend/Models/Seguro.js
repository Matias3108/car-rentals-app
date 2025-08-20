const mongoose = require('mongoose');

const SeguroSchema = new mongoose.Schema({
    nombre:{
        type: String,
        require:true
    },
    precio:{
        type: Number,
        require: true
    },
    cobertura:{
        type: String,
        require: true
    }
}, {
    timestamps:true
});

module.exports = mongoose.model('Seguro',SeguroSchema)