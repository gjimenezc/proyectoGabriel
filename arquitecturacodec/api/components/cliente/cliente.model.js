'use strict';
let mongoose = require('mongoose');

let ClienteSchema = new mongoose.Schema({
    Nombre : {type : String, required : true},
    Cedula : {type : Number, unique : true, required: true},
    Provincia : {type : Number, required: true},
    Canton : {type : Number, required: true},
    Distrito : {type : Number, required: true},
    Ubicacion : {type : Number, required: true},
    PrimerNombre : {type : Number, required: true},
    PrimerApellido : {type : String, required : true},
    Telefono : {type : Number, required : true},
    Correo : {type : Number, required : true},
});

module.exports = mongoose.model('Cliente', ClienteSchema);