'use strict';
//para que se conecte a la base de datos de mongo, necesito de mongoose
const clienteModel = require('./cliente.model');

module.exports.registrar = function(req, res){
    let nuevoCliente = new clienteModel({
        Nombre : req.body.Nombre,
        CedulaJuridica : req.body.CedulaJuridica,
        Provincia : req.body.Provincia,
        Distrito : req.body.Distrito,
        Canton : req.body.Canton,
        Ubicacion : req.body.Ubicacion,
        PrimerNombre : req.body.PrimerNombre,
        PrimerApellido : req.body.PrimerApellido,
        Telefono : req.body.Telefono,
        Correo : req.body.Correo
    });

    nuevoCliente.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo registrar el cliente, ha ocurrido un error' + error});
        }else{
            res.json({success : true, msg : 'El cliente se registró con éxito'});
        }

    });

};

module.exports.listar = function(req, res){
    clienteModel.find().then(
        function(clientes){
            res.send(clientes);
        });
};
