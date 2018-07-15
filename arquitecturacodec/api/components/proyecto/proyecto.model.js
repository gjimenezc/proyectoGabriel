'use strict';
let mongoose = require('mongoose');

let proyectoSchema = new mongoose.Schema({
    codigo : {type : Number, unique : true, required : true},
    fechaCreacion : {type : Date, required : true},
    nombre : {type : String, required : true},
    descripcion : {type : String, required : true},
    estado : {type : String, required : true},
    fechaEntrega : {type : Date, required : true},
    profesorLider : [
        {
            idLider: {type: String, required: true},
            nombreLider: {type: String, required: true},
        }
    ],
    profesorTecnico : [
        {
            idTecnico: {type: String, required: true},
            nombreTecnico: {type: String, required: true},
        }
    ],
    desactivado : {type: Boolean, required: true},
    clienteProyecto : [
        {
            idCliente: {type: String, required: true},
            nombreCliente: {type: String, required: true},
        }
    ]
});

module.exports = mongoose.model('Proyecto', proyectoSchema); 

