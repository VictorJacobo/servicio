let dataTable;
let dataTableIsInitialized = false;


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
        const result = await window.ipcRender.invoke('getTablaUsuarioLista');
            //console.log("Equipos: "+result)
            let content = ``;
            result.forEach((usuario,index) => {
                content += `
                <tr>
                    <td>${usuario.Matricula_A}</td>
                    <td>${usuario.Nombres}</td>
                    <td>${usuario.Apellidos}</td>
                    <td>${usuario.Correo}</td>
                    <td>${usuario.Carrera}</td>
                </tr>`;
            });
            $('#users').html(content)
 

    } catch (ex) {
        
    }
};

window.addEventListener("load", async () => {
    await initDataTable();
});