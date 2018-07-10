/*
Responsabilidades del controlador
    - Leer datos de la interfaz
    - Imprimir datos dentro de la interfaz
    - Validar datos (formularios)
    - Responder a eventos (click, change, keyup...)
    - Se comunica con el servicio, cuando se requiera algún procesamiento de datos
*/

'use strict';

//variables globales------------------------------------------
const btnGuardarProyecto = document.querySelector('#btnGuardar');
const inputCodigo = document.querySelector('#codigoProyecto');
const inputFechaCreacion = document.querySelector('#fechaProyecto');
const inputNombre = document.querySelector('#nombreProyecto');
const inputDescripcion = document.querySelector('#descripcionProyecto');
const inputEstado = document.querySelector('#estadoProyecto');
const inputFechaEntrega = document.querySelector('#fechaEntrega');
const selectProfesorLider = document.querySelector('#profesorLider');
const selectProfesorTecnico = document.querySelector('#profesorTecnico');

//listeners---------------------------------------------------
btnGuardarProyecto.addEventListener('click',function(){
    obtenerDatosProyecto();
});

//loads------------------------------------------------------
window.onload = function(){
    let fecha = ftnFechaHoy();
    let codigo = ftnGenerarCodigo(obtenerListaProyectos());
    let listaProfesores = obtenerLista();

    limpiarFormulario();
    ftnCamposAnnadidos(fecha,codigo);
    ftnCreadorDropProfesor(selectProfesorLider,listaProfesores);
    ftnCreadorDropProfesor(selectProfesorTecnico,listaProfesores);
    
};

//funciones-------------------------------------------------
function obtenerDatosProyecto(){
    let infoProyecto =[];
    let bError = false;

    let gCodigo = inputCodigo.value;
    let gFechaCreacion = ftnFechaHoy();
    let sNombre = inputNombre.value;    
    let sDescripcion = inputDescripcion.value;
    let gEstado = inputEstado.value;
    let sFechaEntrega = inputFechaEntrega.value;
    let optionProfLider = selectProfesorLider.options.selectedIndex;
    let sProfLiderNombre = selectProfesorLider.options[optionProfLider].innerHTML;
    let sPofLiderId = selectProfesorLider.value;
    let optionProfTecnico = selectProfesorTecnico.options.selectedIndex;
    let sProfTecnicoNombre = selectProfesorTecnico.options[optionProfTecnico].innerHTML;
    let sProfTecnicoId = selectProfesorTecnico.value;

    infoProyecto.push(gCodigo,gFechaCreacion,sNombre,sDescripcion,gEstado,sFechaEntrega,sPofLiderId,sProfLiderNombre,sProfTecnicoId,sProfTecnicoNombre);
    
    bError = validar();
    if(bError == true){
        swal({
            type : 'warning',
            title : 'No se pudo registrar el proyecto',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText : 'Entendido'
        });
        console.log('No se pudo registrar el proyecto');
    }else{
        registrarProyecto(infoProyecto);
        swal({
            type : 'success',
            title : 'Registro exitoso',
            text: 'El proyecto se registró adecuadamente',
            confirmButtonText : 'Entendido'
        });
        limpiarFormulario();
    }
    
};

function validar(){
    let bError = false;

    let regexSoloLetras = /^[a-z A-ZáéíóúÁÉÍÓÚñÑ]+$/;
    let regexSoloNumeros = /^[0-9]+$/;
    let regexLetrasNumeros = /^[a-z A-ZáéíóúÁÉÍÓÚñÑ 0-9]+$/;
    let fecha = new Date();

    //Validación nombre del proyecto
    if(inputNombre.value == '' && (regexSoloLetras.test(inputNombre.value)==false) ){
        inputNombre.classList.add('error-input');
        bError = true;
    }else{
        inputNombre.classList.remove('error-input');
    }
    //Validación de descripcion del proyectos
    if(inputDescripcion.value == '' && (regexLetrasNumeros.test(inputDescripcion.value)==false)){
        inputDescripcion.classList.add('error-input');
        bError = true;
    }else{
        inputDescripcion.classList.remove('error-input');
    }

        //Validación fecha de entrega del proyecto
    if(inputFechaEntrega.value == ''){
        inputFechaEntrega.classList.add('error-input');
        bError = true;
    }else{
        inputFechaEntrega.classList.remove('error-input');
    }

        //Validación profesor líder del proyecto
    if(selectProfesorLider.value == ''){
        selectProfesorLider.classList.add('error-input');
        bError = true;
    }else{
        selectProfesorLider.classList.remove('error-input');
    }

        //Validación profesor técnico del proyecto
    if(selectProfesorTecnico.value == ''){
        selectProfesorTecnico.classList.add('error-input');
        bError = true;
    }else{
        selectProfesorTecnico.classList.remove('error-input');
    }
  
    return bError;
};

function limpiarFormulario(){
    inputNombre.value = '';    
    inputDescripcion.value = '';
    inputFechaEntrega.value = '';
}


function ftnCreadorDropProfesor(pElemento,pListaDatos){

    for (let i = 0; i < pListaDatos.length; i++) {
        
        let id = pListaDatos[i]['_id'];
        let nombre = pListaDatos[i]['Nombre'];
        let apellido = pListaDatos[i]['Apellido'];
        let optionElement = document.createElement("option")
        let nodeTexto = document.createTextNode( nombre + " " + apellido);

        optionElement.appendChild(nodeTexto);
        optionElement.setAttribute('value',id);
        pElemento.appendChild(optionElement);
        
    }
};

function ftnCamposAnnadidos (pFecha,pCodigo){

    inputFechaCreacion.value = pFecha;
    inputFechaCreacion.setAttribute('disabled',true);

    inputCodigo.value = pCodigo;
    inputCodigo.setAttribute('disabled',true);

    inputEstado.value = "aceptado";
    inputEstado.setAttribute('disabled',true);
};


