const AgregarAlumno = (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de manera convencional
    // Obtener valores de los campos
    const matr = document.querySelector('#nmatricula');
    const nomb = document.querySelector('#nnombres');
    const apel = document.querySelector('#napellidos');
    const email = document.querySelector('#ncorreo');
    const car = document.querySelector('#ncarrera');


    // Validar que los campos no estén vacíos
    if (!matr.value || !nomb.value || !apel.value || !email.value || !car.value) {
        Swal.fire({
            title: 'Error!',
            text: 'Por favor, completa todos los campos',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
        return; // Detener la ejecución si hay campos vacíos
    }

    // Crear el objeto data
    const data = { matricula:matr.value, nombres:nomb.value, apellidos:apel.value, correo:email.value, carrera:car.value };
    console.log(data);
    window.ipcRender.invoke('registraAlumno', data).then((result) => {
        if (result == true) {
            Swal.fire({
                title: 'Exito',
                text: 'El equipo se ha registrado exitosamente',
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
                text: 'El equipo no se ha podido registrar',
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