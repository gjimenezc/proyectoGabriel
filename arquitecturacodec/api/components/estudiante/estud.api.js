'use strict';
//para que se conecte a la base de datos de mongo, necesito de mongoose
const estudModel = require('./estud.model');

module.exports.registrar = function(req, res){
    let nuevoEstud = new estudModel({
        Nombre : req.body.Nombre,
        Apellido : req.body.Apellido,
        Direccion : req.body.Direccion,
        Telefono :  req.body.Telefono,
        Email :  req.body.Email,
        Cedula : req.body.Cedula,
        Carrera : req.body.Carrera,
        Materias :  req.body.Materias,
        NombreEmergencia : req.body.NombreEmergencia,
        ApellidoEmergencia : req.body.ApellidoEmergencia,
        TelefonoEmergencia : req.body.TelefonoEmergencia
    });

    nuevoEstud.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo registrar el estudiante, ha ocurrido un error' + error});
        }else{
            res.json({success : true, msg : 'El estudiante se registró con éxito'});
        }

    });
};

module.exports.mostrar = function(req, res){ 

    estudModel.find({}, function(error, estudiantes){
        let arrayEstud = [];

        estudiantes.forEach(function(estud){
            arrayEstud.push(estud);
        });

        if(error){
            res.json({success : false, msg : 'Ha ocurrido un error' + error});
        }else{
            res.json({success: true, estudiantes: arrayEstud });
        }
    });

};

module.exports.listar = function(req, res){
    estudModel.find().then(
        function(estudiante){
            res.send(estudiante);
        });
};
