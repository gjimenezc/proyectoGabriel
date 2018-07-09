'use strict';
const express = require('express');
const router = express.Router();
const cliente = require('./cliente.api');


router.route('/registrarCliente')
    .post(function(req, res){
    cliente.registrar(req, res);
});

router.route('/listarClientes')
    .get(function(req, res){
    cliente.listar(req, res);
});

module.exports = router;