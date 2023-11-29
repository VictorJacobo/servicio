let dataTable;
let dataTableIsInitialized = false;


const dataTableOptions = {
    pageLength: 5,
    destroy: true,
    stripeClasses: [], // Desactiva las clases de rayas de DataTable
    columnDefs: [
        { className: "centered-header", targets: "_all" }, // Aplica la clase a todas las columnas
        { searchable: false, targets: [5]},
        { orderable: false, targets: [5]},
        {width: "22.5%", targets: [5]}
    ],
    language: {
        lengthMenu: "Mostrar _MENU_ registros por página",
        zeroRecords: "Ningún alumno encontrado",
        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Ningún alumno registrado",
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
        let content = ``;
        if (result != null) {
            result.forEach((alumno, index) => {
                content += `
                    <tr id="row_${alumno.Matricula_A}">
                        <td>${alumno.Matricula_A}</td>
                        <td>${alumno.Nombres}</td>
                        <td>${alumno.Apellidos}</td>
                        <td>${alumno.Correo}</td>
                        <td>${alumno.Carrera}</td>
                        <td class="tBotones">
                            <div class="d-flex align-items-center justify-content-center">
                                <div class="col-4">
                                    <button style="width: calc(85% + 1px);" class="btn btn-success btn-sm" onclick="editarAlumno('${alumno.Matricula_A}')">Editar</button>
                                </div>
                                <div class="col-4">
                                    <button class="btn btn-danger btn-sm" onclick="eliminarAlumno('${alumno.Matricula_A}')">Eliminar</button>
                                </div>
                                <div class="col-4">
                                    <button class="btn btn-dark btn-sm" onclick="listaNegra('${alumno.Matricula_A}')">L. Negra</button>
                                </div>
                            </div>
                        </td>
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


// Función para editar equipo
const editarAlumno = async (Matricula_A) => {
    try {
        // Lógica para obtener la información actualizada del equipo con el id proporcionado
        const result = await window.ipcRender.invoke('getDatos', Matricula_A);
        // Actualiza solo la fila correspondiente
        let select;
        switch(result.carrera){
            case "Lic. en Ciencias de la Computación": 
                select =`<select class="form-control" id="nCarrera${Matricula_A}">
                <option value="Lic. en Ciencias de la Computación" selected>Lic. en Ciencias de la Computación</option>
                <option value="Ing. en Ciencias de la Computación">Ing. en Ciencias de la Computación</option>
                <option value="Ing. en Tecnologias de la Información">Ing. en Tecnologias de la Información</option>
            </select>`
                break;
            case "Ing. en Ciencias de la Computación":
                select =`<select class="form-control" id="nCarrera${Matricula_A}">
                <option value="Lic. en Ciencias de la Computación">Lic. en Ciencias de la Computación</option>
                <option value="Ing. en Ciencias de la Computación" selected>Ing. en Ciencias de la Computación</option>
                <option value="Ing. en Tecnologias de la Información">Ing. en Tecnologias de la Información</option>
            </select>`
                break;
            default: 
            select =`<select class="form-control" id="nCarrera${Matricula_A}">
                <option value="Lic. en Ciencias de la Computación">Lic. en Ciencias de la Computación</option>
                <option value="Ing. en Ciencias de la Computación">Ing. en Ciencias de la Computación</option>
                <option value="Ing. en Tecnologias de la Información" selected>Ing. en Tecnologias de la Información</option>
            </select>`
                break;

        }
        const updatedRow = `
        <tr id="row_${Matricula_A}">
                <td><input placeholder="Matricula" type="text" class="form-control form-control-sm" id="nAlumno${Matricula_A}" value="${result.matricula}"></td>
                <td><input placeholder="Nombres" type="text" class="form-control form-control-sm" id="nNombres${Matricula_A}" value="${result.apellido}"></td>
                <td><input placeholder="Apellidos" type="text" class="form-control form-control-sm" id="nApellido${Matricula_A}" value="${result.nombre}"></td>
                <td><input placeholder="Correo" type="text" class="form-control form-control-sm" id="nCorreo${Matricula_A}" value="${result.correo}"></td>
                <td>${select}</td>
                <td class="tBotones centered-header">
                        <div class="row">
                            <div class="col-6">
                            <button type="submit" class="btn btn-primary btn-sm" onclick="confirmarEditar('${Matricula_A}')">Enviar</button>
                            </div>
                            <div class="col-6">
                                <button class="btn btn-danger btn-sm" onclick="cancelarEditar('${Matricula_A}')">Cancelar</button>
                            </div>
                        </div>
                    </td>
        </tr>`;
        // Reemplaza la fila existente con la actualizada
        $(`#row_${Matricula_A}`).replaceWith(updatedRow);
    } catch (ex) {
        alert(ex);
    }
};

// Función para editar alumno
const confirmarEditar = async (id) => {
    const matricula = $('#nAlumno'+id).val();
    const nombre = $('#nNombres'+id).val();
    const apellido = $('#nApellido'+id).val();
    const correo = $('#nCorreo'+id).val();
    const carrera = $('#nCarrera'+id).val();

    // Validar que los campos no estén vacíos
    if (!matricula || !nombre || !apellido || !correo || !carrera) {
        Swal.fire({
            title: 'Error!',
            text: 'Por favor, completa todos los campos',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
        return; // Detener la ejecución si hay campos vacíos
    }

    // Crear el objeto data
    const data = { matricula, nombre, apellido, correo, carrera, id};
    window.ipcRender.invoke('editaAlumnoData', data).then((result) => {
        console.log(result)
        if (result == true) {
            Swal.fire({
                title: 'Exito',
                text: 'El equipo se ha editado exitosamente',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then(() => {
                let updatedRow;
                updatedRow += `
                <tr id="row_${matricula}">
                    <td class="centered-header sorting_1">${matricula}</td>
                    <td class="centered-header">${nombre}</td>
                    <td class="centered-header">${apellido}</td>
                    <td class="centered-header">${correo}</td>
                    <td class="centered-header">${carrera}</td>
                    <td class="tBotones centered-header">
                            <div class="d-flex align-items-center justify-content-center">
                                <div class="col-4">
                                    <button style="width: calc(85% + 1px);" class="btn btn-success btn-sm" onclick="editarAlumno('${matricula}')">Editar</button>
                                </div>
                                <div class="col-4">
                                    <button class="btn btn-danger btn-sm" onclick="eliminarAlumno('${matricula}')">Eliminar</button>
                                </div>
                                <div class="col-4">
                                    <button class="btn btn-dark btn-sm" onclick="listaNegra('${matricula}')">L. Negra</button>
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
const cancelarEditar = async (matricula) => {
    try {
        // Lógica para obtener la información actualizada del equipo con el id proporcionado
        const result = await window.ipcRender.invoke('getDatos', matricula);
        // Actualiza solo la fila correspondiente
        let updatedRow;
        updatedRow += `
                <tr id="row_${matricula}">
                    <td class="centered-header sorting_1">${result.matricula}</td>
                    <td class="centered-header">${result.nombre}</td>
                    <td class="centered-header">${result.apellido}</td>
                    <td class="centered-header">${result.correo}</td>
                    <td class="centered-header">${result.carrera}</td>
                    <td class="tBotones centered-header">
                        <div class="d-flex align-items-center justify-content-center">
                                <div class="col-4">
                                    <button style="width: calc(85% + 1px);" class="btn btn-success btn-sm" onclick="editarAlumno('${result.id}')">Editar</button>
                                </div>
                                <div class="col-4">
                                    <button class="btn btn-danger btn-sm" onclick="eliminarAlumno('${result.id}')">Eliminar</button>
                                </div>
                                <div class="col-4">
                                    <button class="btn btn-dark btn-sm" onclick="listaNegra('${result.id}')">L. Negra</button>
                                </div>
                            </div>
                        </td>
                </tr>`;
        // Reemplaza la fila existente con la actualizada
        $(`#row_${matricula}`).replaceWith(updatedRow);
    } catch (ex) {
        alert(ex);
    }
};

const eliminarAlumno = (id) => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará al alumno. ¿Estás seguro de continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar datos del alumno',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // El usuario confirmó la eliminación, llamar a eliminaEquipo
            window.ipcRender.invoke('eliminaAlumno', id).then((result) => {
                if (result == true) {
                    Swal.fire({
                        title: 'Éxito',
                        text: 'El ha sido eliminado.',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    }).then(() => {
                        // Recarga la página después de cerrar la alerta de éxito
                        location.reload();
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'El alumno no se ha podido eliminar',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                }
            });
        }
    });
}

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
                        text: 'El alumno esta en lista negra',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    }).then(() => {
                        // Recarga la página después de cerrar la alerta de éxito
                        location.reload();
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'El equipo no se ha podido poner en lista negra',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                }
            });
        }
    });
}