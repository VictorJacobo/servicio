const contextBridge = require('electron').contextBridge;
const ipcRender = require('electron').ipcRenderer;

const ipc = {
    'render': {
        'send': [
            'login',
            'logout',
            'configuracion',
            'openConf',
            'openUsers',
            'openlogin1',
            'openRegistra',
            /*,
            'consulta',1
            'consultaE'
            'invitado',
            'addBook',
            'updateBook',
            'deleteBook',
            'consultBook',
            'consultCarreras'*/
        ],
        'sendReceive': [
            'getDatos',
            'getUserData',
            'getEquipoData',
            'registraPrestamo',
            'getConfiguracion',
            'leerQR',
            'getTablaEquipo',
            'getTablaUsuario',
            'getTablaAlumnos',
            'getTablaPrestamos',
            'getTablaPrestamosDevueltos',
            'getTablaAlumnosLista',
            'registraEquipo',
            'editaAlumnoData',
            'eliminaAlumno',
            'registraAlumno',
            'eliminaEquipo',
            'devolverEquipo',
            'eliminaHistorialPrestamo',
            'listaNegra',
            'quitarlistaNegra',
            'editaEquipoData',
            'camaras',
            'getUsuarioData',
            'editaUsuarioData',
            'registraAlumno',
            'registraUsuario',
            'eliminaUsuario'/*
            'getBooks',
            'getBook',
            'confirmAddBook',
            'confirmUpdateBook',
            'confirmDeleteBook'*/
        ]
    }
};

contextBridge.exposeInMainWorld(
    'ipcRender', {
    send: (channel, args) => {
        let validChannels = ipc.render.send;

        if (validChannels.includes(channel)) {
            ipcRender.send(channel, args);
        }
    },
    invoke: (channel, args) => {
        let validChannels = ipc.render.sendReceive;

        if (validChannels.includes(channel)) {
            return ipcRender.invoke(channel, args);
        }
    }
});