let dataTable;
let dataTableIsInitialized = false;


const dataTableOptions = {
    pageLength: 5,
    destroy: true,
    scrollX: false,
    autoWidth: true,
    responsive: true,
    stripeClasses: [], // Desactiva las clases de rayas de DataTable
    columnDefs: [
        { className: "centered-header", targets: "_all" }, // Aplica la clase a todas las columnas
        { searchable: false, targets: [5]},
        { orderable: false, targets: [5]},
        {width: "10%", targets: [0,2,3]},
        {width: "20%", targets: [1]},
        {width: "15%", targets: [5]},
        {width: "35%", targets: [4]}
    ],
    language: {
        lengthMenu: "Mostrar _MENU_ registros por página",
        zeroRecords: "Ningún equipo encontrado",
        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Ningún equipo encontrado",
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
            if(result!=null){
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
                    <tr id="row_${equipo.idEquipo}">
                        <td>${equipo.idEquipo}</td>
                        <td>${equipo.Marca}</td>
                        <td>${equipo.Modelo}</td>
                        <td>${equipo.N_serie}</td>
                        <td>${equipo.Tipo}</td>
                        <td class="tBotones">
                            <div class="row">
                                <div class="col-6">
                                    <button class="btn btn-success btn-sm" onclick="editarEquipo('${equipo.idEquipo}')">Editar</button>
                                </div>
                                <div class="col-6">
                                    <button style="margin-left: -10px;" class="btn btn-danger btn-sm"  onclick="eliminarEquipo('${equipo.idEquipo}')">Eliminar</button>
                                </div>
                            </div>
                        </td>
                    </tr>`;
                });
                $('#tableBody_users').html(content)
            }
 

    } catch (ex) {
        alert(ex);
    }
};

// Función para editar equipo
const editarEquipo = async (idEquipo) => {
    try {
        // Lógica para obtener la información actualizada del equipo con el id proporcionado
        const result = await window.ipcRender.invoke('getEquipoData', idEquipo);
        // Actualiza solo la fila correspondiente
        const updatedRow = `
        <tr id="row_${idEquipo}">
                <td><input placeholder="idEquipo" type="text" class="form-control form-control-sm" id="nEquipo${idEquipo}" value="${result.id}"></td>
                <td><input placeholder="Marca" type="text" class="form-control form-control-sm" id="nMarca${idEquipo}" value="${result.marca}"></td>
                <td><input placeholder="Modelo" type="text" class="form-control form-control-sm" id="nModelo${idEquipo}" value="${result.modelo}"></td>
                <td><input placeholder="N_serie" type="text" class="form-control form-control-sm" id="nSerie${idEquipo}" value="${result.serie}"></td>
                <td><input placeholder="Tipo" type="text" class="form-control form-control-sm" id="nTipo${idEquipo}" value="${result.tipo}"></td>
                <td class="tBotones centered-header">
                        <div class="row">
                            <div class="col-6">
                            <button type="submit" class="btn btn-primary btn-sm" onclick="confirmarEditar('${idEquipo}')">Enviar</button>
                            </div>
                            <div class="col-6">
                                <button class="btn btn-danger btn-sm" onclick="cancelarEditar('${idEquipo}')">Cancelar</button>
                            </div>
                        </div>
                    </td>
        </tr>`;
        // Reemplaza la fila existente con la actualizada
        $(`#row_${idEquipo}`).replaceWith(updatedRow);
    } catch (ex) {
        alert(ex);
    }
};


// Función para editar equipo
const confirmarEditar = async (id) => {
    const idEquipo = $('#nEquipo'+id).val();
    const marca = $('#nMarca'+id).val();
    const modelo = $('#nModelo'+id).val();
    const nSerie = $('#nSerie'+id).val();
    const tipo = $('#nTipo'+id).val();

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
    const data = { idEquipo, marca, modelo, nSerie, tipo, id};
    window.ipcRender.invoke('editaEquipoData', data).then((result) => {
        if (result == true) {
            Swal.fire({
                title: 'Exito',
                text: 'El equipo se ha editado exitosamente',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then(() => {
                let updatedRow;
                updatedRow += `
                <tr id="row_${idEquipo}">
                    <td class="centered-header sorting_1">${idEquipo}</td>
                    <td class="centered-header">${marca}</td>
                    <td class="centered-header">${modelo}</td>
                    <td class="centered-header">${nSerie}</td>
                    <td class="centered-header">${tipo}</td>
                    <td class="tBotones centered-header">
                        <div class="row">
                            <div class="col-6">
                                <button class="btn btn-success btn-sm" onclick="editarEquipo('${idEquipo}')">Editar</button>
                            </div>  
                            <div class="col-6">
                                <button class="btn btn-danger btn-sm" onclick="eliminarEquipo('${idEquipo}')">Eliminar</button>
                            </div>
                        </div>
                    </td>
                </tr>`;
                $(`#row_${id}`).replaceWith(updatedRow);
            });
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'El equipo no se ha podido editar',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    });
};

// Función para editar equipo
const cancelarEditar = async (idEquipo) => {
    try {
        // Lógica para obtener la información actualizada del equipo con el id proporcionado
        const result = await window.ipcRender.invoke('getEquipoData', idEquipo);
        // Actualiza solo la fila correspondiente
        let updatedRow;
        updatedRow += `
                <tr id="row_${idEquipo}">
                    <td class="centered-header sorting_1">${result.id}</td>
                    <td class="centered-header">${result.marca}</td>
                    <td class="centered-header">${result.modelo}</td>
                    <td class="centered-header">${result.serie}</td>
                    <td class="centered-header">${result.tipo}</td>
                    <td class="tBotones centered-header">
                        <div class="row">
                            <div class="col-6">
                                <button class="btn btn-success btn-sm" onclick="editarEquipo('${result.id}')">Editar</button>
                            </div>
                            <div class="col-6">
                                <button class="btn btn-danger btn-sm" onclick="eliminarEquipo('${result.id}')">Eliminar</button>
                            </div>
                        </div>
                    </td>
                </tr>`;
        // Reemplaza la fila existente con la actualizada
        $(`#row_${idEquipo}`).replaceWith(updatedRow);
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