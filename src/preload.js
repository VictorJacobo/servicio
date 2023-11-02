const contextBridge = require('electron').contextBridge;
const ipcRender = require('electron').ipcRenderer;

const ipc = {
    'render': {
        'send': [
            'login',
            'logout',
<<<<<<< HEAD
            'openConf'/*,
=======
            'configuracion'/*,
>>>>>>> 1c66cc5268dbd7246e5e7ae2ff3bb979d783e159
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
            'registraPrestamo'/*
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