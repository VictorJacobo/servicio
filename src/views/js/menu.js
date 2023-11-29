let menu = document.getElementById("subMenu");
let botones = document.getElementById("botones")

// Variable para rastrear el estado del botón
let botonArriba = true;

function toggleMenu() {
    menu.classList.toggle("open-menu")
}

document.getElementById("btnConf").addEventListener("click", function () {
    window.ipcRender.send('openConf');
});

document.getElementById("btnUsuarios").addEventListener("click", function () {
    window.location.href = "./usuarios.html";
});