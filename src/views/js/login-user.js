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
        let profileUser = this.get('#profileUser');
        let profileName = this.get('#profileName');
        window.ipcRender.invoke('getUserData').then((result) => {
            const { user, img} = result;
            profileName.innerHTML = user;
            profileUser.src = img;
            
        });
    }

    logout() {
        window.ipcRender.send('logout', 'confirm-logout');
    }
}