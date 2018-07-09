/*
Responsabilidades del servicio
    - Procesamiento de datos (cálculos)
    - Almacenamiento temporal de los datos
    - Comunicar el public (front-end) con el api (back-end)
*/

'use strict';

//variables globales--------------------------------
var ultimoCodigoProyectoRegistrado = null;
var ultimoCodigoProyecto = null;

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
            estado : pProyecto[3],
            fechaEntrega : pProyecto[4],
            profesorLider : pProyecto[5],
            profesorTecnico : pProyecto[6],
            estudiantes : pProyecto[7]
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
}
function obtenerLista(){
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
    
    return listaPersonas;
}

function ftnGenerarCodigo (){
    let codigo = null;

    if (ultimoCodigoProyectoRegistrado==null){
        codigo = 1;
        ultimoCodigoProyectoRegistrado = codigo;
        return codigo;
    }else{
        codigo = ultimoCodigoProyectoRegistrado ++;
        ultimoCodigoProyecto = codigo;
        return codigo;
    }  
};

function ftnCodigoRegistrado (){

    ultimoCodigoProyectoRegistrado= ultimoCodigoProyecto;
}

function ftnFechaHoy (){

    let fecha = new Date();
    // let fechaGuardar = String(fecha.getFullYear() + "-" + fecha.getMonth() + "-" + fecha.getDate());
    let textoFecha = fecha.toLocaleDateString();
    
    return textoFecha;
}


