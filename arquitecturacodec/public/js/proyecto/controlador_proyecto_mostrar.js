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
const btnEditarProyecto = document.querySelector('#btnEditar');
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

btnEditarProyecto.addEventListener('click',function(){

    btnEditarProyecto.classList.add('modificar');
    btnGuardarProyecto.classList.remove('modificar');
    // ftnHabilitarEdicion();
});

btnGuardarProyecto.addEventListener('click',function(){


});

//loads------------------------------------------------------
window.onload = function(){

    let idProyecto = obtenerIdProyecto();
    let proyectos = obtenerProyectos();
    let listaProfesores = obtenerLista();
    
    ftnCreadorDropProfesor(selectProfesorLider,listaProfesores);
    ftnCreadorDropProfesor(selectProfesorTecnico,listaProfesores);
    ftnMostrarProyecto(idProyecto,proyectos);
    ftnDeshabilitarCampos();
};

//funciones-------------------------------------------------

function ftnMostrarProyecto (idProyecto,proyectos){

    let proyectoSeleccionado = null;
    let optionLider = selectProfesorLider.getElementsByTagName('option');
    let optionTecnico = selectProfesorTecnico.getElementsByTagName('option');
    let valorOption = null;

    proyectos.forEach(element => {
        if (element._id == idProyecto) {
            proyectoSeleccionado = element;
        }
    });

    inputCodigo.value = proyectoSeleccionado.codigo;
    inputFechaCreacion.value = ftnFomatoFecha(proyectoSeleccionado.fechaCreacion)[0];
    inputNombre.value = proyectoSeleccionado.nombre;
    inputDescripcion.value = proyectoSeleccionado.descripcion;
    inputEstado.value = proyectoSeleccionado.estado;
    inputFechaEntrega.value = ftnFomatoFecha(proyectoSeleccionado.fechaEntrega)[1];
    for (let i = 0; i < optionLider.length; i++) {
        valorOption = optionLider[i].value;

        if(valorOption == proyectoSeleccionado.profesorLider[0].idLider){
            optionLider[i].setAttribute('selected',true);
        }
    }
    for (let i = 0; i < optionTecnico.length; i++) {
        valorOption = optionTecnico[i].value;

        if(valorOption == proyectoSeleccionado.profesorTecnico[0].idTecnico){
            optionTecnico[i].setAttribute('selected',true);
        }
    }
};

function ftnDeshabilitarCampos (){

    inputCodigo.setAttribute('disabled',true);
    inputFechaCreacion.setAttribute('disabled',true);
    inputNombre.setAttribute('disabled',true);
    inputDescripcion.setAttribute('disabled',true);
    inputEstado.setAttribute('disabled',true);
    inputFechaEntrega.setAttribute('disabled',true);
    selectProfesorLider.setAttribute('disabled',true);
    selectProfesorTecnico.setAttribute('disabled',true);

};

function obtenerIdProyecto() {
    let paginaUrl = window.location.href;
    let locacion = paginaUrl.lastIndexOf("?") + 3;
    let id = paginaUrl.slice(locacion,paginaUrl.lenght); 
 
    return id;
 }; 

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
    let bDesactivado = false;

    infoProyecto.push(gCodigo,gFechaCreacion,sNombre,sDescripcion,gEstado,sFechaEntrega,sPofLiderId,sProfLiderNombre,sProfTecnicoId,sProfTecnicoNombre,bDesactivado);
    
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

function ftnFomatoFecha (pFecha){
    let fecha = new Date();
    let dd = fecha.getDate(pFecha);
    let mm = fecha.getMonth(pFecha)+1;
    let yyyy = fecha.getFullYear(pFecha);
    let textoFecha = null;

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
    mm = '0'+mm
    } 

    textoFecha = [dd + '/' + mm + '/' + yyyy,yyyy + "-" + mm + "-" + dd];
  
    return textoFecha;
};




