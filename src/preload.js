const contextBridge = require('electron').contextBridge;
const ipcRender = require('electron').ipcRenderer;

const ipc = {
    'render': {
        'send': [
            'login',
            'logout',
            'configuracion',
            'openConf'/*,
            'consulta',
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
            'getTablaPrestamos',
            'getTablaPrestamosDevueltos',
            'getTablaUsuarioLista',
            'registraEquipo',
            'eliminaEquipo',
            'devolverEquipo',
            'eliminaHistorialPrestamo'/*
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