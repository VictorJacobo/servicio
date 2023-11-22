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

    

    dataTable = $("#equipos_data").DataTable(dataTableOptions);

    dataTableIsInitialized = true;
};

const listUsers = async () => {
    try {
        const result = await window.ipcRender.invoke('getTablaEquipo');
            //console.log("Equipos: "+result)
            let content = ``;
            content += `
            <tr>
                    <td><input placeholder="idEquipo" type="text" class="form-control form-control-sm" id="nEquipo"></td>
                    <td><input placeholder="Marca" type="text" class="form-control form-control-sm" id="nMarca"></td>
                    <td><input placeholder="Modelo" type="text" class="form-control form-control-sm" id="nModelo"></td>
                    <td><input placeholder="N_serie" type="text" class="form-control form-control-sm" id="nSerie"></td>
                    <td><input placeholder="Tipo" type="text" class="form-control form-control-sm" id="nTipo"></td>
                    <td><button type="submit" class="btn btn-primary btn-sm" onclick="AgregarEquipo(event)">Enviar</button></td>
            </tr>`;
            result.forEach((equipo,index) => {
                content += `
                <tr>
                    <td>${equipo.idEquipo}</td>
                    <td>${equipo.Marca}</td>
                    <td>${equipo.Modelo}</td>
                    <td>${equipo.N_serie}</td>
                    <td>${equipo.Tipo}</td>
                    <td><button class="btn btn-danger" onclick="eliminarEquipo('${equipo.idEquipo}')">Eliminar</button></td>
                </tr>`;
            });
            $('#tableBody_users').html(content)
 

    } catch (ex) {
        alert(ex);
    }
};

window.addEventListener("load", async () => {
    await initDataTable();
});


const AgregarEquipo = (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de manera convencional
    // Obtener valores de los campos
    const idEquipo = $('#nEquipo').val();
    const marca = $('#nMarca').val();
    const modelo = $('#nModelo').val();
    const nSerie = $('#nSerie').val();
    const tipo = $('#nTipo').val();

    // Validar que los campos no estén vacíos
    if (!idEquipo || !marca || !modelo || !nSerie || !tipo) {
        Swal.fire({
            title: 'Error!',
            text: 'Por favor, completa todos los campos',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
        return; // Detener la ejecución si hay campos vacíos
    }

    // Crear el objeto data
    const data = { idEquipo, marca, modelo, nSerie, tipo };
    window.ipcRender.invoke('registraEquipo', data).then((result) => {
        if (result == true) {
            Swal.fire({
                title: 'Exito',
                text: 'El equipo se ha registrado exitosamente',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then(() => {
                // Recarga la página después de cerrar la alerta de éxito
                location.reload();
            });
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'El equipo no se ha podido registrar',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    });
};


const eliminarEquipo = (id) => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará el equipo. ¿Estás seguro de continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // El usuario confirmó la eliminación, llamar a eliminaEquipo
            window.ipcRender.invoke('eliminaEquipo', id).then((result) => {
                if (result == true) {
                    Swal.fire({
                        title: 'Éxito',
                        text: 'El equipo se ha eliminado exitosamente',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    }).then(() => {
                        // Recarga la página después de cerrar la alerta de éxito
                        location.reload();
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'El equipo no se ha podido eliminar',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                }
            });
        }
    });
}