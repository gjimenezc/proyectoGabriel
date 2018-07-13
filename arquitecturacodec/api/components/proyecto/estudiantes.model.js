'use strict';
let mongoose = require('mongoose');

let estudProySchema = new mongoose.Schema({
    idProyecto : {type : String, required : true},
    idEstudiante : {type : String, required : true},
    datosEstudiante : [
        {
            cedulaEstudiante: {type: String, required: true},
            nombreEstudiante: {type: String, required: true},
        }
    ],
    coordinador : {type : Boolean},
    desactivado : {type : Boolean, required : true}
});

module.exports = mongoose.model('EstudiantesAsignados', estudProySchema); 