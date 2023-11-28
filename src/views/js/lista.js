let dataTable;
let dataTableIsInitialized = false;



const dataTableOptions = {
    pageLength: 5,
    destroy: true,
    stripeClasses: [], // Desactiva las clases de rayas de DataTable
    columnDefs: [
        { className: "centered-header", targets: "_all" }, // Aplica la clase a todas las columnas
        { searchable: false, targets: [5]},
        { orderable: false, targets: [5]}
    ],
    language: {
        lengthMenu: "Mostrar _MENU_ registros por página",
        zeroRecords: "No hay alumnos en lista negra",
        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Sin resultados",
        infoFiltered: "(filtrados desde _MAX_ registros totales)",
        search: "Buscar:",
        loadingRecords: "Cargando...",
        paginate: {
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previous: "Anterior"
        }
    }
};

const initDataTable = async () => {
    await listUsers();
    if (dataTableIsInitialized) {
        dataTable.destroy();
    }

    

    dataTable = $("#alumnos_data").DataTable(dataTableOptions);

    dataTableIsInitialized = true;
};

const listUsers = async () => {
    try {
        const result = await window.ipcRender.invoke('getTablaAlumnosLista');
            //console.log("Equipos: "+result)
            let content = ``;
            if(result!=null){
                result.forEach((alumno,index) => {
                    content += `
                    <tr>
                        <td>${alumno.Matricula_A}</td>
                        <td>${alumno.Nombres}</td>
                        <td>${alumno.Apellidos}</td>
                        <td>${alumno.Correo}</td>
                        <td>${alumno.Carrera}</td>
                        <td><button class="btn btn-success" onclick="quitarlistaNegra('${alumno.Matricula_A}')">Quitar</button></td>
                    </tr>`;
                });
                $('#alumnos').html(content)  
            }
            
 

    } catch (ex) {
        alert(ex);
    }
};

window.addEventListener("load", async () => {
    await initDataTable();
});


const quitarlistaNegra = (id) => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción quitará de la lista negra al alumno. ¿Estás seguro de continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, quitar de lista negra',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // El usuario confirmó la eliminación, llamar a eliminaEquipo
            window.ipcRender.invoke('quitarlistaNegra', id).then((result) => {
                if (result == true) {
                    Swal.fire({
                        title: 'Éxito',
                        text: 'El alumno se ha quitado de la lista negra',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    }).then(() => {
                        // Recarga la página después de cerrar la alerta de éxito
                        location.reload();
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'El alumno no se ha podido quitar de la lista negra',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                }
            });
        }
    });
}