let menu = document.getElementById("subMenu");
let muestra = document.getElementById("muestra");
let botones = document.getElementById("botones")

// Variable para rastrear el estado del botón
let botonArriba = true;

function toggleMenu() {
    menu.classList.toggle("open-menu")
}

muestra.addEventListener("click", function () {
    botones.classList.toggle("open-menu")
    // Cambia el contenido del botón según el estado actual
    if (botonArriba) {
        muestra.innerHTML = "&#9650;"; // Flecha hacia abajo: U+25BC
    } else {
        muestra.innerHTML = "&#9660;"; // Flecha hacia arriba: U+25B2
    }

    // Invierte el estado del botón
    botonArriba = !botonArriba;
});


document.getElementById("btnConf").addEventListener("click", function () {
    window.ipcRender.send('openConf');
});