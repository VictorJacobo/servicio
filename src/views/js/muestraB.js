let muestra = document.getElementById("muestra");

muestra.addEventListener("click", function () {
    botones.classList.toggle("open-menu")
    // Cambia el contenido del botón según el estado actual
    if (botonArriba) {
        muestra.innerHTML = "&#9660;"; // Flecha hacia abajo: U+25BC
    } else {
        muestra.innerHTML = "&#9650;"; // Flecha hacia arriba: U+25B2
    }

    // Invierte el estado del botón
    botonArriba = !botonArriba;
});