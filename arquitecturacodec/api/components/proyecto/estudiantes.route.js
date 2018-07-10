'use strict';
const express = require('express');
const router = express.Router();
const estudProy = require('./estudiantes.api');


router.route('/asignarEstudiante')
    .post(function(req, res){
        estudProy.registrar(req, res);
});

router.route('/listarEstudiantesAsignados')
    .get(function(req, res){
        estudProy.listar(req, res);
});

module.exports = router;