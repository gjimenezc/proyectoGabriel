'use strict';
const express = require('express');
const router = express.Router();
const estudApi = require('./estud.api');


router.route('/registrarEstud')
    .post(function(req, res){
        estudApi.registrar(req, res);
});

router.route('/mostrarEstud')
    .get(function(req, res){
        estudApi.mostrar(req,res);
    });

router.route('/listarEstudiante')
    .get(function(req, res){
        estudApi.listar(req, res);
});

module.exports = router;