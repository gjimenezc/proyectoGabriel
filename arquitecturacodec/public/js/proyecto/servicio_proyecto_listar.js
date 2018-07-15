
'use strict';

function obtenerListaProyectos(){
    let lista = [];

    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/listarProyecto',
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

function desactivarProyecto(pProyecto){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/desactivarProyecto',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : pProyecto[0],
            desactivado : pProyecto[1]
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
}