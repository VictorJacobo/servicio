let Ipserver = document.querySelector('#ipserver');
let Ipcamara = document.querySelector('#ipcam');
let Puertolector = document.querySelector('#puertolec');

const formSubmit = (event) => {
    event.preventDefault();
    console.log(Ipserver.value);
    console.log(Ipcamara.value);
    console.log(Puertolector.value);
    const configuracion = { Ipserver: Ipserver.value, Ipcamara: Ipcamara.value, Puertolector: Puertolector.value };
    window.ipcRender.send('configuracion', configuracion);
}