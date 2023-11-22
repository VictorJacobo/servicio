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

    

    dataTable = $("#historial_data").DataTable(dataTableOptions);

    dataTableIsInitialized = true;
};

const listUsers = async () => {
    try {
        const result = await window.ipcRender.invoke('getTablaPrestamosDevueltos');
            //console.log("Equipos: "+result)
            let content = ``;

            result.forEach((prestamo,index) => {
                content += `
                <tr>
                    <td>${prestamo.Matricula_A}</td>
                    <td>${prestamo.Matricula_Admin}</td>
                    <td>${prestamo.idEquipo}</td>
                    <td>${prestamo.Fecha_P}</td>
                    <td>${prestamo.Fecha_D}</td>
                    <td><button class="btn btn-danger" onclick="eliminarPrestamo('${prestamo.idPrestamos}')">Eliminar</button></td>
                </tr>`;
            });
            $('#tableBody_historial').html(content)
 

    } catch (ex) {
        alert(ex);
    }
};

window.addEventListener("load", async () => {
    await initDataTable();
});


const eliminarPrestamo = (id) => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará el historial de prestamo. ¿Estás seguro de continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // El usuario confirmó la eliminación, llamar a eliminaEquipo
            window.ipcRender.invoke('eliminaHistorialPrestamo', id).then((result) => {
                if (result == true) {
                    Swal.fire({
                        title: 'Éxito',
                        text: 'El historial de prestamo se ha eliminado exitosamente',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    }).then(() => {
                        // Recarga la página después de cerrar la alerta de éxito
                        location.reload();
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'El historial de prestamo no se ha podido eliminar',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                }
            });
        }
    });
}