
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
        
        let fila = tbody.insertRow();
        let celdaCodigo = fila.insertCell();
        let celdaNombre = fila.insertCell();
        let celdaProfesor = fila.insertCell();
        let celdaEstudiante = fila.insertCell();
        let celdaEstado = fila.insertCell();
        let celdaFechaEntrega = fila.insertCell();
        let btns = fila.insertCell();
        let profesorLider = listaProyecto[i]['profesorLider'];
        let estudianteCoordinador = buscarCoordinador(listaProyectoEstudiantes,listaProyecto);
        
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
        let fecha = new Date();
        let fechaEntrega = fecha.getDate(listaProyecto[i]['fechaEntrega']) + "/" + fecha.getMonth(listaProyecto[i]['fechaEntrega']) + "/" + fecha.getFullYear(listaProyecto[i]['fechaEntrega']);

        let btnVer = document.createElement('input');
        btnVer.type = 'button';
        btnVer.value = 'Ver';
        btnVer.name = listaProyecto[i]['_id'];
        btnVer.classList.add('btn-list');
        // btnVer.addEventListener('click', editEvent);

        let btnAsignarEstudiantes = document.createElement('input');
        btnAsignarEstudiantes.type = 'button';
        btnAsignarEstudiantes.value = 'Asignar Estudiante';
        btnAsignarEstudiantes.name = listaProyecto[i]['_id'];
        btnAsignarEstudiantes.classList.add('btn-list');
        // btnAsignarEstudiantes.addEventListener('click', editEvent);

        let btnEliminar = document.createElement('input');
        btnEliminar.type = 'button';
        btnEliminar.value = 'Eliminar';
        btnEliminar.name = listaProyecto[i]['_id'];
        btnEliminar.classList.add('btn-list');
        // btnEliminar.addEventListener('click', editEvent);

        celdaCodigo.innerHTML = listaProyecto[i]['codigo'];
        celdaNombre.innerHTML = listaProyecto[i]['nombre'];
        celdaProfesor.innerHTML = profesorLider[0].nombreLider;
        celdaEstudiante.innerHTML = estudianteCoordinador;
        celdaEstado.innerHTML = listaProyecto[i]['estado'];
        celdaFechaEntrega.innerHTML = fechaEntrega;
        btns.appendChild(btnVer);
        btns.appendChild(btnAsignarEstudiantes);
        btns.appendChild(btnEliminar);
    }

};

function ftnEditEvent(){
	var id = this.name;
	 window.location.href='../../Views/Event/modifyEvent.html?id'+'='+id;
}

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