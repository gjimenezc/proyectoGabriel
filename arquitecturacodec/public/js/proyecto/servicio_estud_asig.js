
'use strict';

function obtenerListaEstudiantesAsignados(){
    let lista = [];

    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/listarEstudiantesAsignados',
        type : 'get',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
    
    return lista;
}

function obtenerListaEstudiantes(){
    let lista = [];

    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/listarEstudiante',
        type : 'get',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
    
    return lista;
}

function asignarEstudiante(pEstudiante){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/asignarEstudiante',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            idProyecto : pEstudiante[0],
            idEstudiante : pEstudiante[1],
            cedulaEstudiante : pEstudiante[2],
            nombreEstudiante : pEstudiante[3],
            coordinador : pEstudiante[4],
            desactivado : pEstudiante[5]
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
}

function desasignarEstudiante(pEstudiante){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/desasignarEstudiante',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : pEstudiante[0],
            desactivado : pEstudiante[1]
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
}

function asignarCoordinador(pCoordinador){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/asignarCoordinador',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : pCoordinador[0],
            coordinador : pCoordinador[1]
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
}