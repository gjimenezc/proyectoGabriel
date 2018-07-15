'use strict';
let mongoose = require('mongoose');

let ProfesorSchema = new mongoose.Schema({

    Nombre : {type : String, required : true},
    Apellido : {type : String, required : true},
    Cedula : {type : String, unique : true, required: true},
    Telefono : {type : String, required: true},
    Correo : {type : String, required : true},

    Provincia : {type : String, required: true},
    Canton : {type : String, required: true},
    Distrito : {type : String, required: true},
    DireccionExacta : {type : String, required: true},


    GAcademico :  {type : String, required : true},
    Aexperiencia : {type : Number, required : true},
    CImpartidos :  {type : String, required : true},

    
});

module.exports = mongoose.model('Profesor', ProfesorSchema);