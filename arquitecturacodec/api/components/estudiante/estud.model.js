'use strict';
let mongoose = require('mongoose');

let EstudSchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.ObjectId, auto: true},
    Nombre : {type : String, unique : true, required : true},
    Apellido : {type : String, unique : true, required : true},
    Direccion : {type : String, required : true},
    Telefono : {type : Number, unique : true, required: true},    
    Email : {type : String, required : true},
    Cedula : {type : Number, unique : true, required: true},
    Carrera : {type : String, required : true},
    Materias : {type : String, required : true},   
    NombreEmergencia : {type : String, required : true},
    ApellidoEmergencia : {type : String, required : true},
    TelefonoEmergencia : {type : Number, required : true}
});

module.exports = mongoose.model('Estud', EstudSchema);