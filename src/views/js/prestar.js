let matri = document.querySelector('#matri');
let Amatri = document.querySelector('#Amatri');
let nombre = document.querySelector('#nomb');
let apellido = document.querySelector('#apelli');
let correo = document.querySelector('#corre');
let carrera = document.querySelector('#carre');

const formSubmit = (event) => {
    event.preventDefault();
    consultaMatri()
    return false;
}

const consultaMatri = () => {
    const data = { matricula: matri.value};
    window.ipcRender.send('consulta', data);
    window.ipcRender.invoke('getDatos').then((result) => {
        if (result != ' '){
            console.log(result)
            Amatri.value = result.matricula;
            nombre.value = result.nombre;
            apellido.value = result.apellido;
            correo.value = result.correo;
            carrera.value = result.carrera;
        } else {
            console.log("No se encontro matricula")
        }
            
    });
}