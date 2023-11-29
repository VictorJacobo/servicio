let btnLogin = document.querySelector('#btnLogin');
let error = document.querySelector('#text-error');
let usuario = document.querySelector('#username');
let password = document.querySelector('#contra');

//Ojo que muestra y oculta contraseña
let openEye =  document.querySelector('#eye');
let visible = false;


const formSubmit = (event) => {
    event.preventDefault();
    if (usuario.value == '') {
        error.innerHTML = 'Ingresa tu nombre de usuario.';
        error.classList.remove('text-muted');
        error.classList.add('text-danger');
    } else if (password.value == '') {
        error.innerHTML = 'Ingresa tu contraseña.';
        error.classList.remove('text-muted');
        error.classList.add('text-danger');
    } else {
        login();
    }
    return false;
}

//Este es el login
const login = () => {
    if (!(usuario.value == '' && password.value == '')) {
        const data = { usuario: usuario.value, password: password.value };
        window.ipcRender.send('login', data);

        setTimeout(errorLogin, 300);
    }
}

const errorLogin = () => {
    error.innerHTML = 'Usuario o contraseña invalidos';
    error.classList.remove('text-muted');
    error.classList.add('text-danger');

    usuario.value = '';
    password.value = '';
    usuario.focus();
}

// Función para alternar la visibilidad de la contraseña
function VerPass() {
    // Cambia la visibilidad de la contraseña
    if (visible) {
        password.type = 'password';
        visible = false;
        // Cambia la imagen del ojo a cerrado
        openEye.src = "./../assets/images/eye.svg";
    } else {
        password.type = 'text';
        visible = true;
        // Cambia la imagen del ojo a abierto
        openEye.src = "./../assets/images/eye-slash.svg"; // Reemplaza con la ruta correcta de la imagen abierta
    }
}

document.getElementById("btnRegistra").addEventListener("click", function () {
    window.ipcRender.send('openRegistra');
});

