let Ipserver = document.querySelector('#ipserver');
let Ipcamara = document.querySelector('#ipcam');
let Puertolector = document.querySelector('#puertolec');
let camaras = document.querySelector('#nCamaras');

const formSubmit = (event) => {
    event.preventDefault();
    console.log(Ipserver.value);
    console.log(Ipcamara.value);
    console.log(Puertolector.value);
    const configuracion = { Ipserver: Ipserver.value, Ipcamara: Ipcamara.value, Puertolector: Puertolector.value };
    window.ipcRender.send('configuracion', configuracion);
}

document.addEventListener('DOMContentLoaded', function () {

        window.ipcRender.invoke('getConfiguracion').then(async (result) => {
    
            if (result != null){
                Ipserver.value=result.Ipserver;
                Ipcamara.value=result.Ipcamara;
                Puertolector.value=result.Puertolector;
                const devices = await navigator.mediaDevices.enumerateDevices();

                // Filtra los dispositivos para obtener solo las cámaras de video
                const cameras = devices.filter(device => device.kind === 'videoinput');
                console.log(cameras)
                camaras.value=cameras[0].label + cameras[1].label;
            }
        })

    })
