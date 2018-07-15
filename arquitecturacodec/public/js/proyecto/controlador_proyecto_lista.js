
'use srticit';

// variables globales----------------------------------------
const inputBusqueda = document.querySelector('#inputBusqueda');
const tablaProyectos = document.querySelector('#tblProyectos');

//listeners--------------------------------------------------
inputBusqueda.addEventListener('keyup' , function(){ftnFiltrarListaProyectos()});

//loads------------------------------------------------------
window.onload = function(){
    ListarProyectos();
};


//funciones--------------------------------------------------
function ListarProyectos(){
    let listaProyecto = obtenerListaProyectos();
    let listaProyectoEstudiantes = obtenerListaEstudiantesAsignados();
    let tbody = document.querySelector('#tblProyectos tbody');
    tbody.innerHTML = '';

    for(let i = 0; i < listaProyecto.length; i++){
        
        if(listaProyecto[i]['desactivado']){
            continue;
        } else{
        
            let fila = tbody.insertRow();
            let celdaCodigo = fila.insertCell();
            let celdaCliente = fila.insertCell();
            let celdaNombre = fila.insertCell();
            let celdaProfesor = fila.insertCell();
            let celdaEstudiante = fila.insertCell();
            let celdaEstado = fila.insertCell();
            let celdaFechaEntrega = fila.insertCell();
            let btns = fila.insertCell();
            let cliente = listaProyecto[i]['clienteProyecto'];
            let profesorLider = listaProyecto[i]['profesorLider'];
            let estudianteCoordinador = buscarCoordinador(listaProyectoEstudiantes,listaProyecto);
            let fechaEntrega = ftnFechaProyecto(listaProyecto[i]['fechaEntrega']);
            
            function buscarCoordinador(a,b){
                let estudiante = null;

                if(a == ''){
                    estudiante = "No hay estudiante coordinador asignado";
                } else {for (let i = 0; i < a.length; i++) {
                        if(a[i]['idProyecto'] == b[i]['_id'] && a[i]['coordinador'] == true){
                            estudiante = a[i]['datosEstudiante'];
                        } else {
                            estudiante = "No hay estudiante coordinador asignado";
                        }            
                    }
                }
                return estudiante;
            };

            let btnVer = document.createElement('input');
            btnVer.type = 'button';
            btnVer.value = 'Ver';
            btnVer.name = listaProyecto[i]['_id'];
            btnVer.classList.add('btn-list');
            btnVer.addEventListener('click', ftnMostrarPoryecto);

            let btnAsignarEstudiantes = document.createElement('input');
            btnAsignarEstudiantes.type = 'button';
            btnAsignarEstudiantes.value = 'Asignar Estudiante';
            btnAsignarEstudiantes.name = listaProyecto[i]['_id'];
            btnAsignarEstudiantes.classList.add('btn-list');
            btnAsignarEstudiantes.addEventListener('click', ftnAsignarEstudiantes);

            let btnEliminar = document.createElement('input');
            btnEliminar.type = 'button';
            btnEliminar.value = 'Eliminar';
            btnEliminar.name = listaProyecto[i]['_id'];
            btnEliminar.classList.add('btn-list');
            btnEliminar.addEventListener('click', ftnEliminarProyecto);

            celdaCodigo.innerHTML = listaProyecto[i]['codigo'];
            celdaCliente.innerHTML = cliente[0].nombreCliente;
            celdaNombre.innerHTML = listaProyecto[i]['nombre'];
            celdaProfesor.innerHTML = profesorLider[0].nombreLider;
            celdaEstudiante.innerHTML = estudianteCoordinador;
            celdaEstado.innerHTML = listaProyecto[i]['estado'];
            celdaFechaEntrega.innerHTML = fechaEntrega;
            btns.appendChild(btnVer);
            btns.appendChild(btnAsignarEstudiantes);
            btns.appendChild(btnEliminar);
        }
    }

};

function ftnMostrarPoryecto(){
	let id = this.name;
    window.location.replace('./proyecto_mostrar.html?id' + id);
};

function ftnAsignarEstudiantes(){
	let id = this.name;
	window.location.replace('./proyecto_asignar.html?id' + id);
};

function ftnEliminarProyecto(){
	let proyecto = [this.name,true];
    desactivarProyecto(proyecto);
    swal({
        type : 'success',
        title : 'Eliminación exitosa',
        text: 'El proyecto ha sido eliminado adecuadamente',
        confirmButtonText : 'Entendido'
    });
    ListarProyectos();
};

function  ftnFiltrarListaProyectos (){

    let criterioBusqueda = inputBusqueda.value.toUpperCase();
    let filasProyectos = tablaProyectos.getElementsByTagName('tr');
    let datosFila = null;
    let datos = null;
    let valor = null;
    let coincide = false;

    for (let i = 1; i < filasProyectos.length; i++) {    
        datosFila = filasProyectos[i];
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

function ftnFechaProyecto (pFecha){

    let fecha = new Date(pFecha);
    let dd = fecha.getDate()+1;
    let mm = fecha.getMonth()+1;
    let yyyy = fecha.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
    mm = '0'+mm
    } 

    let textoFecha = dd + '/' + mm + '/' + yyyy;
  
    return textoFecha;
}