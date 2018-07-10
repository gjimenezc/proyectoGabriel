'use strict';
const proyectoModel = require('./proyecto.model');


// module.exports.registrar = function(req, res){
//     let nuevoProyecto = new proyectoModel({
//         codigo : req.body.codigo,
//         fechaCreacion : req.body.fechaCreacion,
//         nombre : req.body.nombre,
//         descripcion : req.body.nombre,
//         estado : req.body.estado,
//         fechaEntrega : req.body.fechaEntrega,
//         profesorLider : req.body.profesorLider,
//         profesorTecnico : req.body.profesorTecnico
//     });

//     nuevoProyecto.save(function(error){
//         if(error){
//             res.json({success : false, msg : 'No se pudo registrar el proyecto, ocurrió el siguiente error' + error});
//         }else{
//             res.json({success : true, msg : 'El proyecto se registró con éxito'});
//         }

//     });

// };

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

