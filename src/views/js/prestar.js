//Atributos de la matricula formulario
let matri = document.querySelector('#matri');
let Amatri = document.querySelector('#Amatri');
let nombre = document.querySelector('#nomb');
let apellido = document.querySelector('#apelli');
let correo = document.querySelector('#corre');
let carrera = document.querySelector('#carre');


//Atributos del equipo formulario
let equipo = document.querySelector('#product');
let id = document.querySelector('#ide');
let marca = document.querySelector('#marc');
let modelo = document.querySelector('#mod');
let tipo = document.querySelector('#tip');

//Boton enviar y boton limpiar id's
let btnEnviar = document.querySelector('#btnEnviar');
let btnLimpiar = document.querySelector('#btnLimpiar');

//codigos
let codigo = document.querySelector('#product');

//Submit del alumno
const formSubmitM = (event) => {
    event.preventDefault();
    consultaMatri();
    return false;
}

//Submit del equipo
const formSubmitE = (event) => {
    event.preventDefault();
    consultaEquipo();
    return false;
}

//Submit del equipo
const EnviarPrestamo = (event) => {
    event.preventDefault();
    // Mostrar SweetAlert de confirmación
    Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Realmente desea registrar el prestamo?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, continuar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        // Si el usuario hace clic en "Aceptar", ejecuta la función Envia
        if (result.isConfirmed) {
            Envia();
        }
    });
    return false;
}

const consultaMatri = () => {
    const data = { matricula: matri.value };
    window.ipcRender.invoke('getDatos', data).then((result) => {
        if (result != null) {
            if (result.lista = '0') {
                console.log(result)
                Amatri.value = result.matricula;
                nombre.value = result.nombre;
                apellido.value = result.apellido;
                correo.value = result.correo;
                carrera.value = result.carrera;
                verifica();
                if (btnLimpiar.disabled == true) {
                    btnLimpiar.disabled = false;
                }
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'El alumno se encuentra en la lista negra',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'No existe un alumno con esta matrícula',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    });
}

const consultaEquipo = () => {
    const data = { equipo: equipo.value };
    //window.ipcRender.send('consultaE', data);
    window.ipcRender.invoke('getEquipoData', data).then((result) => {
        if (result !== null) {
            console.log(result)
            id.value = result.id;
            marca.value = result.marca;
            modelo.value = result.modelo;
            tipo.value = result.tipo;
            verifica();
            if (btnLimpiar.disabled == true) {
                btnLimpiar.disabled = false;
            }
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'No existe un equipo con este código',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }

    });
}

const Envia = () => {
    const data = { Amatricula: Amatri.value, equipo: equipo.value, fecha: new Date().toISOString() }
    window.ipcRender.invoke('registraPrestamo', data).then((result) => {
        if (result == true) {
            Swal.fire({
                title: 'Exito',
                text: 'El prestamo se ha registrado exitosamente',
                icon: 'success',
                confirmButtonText: 'Ok'
            })
            vaciarEquipo();
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'El prestamo no se ha podido registrar',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    });
}

btnLimpiar.addEventListener('click', function () {
    vaciarAlumno();
    vaciarEquipo();
    verifica();
    btnLimpiar.disabled = true;
    btnLimpiar.disabled = true;
    matri.value = '';
    equipo.value = '';
});

const vaciarAlumno = () => {
    Amatri.value = '';
    nombre.value = '';
    apellido.value = '';
    correo.value = '';
    carrera.value = '';
}

const vaciarEquipo = () => {
    id.value = '';
    marca.value = '';
    modelo.value = '';
    tipo.value = '';
}

const verifica = () => {
    if (Amatri.value != '' && id.value != '') {
        btnEnviar.disabled = false;
    } else {
        btnEnviar.disabled = true;
    }
}


function leerCodigoQR() {
    window.ipcRender.invoke('leerQR').then((result) => {
        const data = { equipo: result};
        window.ipcRender.invoke('getEquipoData', data).then((result) => {
            if (result !== null){
                console.log(result)
                id.value = result.id;
                marca.value = result.marca;
                modelo.value = result.modelo;
                tipo.value = result.tipo;
                verifica();
                if (btnLimpiar.disabled == true) {
                    btnLimpiar.disabled = false;
                }
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'No existe un equipo con este código',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }

        });
    })

}


// async function leerCodigoQR() {
//     try {
//         // Obtener el resultado de leerQR
//         const resultLeerQR = await window.ipcRender.invoke('leerQR');
//         // Verificar que resultLeerQR no sea null antes de continuar
//         if (resultLeerQR !== null) {
//             // Procesar el resultado de leerQR y obtener los datos necesarios
//             const data = { equipo: resultLeerQR };
//             console.log("Resultado QR: " + data.equipo)
//             window.ipcRender.invoke('getEquipoData', data).then((result) => {
//                 if (result !== null) {
//                     console.log(result)
//                     id.value = result.id;
//                     marca.value = result.marca;
//                     modelo.value = result.modelo;
//                     tipo.value = result.tipo;
//                     verifica();
//                     if (btnLimpiar.disabled == true) {
//                         btnLimpiar.disabled = false;
//                     }
//                 } else {
//                     Swal.fire({
//                         title: 'Error!',
//                         text: 'No existe un equipo con este código',
//                         icon: 'error',
//                         confirmButtonText: 'Ok'
//                     })
//                 }

//             });
//         } else {
//             Swal.fire({
//                 title: 'Error!',
//                 text: 'No se pudo leer el código QR',
//                 icon: 'error',
//                 confirmButtonText: 'Ok'
//             });
//         }
//     } catch (error) {
//         // Manejar errores de ambas invocaciones si es necesario
//         console.error(error);
//     }
// }