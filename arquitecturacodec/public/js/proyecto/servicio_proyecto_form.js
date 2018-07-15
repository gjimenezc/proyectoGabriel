/*
Responsabilidades del servicio
    - Procesamiento de datos (cálculos)
    - Almacenamiento temporal de los datos
    - Comunicar el public (front-end) con el api (back-end)
*/

'use strict';

//variables globales--------------------------------


//funciones--------------------------------------
function registrarProyecto(pProyecto){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/registrarProyecto',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            codigo : pProyecto[0],
            fechaCreacion : pProyecto[1],
            nombre : pProyecto[2],
            descripcion : pProyecto[3],
            estado : pProyecto[4],
            fechaEntrega : pProyecto[5],
            idLider : pProyecto[6],
            nombreLider : pProyecto[7],
            idTecnico : pProyecto[8],
            nombreTecnico : pProyecto[9],
            desactivado : pProyecto[10],
            idCliente : pProyecto[11],
            nombreCliente : pProyecto[12]
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
}

function obtenerListaProfesores(){
    let lista = [];

    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/listarProfesores',
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

function obtenerListaClientes(){
    let lista = [];

    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/listarClientes',
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

function ftnFechaHoy (){

        let fecha = new Date();
        let dd = fecha.getDate();
        let mm = fecha.getMonth()+1;
        let yyyy = fecha.getFullYear();
        let textoFecha = null;
    
        if(dd<10) {
            dd = '0'+dd
        } 
    
        if(mm<10) {
        mm = '0'+mm
        } 
    
        textoFecha = [dd + '/' + mm + '/' + yyyy, yyyy + "-" + mm + "-" + dd];
      
        return textoFecha;
}

function ftnGenerarCodigo (pListaDatos){
    
    let codigo = null;

    if(pListaDatos == ''){
        codigo = 1;
    } else {
        codigo = Number(pListaDatos[pListaDatos.length-1]['codigo']) + 1; 
    }

    return codigo;
};


