let btnLogin = document.querySelector('#btnLogin');
let error = document.querySelector('#text-error');
let usuario = document.querySelector('#username');
let password = document.querySelector('#contra');
// btnLogin.addEventListener('click', () => {
//     validateInputs();
// });

// const validateInputs = () => {
//     if (usuario.value == '') {
//         error.innerHTML = 'Ingresá tu nombre de usuario.';
//         error.classList.remove('text-muted');
//         error.classList.add('text-danger');
//     } else if (password.value == '') {
//         error.innerHTML = 'Ingresá tú contraseña.';
//         error.classList.remove('text-muted');
//         error.classList.add('text-danger');
//     }
// }

const formSubmit = (event) => {
    event.preventDefault();
    if (usuario.value == '') {
        error.innerHTML = 'Ingresá tu nombre de usuario.';
        error.classList.remove('text-muted');
        error.classList.add('text-danger');
    } else if (password.value == '') {
        error.innerHTML = 'Ingresá tú contraseña.';
        error.classList.remove('text-muted');
        error.classList.add('text-danger');
    } else {
        login();
    }
    return false;
}

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
