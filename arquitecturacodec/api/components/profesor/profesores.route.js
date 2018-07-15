'use strict';

const express = require('express');
const router = express.Router();
const profesor = require('./profesores.api');


router.route('/registrarProfesores')
    .post(function(req, res){
    profesor.registrar(req, res);
});

router.route('/listarProfesores')
    .get(function(req, res){
    profesor.listar(req, res);
});

module.exports = router;