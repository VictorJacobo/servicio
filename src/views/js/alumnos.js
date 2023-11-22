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
        zeroRecords: "Ningún usuario encontrado",
        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Ningún usuario encontrado",
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
        const result = await window.ipcRender.invoke('getTablaAlumnos');
            //console.log("Equipos: "+result)
            let content = ``;

            result.forEach((alumno,index) => {
                content += `
                <tr>
                    <td>${alumno.Matricula_A}</td>
                    <td>${alumno.Nombres}</td>
                    <td>${alumno.Apellidos}</td>
                    <td>${alumno.Correo}</td>
                    <td>${alumno.Carrera}</td>
                    <td><button class="btn btn-danger" onclick="listaNegra('${alumno.Matricula_A}')">Lista Negra</button></td>
                </tr>`;
            });
            $('#alumnos').html(content)
 

    } catch (ex) {
        alert(ex);
    }
};

window.addEventListener("load", async () => {
    await initDataTable();
});


const listaNegra = (id) => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción pondra en lista negra al alumno. ¿Estás seguro de continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, poner en lista negra',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // El usuario confirmó la eliminación, llamar a eliminaEquipo
            window.ipcRender.invoke('listaNegra', id).then((result) => {
                if (result == true) {
                    Swal.fire({
                        title: 'Éxito',
                        text: 'El equipo se ha devuelto exitosamente',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    }).then(() => {
                        // Recarga la página después de cerrar la alerta de éxito
                        location.reload();
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'El equipo no se ha podido devolver',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                }
            });
        }
    });
}