'use strict';
const express = require('express');
const router = express.Router();
const proyecto = require('./proyecto.api');


router.route('/registrarProyecto')
    .post(function(req, res){
        proyecto.registrar(req, res);
});

router.route('/listarProyecto')
    .get(function(req, res){
        proyecto.listar(req, res);
});

router.route('/desactivarProyecto')
    .post(function(req, res){
        proyecto.desactivar(req, res);
});

router.route('/buscarProyecto')
    .get(function(req, res){
        proyecto.buscarProyecto(req, res);
});

module.exports = router;