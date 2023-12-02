const AgregarAlumno = (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de manera convencional
    // Obtener valores de los campos
    const matr = document.querySelector('#nmatricula');
    const nomb = document.querySelector('#nnombres');
    const apel = document.querySelector('#napellidos');
    const email = document.querySelector('#ncorreo');
    const car = document.querySelector('#ncarrera');


    // Validar que los campos no estén vacíos
    if (!matr.value && !nomb.value && !apel.value && !email.value && !car.value) {
        Swal.fire({
            title: 'Advertencia',
            text: 'Por favor, completa todos los campos',
            icon: 'warning',
            confirmButtonText: 'Ok'
        });
        return; // Detener la ejecución si hay campos vacíos     
    }else {
        if (!matr.value) {
            Swal.fire({
                title: 'Advertencia',
                text: 'Campo obligatorio*',
                icon: 'warning',
                confirmButtonText: 'Ok'
            });
            return; // Detener la ejecución si hay campos vacíos        
        }else {
            if (!nomb.value) {
                Swal.fire({
                    title: 'Advertencia',
                    text: 'Campo obligatorio*',
                    icon: 'warning',
                    confirmButtonText: 'Ok'
                });
                return; // Detener la ejecución si hay campos vacíos        
            }else {
                if (!apel.value) {
                    Swal.fire({
                        title: 'Advertencia',
                        text: 'Campo obligatorio*',
                        icon: 'warning',
                        confirmButtonText: 'Ok'
                    });
                    return; // Detener la ejecución si hay campos vacíos        
                }else {
                    if (!email.value) {
                        Swal.fire({
                            title: 'Advertencia',
                            text: 'Campo obligatorio*',
                            icon: 'warning',
                            confirmButtonText: 'Ok'
                        });
                        return; // Detener la ejecución si hay campos vacíos        
                    }else {
                        if (!car.value) {
                            Swal.fire({
                                title: 'Advertencia',
                                text: 'Campo obligatorio*',
                                icon: 'warning',
                                confirmButtonText: 'Ok'
                            });
                            return; // Detener la ejecución si hay campos vacíos        
                        }
                    }
                }
            }
        }
    }


    // Validar la matrícula con la expresión regular
    if (/^\d{9}$/.test(matr.value)) {
        // Matrícula válida, continuar
    } else {
        // Matrícula no válida, mostrar mensaje de error
        Swal.fire({
            title: 'Advertencia',
            text: 'Matricula no valida',
            icon: 'warning',
            confirmButtonText: 'Ok'
        });
        return;
    }

    // Crear el objeto data
    const data = { matricula:matr.value, nombres:nomb.value, apellidos:apel.value, correo:email.value, carrera:car.value };
    console.log(data);
    window.ipcRender.invoke('registraAlumno', data).then((result) => {
        if (result == true) {
            Swal.fire({
                title: 'Exito',
                text: 'El alumno se ha registrado exitosamente',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then(() => {
                // Recarga la página después de cerrar la alerta de éxito
                location.reload();
                return false;
            });
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'El Alumno no se ha podido registrar',
                icon: 'error',
                confirmButtonText: 'Ok'
            }).then(() => {
                return false;
            })
        }
    });
};

document.getElementById("back").addEventListener("click", function () {
    window.ipcRender.send('openlogin1');
});