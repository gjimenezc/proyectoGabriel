'use strict';
const proyectoModel = require('./proyecto.model');

module.exports.registrar = function(req, res){
    let nuevoProyecto = new proyectoModel({
        codigo : req.body.codigo,
        fechaCreacion : req.body.fechaCreacion,
        nombre : req.body.nombre,
        descripcion : req.body.nombre,
        estado : req.body.estado,
        fechaEntrega : req.body.fechaEntrega,
        profesorLider : [{
            idLider : req.body.idLider,
            nombreLider : req.body.nombreLider
        }],
        profesorTecnico : [{
            idTecnico : req.body.idTecnico,
            nombreTecnico : req.body.nombreTecnico
        }],
        desactivado : req.body.desactivado,
        clienteProyecto : [{
            idCliente : req.body.idCliente,
            nombreCliente : req.body.nombreCliente
        }]
    });

    nuevoProyecto.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo registrar el proyecto, ocurrió el siguiente error' + error});
        }else{
            res.json({success : true, msg : 'El proyecto se registró con éxito'});
        }

    });

};

module.exports.listar = function(req, res){
    proyectoModel.find().then(
        function(proyectos){
            res.send(proyectos);
        });
};

module.exports.desactivar = function(req, res){
    
    proyectoModel.update(
        {_id: req.body._id}, 
        {
            desactivado : req.body.desactivado
        },
        function(error){
            if(error){
                res.json({success : false, msg : 'No se pudo eliminar el proyecto, ocurrió el siguiente error' + error});
            }else{
                res.json({success : true, msg : 'Se eliminó el proyecto con éxito'});
            }
        }
    )
};

module.exports.buscarProyecto = function(req, res){
    proyectoModel.find(req.body.idProyecto).then(
        function(proyecto){
            res.send(proyecto);
        });
};

