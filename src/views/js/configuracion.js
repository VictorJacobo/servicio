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

        window.ipcRender.invoke('getConfiguracion').then((result) => {
    
            if (result != null){
                Ipserver.value=result.Ipserver;
                Ipcamara.value=result.Ipcamara;
                Puertolector.value=result.Puertolector;
                window.ipcRender.invoke('camaras').then((r) => {
                    camaras.value = r;
                })
            }
        })

    })
