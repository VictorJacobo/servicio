let dataTable;
let dataTableIsInitialized = false;
let openEye;
let password;


const dataTableOptions = {
    pageLength: 5,
    destroy: true,
    stripeClasses: [], // Desactiva las clases de rayas de DataTable
    columnDefs: [
        { className: "centered-header", targets: "_all" } // Aplica la clase a todas las columnas
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
                        <td><input placeholder="Correo" type="email" class="form-control form-control-sm" id="nCorreo"></td>
                        <td><input placeholder="Carrera" type="text" class="form-control form-control-sm" id="nCarrera"></td>
                        <td class="pass">
                            <input placeholder="Contraseña" type="password" class="form-control form-control-sm" id="nContra">
                            <img src="./../assets/images/eye.svg" id="eye1" onclick="VerPass()">
                        </td>
                        <td><button type="submit" class="btn btn-primary btn-sm" onclick="AgregarUsuario(event)">Enviar</button></td>
                </tr>`;
                result.forEach((usuario,index) => {
                    content += `
                    <tr>
                        <td>${usuario.Matricula_A}</td>
                        <td>${usuario.Nombres}</td>
                        <td>${usuario.Apellidos}</td>
                        <td>${usuario.Correo}</td>
                        <td>${usuario.Carrera}</td>
                        <td>${usuario.Contrasena}</td>
                        <td class="tBotones">
                            <div class="row">
                                <div class="col-6">
                                    <button class="btn btn-success btn-sm" onclick="editarEquipo('${usuario.Matricula_A}')">Editar</button>
                                </div>
                                <div class="col-6">
                                    <button class="btn btn-danger btn-sm" onclick="eliminarEquipo('${usuario.Matricula_A}')">Eliminar</button>
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
