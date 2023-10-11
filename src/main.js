const electronApp = require('electron').app;
const electronBrowserWindow = require('electron').BrowserWindow;
const electronIpcMain = require('electron').ipcMain;
const Store = require('electron-store');
const store = new Store();
const aux = new Store();
const path = require('path');
const db = require('./connection');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    // eslint-disable-line global-require
    electronApp.quit();
}

let window;
let loginWindow;

const createWindowDashboard = () => {
    // Create the browser window.
    window = new electronBrowserWindow({
        //icon: __dirname + '/assets/images/favicon.ico',
        width: 900,
        height: 600,
        //autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            //devTools: false,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // and load the index.html of the app.
    window.loadFile(path.join(__dirname, 'views/prestamo.html'));

    window.webContents.openDevTools();
};

const createWindow = () => {
    // Create the browser window.
    loginWindow = new electronBrowserWindow({
        //icon: __dirname + '/assets/images/favicon.ico',
        width: 500,
        height: 470,
        resizable: false,
        maximizable: false,
        //autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            //devTools: false,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // and load the index.html of the app.
    loginWindow.loadFile(path.join(__dirname, 'views/login.html'));
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

electronApp.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electronApp.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electronApp.quit();
    }
});

electronApp.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (electronBrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

electronIpcMain.on('login', (event, data) => {
    validateLogin(data);
});

function validateLogin(data) {
    const { usuario, password } = data;
    const sql = 'SELECT * FROM usuarios WHERE usuario=? AND contrasena=?';

    db.query(sql, [usuario, password], (error, results, fields) => {
        if (error) {
            console.log(error);
        }

        if (results.length > 0) {
            store.set('user', results[0].usuario);
            createWindowDashboard();
            window.maximize();
            window.show();
            loginWindow.close();
        }
    });
}

electronIpcMain.on('consulta', (event, data) => {
    const { matricula } = data;
    const sql = 'SELECT * FROM alumno WHERE Matricula_A=?';
    db.query(sql, [matricula], (error, results, fields) => {
        if (error) {
            console.log(error);
        }

        if (results.length > 0) {
            aux.set('matricula', results[0].Matricula_A);
            aux.set('nombre', results[0].Nombres);
            aux.set('apellido', results[0].Apellidos);
            aux.set('correo', results[0].Correo);
            aux.set('carrera', results[0].Carrera);
        } 
    });
});
electronIpcMain.handle('getDatos', (event) => {
    const data = { matricula:aux.get('matricula'), nombre:aux.get('nombre'), apellido:aux.get('apellido'), correo:aux.get('correo'), carrera:aux.get('carrera')};
    console.log(data.matricula)
    return data;
});