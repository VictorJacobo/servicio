let dataTable;
let dataTableIsInitialized = false;

const dataTableOptions = {
    //scrollX: "2000px",
    lengthMenu: [5, 10, 15, 20, 100, 200, 500],
    columnDefs: [
        { className: "centered", targets: [0, 1, 2, 3, 4, 5, 6] },
        { orderable: false, targets: [5, 6] },
        { searchable: false, targets: [1] }
        //{ width: "50%", targets: [0] }
    ],
    pageLength: 3,
    destroy: true,
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
    if (dataTableIsInitialized) {
        dataTable.destroy();
    }

    await listUsers();

    dataTable = $("#equipos_data").DataTable({});

    dataTableIsInitialized = true;
};

const listUsers = async () => {
    try {
        window.ipcRender.invoke('getTablaEquipo').then((result) => {
            console.log("Equipos: "+result)
            let content = ``;
            result.forEach((equipo, index) => {
                content += `
                <tr>
                    <td>${equipo.idEquipo}</td>
                    <td>${equipo.Marca}</td>
                    <td>${equipo.Modelo}</td>
                    <td>${equipo.N_serie}</td>
                    <td>${equipo.Tipo}</td>
                </tr>`;
            });
            tableBody_users.innerHTML = content;
        });

    } catch (ex) {
        alert(ex);
    }
};

window.addEventListener("load", async () => {
    await initDataTable();
});