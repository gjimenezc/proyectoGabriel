
'use srticit';

// variables globales----------------------------------------
const inputBusqueda = document.querySelector('#inputBusqueda');
const tablaEstudiantes = document.querySelector('#tblEstudiantes');
const tablaEstudiantesAsignados = document.querySelector('#tblEstudiantesAsignados');

//listeners--------------------------------------------------
inputBusqueda.addEventListener('keyup' , function(){ftnFiltrarListaEstudiantes()});

//loads------------------------------------------------------
window.onload = function(){
    ListarEstudiantes();
    ListarEstudiantesAsignados();
    ftnEstudiantesAsignados();
};


//funciones--------------------------------------------------
function ListarEstudiantes(){
    let listaDatos = obtenerListaEstudiantes();
    let tbody = document.querySelector('#tblEstudiantes tbody');
    tbody.innerHTML = '';

    for(let i = 0; i < listaDatos.length; i++){
        
        let fila = tbody.insertRow();
        let celdaCedula = fila.insertCell();
        let celdaNombre = fila.insertCell();
        let btns = fila.insertCell();

        let btnAsignar = document.createElement('input');
        btnAsignar.type = 'button';
        btnAsignar.value = 'Asignar';
        btnAsignar.name = listaDatos[i]['_id'];
        btnAsignar.classList.add('btn-list');
        btnAsignar.addEventListener('click', function(){
            let pDatos = [listaDatos[i]['Cedula'],listaDatos[i]['Nombre'],listaDatos[i]['Apellido'],obtenerIdProyecto(),listaDatos[i]['_id']];
            obtenerDatosEstudiante(pDatos)
        });

        celdaCedula.innerHTML = listaDatos[i]['Cedula'];
        celdaNombre.innerHTML = listaDatos[i]['Nombre'] + " " + listaDatos[i]['Apellido'];
        btns.appendChild(btnAsignar);
    }

};

function obtenerIdProyecto() {
    let paginaUrl = window.location.href;
    let locacion = paginaUrl.lastIndexOf("?") + 3;
    let id = paginaUrl.slice(locacion,paginaUrl.lenght); 
 
    return id;
 }; 

function obtenerDatosEstudiante(pDatos){

    let infoBd =[];
    let idProyecto = pDatos[3];
    let idEstudiante = pDatos[4];
    let cedulaEstudiante = pDatos[0];    
    let nombreEstudiante = pDatos[1] + " " + pDatos[2];
    let coordinador = false;
    let desactivado = false;

    infoBd.push(idProyecto,idEstudiante,cedulaEstudiante,nombreEstudiante,coordinador,desactivado);
    asignarEstudiante(infoBd);
    swal({
        type : 'success',
        title : 'Asignación exitosa',
        text: 'El estudiante ha sido asignado adecuadamente',
        confirmButtonText : 'Entendido'
    });
    
    ListarEstudiantesAsignados();
    ftnEstudiantesAsignados();
};

function ListarEstudiantesAsignados(){ //falta mostrar solo los estudiantes relacionados al proyecto escogido previamente.
    let listaDatos = obtenerListaEstudiantesAsignados();
    let tbody = document.querySelector('#tblEstudiantesAsignados tbody');
    let datosEstudiante = null;
    let idProyecto = obtenerIdProyecto();
    tbody.innerHTML = '';

    for(let i = 0; i < listaDatos.length; i++){

        datosEstudiante = listaDatos[i]['datosEstudiante'];

        if(listaDatos[i]['desactivado'] || listaDatos[i]['idProyecto'] != idProyecto){
            continue;
        } else{
            let fila = tbody.insertRow();
            let celdaCedula = fila.insertCell();
            let celdaNombre = fila.insertCell();
            let btns = fila.insertCell();

            let btndesasignar = document.createElement('input');
            btndesasignar.type = 'button';
            btndesasignar.value = 'Desasignar';
            btndesasignar.name = listaDatos[i]['_id'];
            btndesasignar.classList.add('btn-list');
            btndesasignar.addEventListener('click', ftnDesasignarEstudiante);

            celdaCedula.innerHTML = datosEstudiante[0].cedulaEstudiante;
            celdaNombre.innerHTML = datosEstudiante[0].nombreEstudiante;
            btns.appendChild(btndesasignar);
        }
    }

};

function ftnDesasignarEstudiante(){
	let estudiante = [this.name,true];
    desasignarEstudiante(estudiante);
    swal({
        type : 'success',
        title : 'Desasignación exitosa',
        text: 'El estudiante ha sido desasignado adecuadamente',
        confirmButtonText : 'Entendido'
    });
    ListarEstudiantesAsignados();
    ListarEstudiantes();
    ftnEstudiantesAsignados();
};


function ftnElegirCoordinador(){//falta de terminar
	let id = this.name;
	window.location.replace('./proyecto_asignar.html?id' + id);
};

function  ftnFiltrarListaEstudiantes (){

    let criterioBusqueda = inputBusqueda.value.toUpperCase();
    let filas = tablaEstudiantes.getElementsByTagName('tr');
    let datosFila = null;
    let datos = null;
    let valor = null;
    let coincide = false;

    for (let i = 1; i < filas.length; i++) {    
        datosFila = filas[i];
        datos = datosFila.getElementsByTagName('td');
        coincide = false;

        for (let j = 0; j < datos.length; j++) {
            valor = datos[j].innerHTML.toUpperCase();

            if(valor.includes(criterioBusqueda)){
                coincide = true;
            } 
        }
        if(coincide){
            datosFila.classList.remove('esconder');
        } else {
            datosFila.classList.add('esconder');
        }
    }

   
};

function  ftnEstudiantesAsignados (){

    let filas = tablaEstudiantesAsignados.getElementsByTagName('tr');
    let datosFila = null;
    let datos = null;
    let valor = null;
    
    for (let i = 1; i < filas.length; i++) {    
        datosFila = filas[i];
        datos = datosFila.getElementsByTagName('td');

        for (let j = 0; j < 2; j++) {
            valor = datos[j].innerHTML.toUpperCase();
            ftNoListar(valor);
           
        }
    }
};

function ftNoListar (criterioBusqueda){

    let filas = tablaEstudiantes.getElementsByTagName('tr');
    let datosFila = null;
    let datos = null;
    let valor = null;
    let coincide = false;
    
    for (let i = 1; i < filas.length; i++) {    
        datosFila = filas[i];
        datos = datosFila.getElementsByTagName('td');
        coincide = false;

        for (let j = 0; j < datos.length; j++) {
            valor = datos[j].innerHTML.toUpperCase();

            if(valor.includes(criterioBusqueda)){
                coincide = true;
            } 
        }
        if(coincide){
            datosFila.classList.add('esconder');
        } else {
            datosFila.classList.remove('esconder');
        }
    }
};