'use strict';
let mongoose = require('mongoose');

let proyectoSchema = new mongoose.Schema({
    codigo : {type : String, unique : true, required : true},
    fechaCreacion : {type : Date, required : true},
    nombre : {type : String, required : true},
    estado : {type : String, required : true},
    fechaEntrega : {type : Date, required : true},
    profesorLider : {type : String, required : true},
    profesorTecnico : {type : String, required : true},
    estudiantes : [{identificador : {type : String}}]
});

module.exports = mongoose.model('Proyecto', proyectoSchema);