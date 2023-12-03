let dataTable;
let dataTableIsInitialized = false;
let openEye;
let password;

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
        //{width: "10%", targets: [0]},
        //{width: "15%", targets: [1,2,3,4,5,6]},
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

    

    dataTable = $("#usuarios_data").DataTable(dataTableOptions);

    dataTableIsInitialized = true;
};

const listUsers = async () => {
    try {
        const result = await window.ipcRender.invoke('getTablaUsuario');
            //console.log("Equipos: "+result)
            let content = ``;
            if(result!=null){
                content += `
                <tr>
                        <td><input placeholder="Matricula" type="text" class="form-control form-control-sm" id="nMatricula"></td>
                        <td><input placeholder="Nombres" type="text" class="form-control form-control-sm" id="nNombres"></td>
                        <td><input placeholder="Apellidos" type="text" class="form-control form-control-sm" id="nApellidos"></td>
                        <td class="pass">
                            <input placeholder="Contraseña" type="password" class="form-control form-control-sm" id="nContra">
                            <img src="./../assets/images/eye.svg" id="eye1" onclick="VerPass()">
                        </td>
                        <td><button type="submit" class="btn btn-primary btn-sm" onclick="AgregarUsuario(event)">Enviar</button></td>
                </tr>`;
                result.forEach((usuario,index) => {
                    content += `
                    <tr id="row_${usuario.Matricula_Admin}">
                        <td class="centered-header sorting_1">${usuario.Matricula_Admin}</td>
                        <td class="centered-header">${usuario.Nombres}</td>
                        <td class="centered-header">${usuario.Apellidos}</td>
                        <td class="pass">
                            <input placeholder="Contraseña" type="password" class="form-control form-control-sm" id="nContra" value="${usuario.contrasena}" readonly disabled> 
                            <img src="./../assets/images/eye.svg" id="eye1" onclick="VerPass()">
                        </td>
                        <td class="tBotones centered-header">
                            <div class="row">
                                <div class="col-6">
                                    <button class="btn btn-success btn-sm" onclick="editarUsuario('${usuario.Matricula_Admin}')">Editar</button>
                                </div>
                                <div class="col-6">
                                    <button class="btn btn-danger btn-sm delete" onclick="eliminarUsuario('${usuario.Matricula_Admin}')">Eliminar</button>
                                </div>
                            </div>
                        </td>
                    </tr>`;
                });
                $('#users').html(content)
            }
 

    } catch (ex) {
        alert(ex);
    }
};

// Función para editar equipo
const editarUsuario = async (Matricula_Admin) => {
    try {
        // Lógica para obtener la información actualizada del equipo con el id proporcionado
        const result = await window.ipcRender.invoke('getUsuarioData', Matricula_Admin);
        console.log(result);
        // Actualiza solo la fila correspondiente
        const updatedRow = `
        <tr id="row_${Matricula_Admin}">
                <td><input placeholder="Matricula_Admin" type="text" class="form-control form-control-sm" id="nMatricula${Matricula_Admin}" value="${result.matricula_admin}"></td>
                <td><input placeholder="Nombres" type="text" class="form-control form-control-sm" id="nNombres${Matricula_Admin}" value="${result.nombres}"></td>
                <td><input placeholder="Apellidos" type="text" class="form-control form-control-sm" id="nApellidos${Matricula_Admin}" value="${result.apellidos}"></td>
                <td><input placeholder="Contrasenas" type="text" class="form-control form-control-sm" id="nContra${Matricula_Admin}" value="${result.contrasena}"></td>
                <td class="tBotones centered-header">
                        <div class="row">
                            <div class="col-6">
                            <button type="submit" class="btn btn-primary btn-sm" onclick="confirmarEditar('${Matricula_Admin}')">Enviar</button>
                            </div>
                            <div class="col-6">
                                <button class="btn btn-danger btn-sm" onclick="cancelarEditar('${Matricula_Admin}')">Cancelar</button>
                            </div>
                        </div>
                    </td>
        </tr>`;
        // Reemplaza la fila existente con la actualizada
        $(`#row_${Matricula_Admin}`).replaceWith(updatedRow);
    } catch (ex) {
        alert(ex);
    }
};

// Función para editar usuario
const confirmarEditar = async (id) => {
    const matricula_admin = $('#nMatricula'+id).val();
    const nombres = $('#nNombres'+id).val();
    const apellidos = $('#nApellidos'+id).val();
    const contrasena = $('#nContra'+id).val();

    // Validar que los campos no estén vacíos
    if (!matricula_admin || !nombres || !apellidos || !contrasena) {
        Swal.fire({
            title: 'Error!',
            text: 'Por favor, completa todos los campos',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
        return; // Detener la ejecución si hay campos vacíos
    }

    // Crear el objeto data
    const data = { matricula_admin, nombres, apellidos, contrasena, id};
    window.ipcRender.invoke('editaUsuarioData', data).then((result) => {
        if (result == true) {
            Swal.fire({
                title: 'Exito',
                text: 'El usuario se ha editado exitosamente',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then(() => {
                let updatedRow;
                updatedRow += `
                <tr id="row_${matricula_admin}">
                    <td class="centered-header sorting_1">${matricula_admin}</td>
                    <td class="centered-header">${nombres}</td>
                    <td class="centered-header">${apellidos}</td>
                    <td class="centered-header">${contrasena}</td>
                    <td class="tBotones centered-header">
                            <div class="row">
                                <div class="col-6">
                                    <button class="btn btn-success btn-sm" onclick="editarUsuario('${matricula_admin}')">Editar</button>
                                </div>
                                <div class="col-6">
                                    <button class="btn btn-danger btn-sm delete" onclick="eliminarUsuario('${matricula_admin}')">Eliminar</button>
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

// Función para cancenlar editar usuario
const cancelarEditar = async (Matricula_Admin) => {
    try {
        // Lógica para obtener la información actualizada del equipo con el id proporcionado
        const result = await window.ipcRender.invoke('getUsuarioData', Matricula_Admin);
        // Actualiza solo la fila correspondiente
        let updatedRow;
        updatedRow += `
                <tr id="row_${Matricula_Admin}">
                    <td class="centered-header sorting_1">${result.matricula_admin}</td>
                    <td class="centered-header">${result.nombres}</td>
                    <td class="centered-header">${result.apellidos}</td>
                    <td class="pass">
                            <input placeholder="Contraseña" type="password" class="form-control form-control-sm" id="nContra" value="${result.contrasena}" readonly disabled> 
                            <img src="./../assets/images/eye.svg" id="eye1" onclick="VerPass()">
                        </td>
                    <td class="tBotones centered-header">
                        <div class="row">
                            <div class="col-6">
                                <button class="btn btn-success btn-sm" onclick="editarUsuario('${result.matricula_admin}')">Editar</button>
                            </div>
                            <div class="col-6">
                                <button class="btn btn-danger btn-sm" onclick="eliminarUsuario('${result.matricula_admin}')">Eliminar</button>
                            </div>
                        </div>
                    </td>
                </tr>`;
        // Reemplaza la fila existente con la actualizada
        $(`#row_${Matricula_Admin}`).replaceWith(updatedRow);
    } catch (ex) {
        alert(ex);
    }
};

window.addEventListener("load", async () => {
    await initDataTable();
    openEye =  document.querySelector('#eye1');
    password = document.querySelector('#nContra');
});


let visible = false;

// Función para alternar la visibilidad de la contraseña
function VerPass() {
    console.log(password)
    // Cambia la visibilidad de la contraseña
    if (visible) {
        password.type = 'password';
        visible = false;
        // Cambia la imagen del ojo a cerrado
        openEye.src = "./../assets/images/eye.svg";
    } else {
        password.type = 'text';
        visible = true;
        // Cambia la imagen del ojo a abierto
        openEye.src = "./../assets/images/eye-slash.svg"; // Reemplaza con la ruta correcta de la imagen abierta
    }
}

const AgregarUsuario = (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de manera convencional
    // Obtener valores de los campos
    const matricula = $('#nMatricula').val();
    const nombres = $('#nNombres').val();
    const apellidos = $('#nApellidos').val();
    const contrasena = $('#nContra').val();

    // Validar que los campos no estén vacíos
    if (!matricula || !nombres || !apellidos || !contrasena) {
        Swal.fire({
            title: 'Error!',
            text: 'Por favor, completa todos los campos',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
        return; // Detener la ejecución si hay campos vacíos
    }

    // Crear el objeto data
    const data = { matricula, nombres, apellidos, contrasena};
    window.ipcRender.invoke('registraUsuario', data).then((result) => {
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

const eliminarUsuario = (id) => {
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
            window.ipcRender.invoke('eliminaUsuario', id).then((result) => {
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