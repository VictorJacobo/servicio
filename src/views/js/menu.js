let menu = document.getElementById("subMenu");
function toggleMenu(){
    menu.classList.toggle("open-menu")
}

document.getElementById("btnConf").addEventListener("click", function() {
    window.ipcRender.send('openConf');
});