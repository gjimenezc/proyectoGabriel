'use strict';
const estudProyModel = require('./estudiantes.model');


module.exports.registrar = function(req, res){
    let nuevoEstudiante = new estudProyModel({
        idProyecto : req.body.idProyecto,
        idEstudiante : req.body.idEstudiante,
        datosEstudiante : req.body.datosEstudiante,
        desactivado : req.body.desactivado
    });

    nuevoEstudiante.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo asignar el estudiante al proyecto, ocurrió el siguiente error' + error});
        }else{
            res.json({success : true, msg : 'El estudiante no se asigno con éxito'});
        }

    });

};

module.exports.listar = function(req, res){
    estudProyModel.find().then(
        function(estudiantes){
            res.send(estudiantes);
        });
};


