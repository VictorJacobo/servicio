let Ipserver = document.querySelector('#ipserver');
let camaras = document.querySelector('#nCamaras');
let btnSave = document.querySelector('#btnSave');

// Objeto para almacenar la configuración actual
let currentConfig = {
    Ipserver: '',
    camara: ''
};

const formSubmit = (event) => {
    event.preventDefault();
    let configuracion;
    if (camaras.value == null) {
        configuracion = { Ipserver: Ipserver.value, camara: '0' };
    } else {
        configuracion = { Ipserver: Ipserver.value, camara: camaras.value };
    }

    window.ipcRender.send('configuracion', configuracion);

    // Actualizar la configuración actual después de guardar
    currentConfig = configuracion;

    // Deshabilitar el botón después de guardar
    btnSave.disabled = true;
}

const checkChanges = () => {
    // Verificar si hay cambios en la configuración
    const hasChanges =
    Ipserver.value !== currentConfig.Ipserver ||
    camaras.value !== currentConfig.camara;

    // Enviar el estado de cambios al proceso principal
    window.ipcRenderer.send('updateChangesStatus', hasChanges);
    // Habilitar o deshabilitar el botón según si hay cambios
    btnSave.disabled = !hasChanges;
}

document.addEventListener('DOMContentLoaded', function () {
    window.ipcRender.invoke('getConfiguracion').then(async (result) => {
        if (result != null) {
            Ipserver.value = result.Ipserver;
            const devices = await navigator.mediaDevices.enumerateDevices();

            const cameras = devices.filter(device => device.kind === 'videoinput');

            if (cameras.length == 0) {
                camaras.innerHTML = `<option value="" selected disabled>No hay camaras</option>`;
            } else {
                let cont = 0;
                cameras.forEach(camera => {
                    const option = document.createElement('option');
                    option.value = cont;
                    option.text = camera.label;
                    if (result.camara == cont) {
                        option.selected = true;
                    }
                    camaras.add(option);
                    cont += 1;
                });
            }

            // Almacenar la configuración actual al cargar la página
            currentConfig = { Ipserver: Ipserver.value, camara: camaras.value };

            // Agregar eventos para verificar cambios en el formulario
            Ipserver.addEventListener('input', checkChanges);
            camaras.addEventListener('input', checkChanges);
        }
    });
});



window.onload = function () {
    // Importa el módulo ipcRenderer de Electron
    const { ipcRenderer } = require('electron');

    // Escucha el evento 'ventana-cerrandose'
    ipcRenderer.on('ventana-cerrandose', () => {
        // Realiza las acciones necesarias antes de que la ventana se cierre
        // Muestra un aviso, confirma con el usuario, etc.
        const respuesta = confirm('¿Estás seguro de que quieres cerrar la ventana?');

        // Si el usuario confirma, puedes cerrar la ventana
        if (respuesta) {
            // Envía un mensaje al proceso principal para confirmar el cierre
            ipcRenderer.send('confirmacion-cerrar-ventana');
        }
    });
};