let page;

document.addEventListener('DOMContentLoaded', function () {
    page = new Page(window);
});

class Page {
    constructor() {
        this.attachEvents();
        this.loadDataUser();
    }

    get(id) {
        return document.querySelector(id);
    }

    attachEvents() {
        let btnLogout = this.get('#btnLogout');
        btnLogout.addEventListener('click', this.logout);
    }

    loadDataUser() {
        let profileUser1 = this.get('#profileUser1');
        let profileUser2 = this.get('#profileUser2');
        let profileName = this.get('#profileName');
        window.ipcRender.invoke('getUserData').then((result) => {
            const { user, img } = result;
            profileName.innerHTML = user;
            profileUser1.src = img;
            profileUser2.src = img;

        });
    }

    logout() {
        // Mostrar SweetAlert de confirmación
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Realmente desea cerrar sesión?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, continuar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            // Si el usuario hace clic en "Aceptar", ejecuta la función Envia
            if (result.isConfirmed) {
                window.ipcRender.send('logout');
            }
        });

    }
}