const electronApp = require('electron').app;
const electronBrowserWindow = require('electron').BrowserWindow;
const electronIpcMain = require('electron').ipcMain;
const Store = require('electron-store');
const store = new Store();
let aux = new Store();
const path = require('path');
const db = require('./connection');
const fs = require('fs');
const { spawn } = require('child_process');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    // eslint-disable-line global-require
    electronApp.quit();
}

let window;
let loginWindow;
let ConfiWindow;
let userWindow;

const createWindowDashboard = () => {
    // Create the browser window.
    window = new electronBrowserWindow({
        //icon: __dirname + '/assets/images/favicon.ico',
        width: 900,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            //devTools: false,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // and load the index.html of the app.
    window.loadFile(path.join(__dirname, 'views/prestamo.html'));
};

const createUsuarios = () => {
    // Create the browser window.
    window = new electronBrowserWindow({
        //icon: __dirname + '/assets/images/favicon.ico',
        width: 800,
        height: 500,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            //devTools: false,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // and load the index.html of the app.
    window.loadFile(path.join(__dirname, 'views/usuarios.html'));

};

const registra = () => {
    // Create the browser window.
    window = new electronBrowserWindow({
        //icon: __dirname + '/assets/images/favicon.ico',
        width: 800,
        height: 500,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            //devTools: false,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // and load the index.html of the app.
    window.loadFile(path.join(__dirname, 'views/registro.html'));

};

const createWindow = () => {
    // Create the browser window.
    loginWindow = new electronBrowserWindow({
        //icon: __dirname + '/assets/images/favicon.ico',
        width: 500,
        height: 470,
        resizable: false,
        maximizable: false,
        autoHideMenuBar: true,
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

const createConf = () => {
    // Create the browser window.
    ConfiWindow = new electronBrowserWindow({
        //icon: __dirname + '/assets/images/favicon.ico',
        width: 500,
        height: 470,
        resizable: false,
        maximizable: false,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            //devTools: false,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // and load the index.html of the app.
    ConfiWindow.loadFile(path.join(__dirname, 'views/configuracion.html'));
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
    const sql = 'SELECT * FROM aministradores WHERE Matricula_Admin=? AND Contraseña=?';

    db.query(sql, [usuario, password], (error, results, fields) => {
        if (error) {
            console.log(error);
        }

        if (results.length > 0) {
            store.set('user', results[0].Nombres);
            store.set('matricula', results[0].Matricula_Admin);
            store.set('img', './../assets/images/user.png')
            console.log(store.get('user'));
            console.log(store.get('matricula'));
            createWindowDashboard();
            window.maximize();
            window.show();
            loginWindow.close();
        }
    });
}
electronIpcMain.on('configuracion', (event, data) => {
    //const { ipserver, ipcamara, puertolec } = data;
    // Ruta del archivo JSON
    console.log(data)
    const rutaArchivo = './src/configuracion.json';

    // Convertir los datos a formato JSON
    const datosJSON = JSON.stringify(data);

    // Escribir los datos en el archivo JSON
    fs.writeFile(rutaArchivo, datosJSON, 'utf-8', (err) => {
        if (err) {
            console.error('Error al escribir en el archivo JSON:', err);
        } else {
            console.log('Datos guardados correctamente en el archivo JSON.');
        }
    });

});

electronIpcMain.on('openConf', (event) => {
    createConf();
    //ConfiWindow.show();
});

electronIpcMain.on('openUsers', (event) => {
    createUsuarios();
    //userWindow.show();
});

electronIpcMain.on('openRegistra', (event) => {
    registra();
    console.log("Abrir registra")
    //userWindow.show();
});

//Apartado donde se consulta la informacion de un alumno en base a su matricula
electronIpcMain.handle('getDatos', async (event, data) => {
    const { matricula } = data;
    const sql = 'SELECT * FROM alumnos WHERE Matricula_A=?';

    try {
        const results = await queryAsync(sql, [matricula]);

        if (results.length > 0) {
            const aux = {
                matricula: results[0].Matricula_A,
                nombre: results[0].Nombres,
                apellido: results[0].Apellidos,
                correo: results[0].Correo,
                carrera: results[0].Carrera,
                lista: results[0].lista
            };
            return aux;
        } else {
            // Puedes manejar el caso en que no se encuentren resultados.
            console.log("No se encontraron resultados.");
            return null;
        }
    } catch (error) {
        // Manejar errores de consulta.
        console.error(error);
        return null;
    }
});


//Aparto donde se consulta informacion d eun equipo
electronIpcMain.handle('getEquipoData', async (event, data) => {
    const sql = 'SELECT * FROM equipo WHERE idEquipo=?';

    try {
        const results = await queryAsync(sql, [data]);
        if (results.length > 0) {
            const auxE = {
                id: results[0].idEquipo,
                marca: results[0].Marca,
                modelo: results[0].Modelo,
                tipo: results[0].Tipo,
                serie: results[0].N_serie
            };
            return auxE;
        } else {
            // Puedes manejar el caso en que no se encuentren resultados.
            console.log("No se encontraron resultados.");
            console.log(results.length)
            return null;
        }
    } catch (error) {
        // Manejar errores de consulta.
        console.error(error);
        return null;
    }
});


//Aparto donde se consulta informacion d eun equipo
electronIpcMain.handle('registraPrestamo', async (event, data) => {
    const { Amatricula, equipo, fecha } = data;
    const sql = 'INSERT INTO prestamos (Matricula_A, Matricula_Admin, idEquipo, Fecha_P) VALUES (?, ?, ?, ?)';

    try {
        await queryAsync(sql, [Amatricula, store.get('matricula'), equipo, fecha]);
        console.log("Registro exitoso");
        return true;
    } catch (error) {
        console.error("Error al registrar:", error);
        return false;
    }
});
electronIpcMain.handle('getConfiguracion', (event) => {

    const configFilePath = path.join(__dirname, 'configuracion.json'); // Ruta al archivo JSON

    let configData;

    try {
        const data = fs.readFileSync(configFilePath, 'utf-8');
        configData = JSON.parse(data);
    } catch (error) {
        console.error('Error al leer el archivo de configuración:', error);
        process.exit(1); // Puedes manejar el error de acuerdo a tus necesidades
    }

    return configData;
});

electronIpcMain.handle('leerQR', (event) => {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', ['./src/QR.py']);
        console.log("Hola, entré a leer QR");

        pythonProcess.stdout.on('data', (data) => {
            // Procesar los datos que devuelve el proceso Python
            const codigoQR = data.toString().trim();

            // Resolver la promesa con el código QR
            resolve(codigoQR);
        });

        pythonProcess.stderr.on('data', (data) => {
            // Manejar errores si los hay
            console.error(data.toString());

            // Rechazar la promesa en caso de error
            reject(data.toString());
        });
    });
});

// Función que envuelve la consulta a la base de datos en una promesa.
function queryAsync(sql, values) {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (error, results, fields) => {

            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

//Obtener informacion del usuario
electronIpcMain.handle('getUserData', (event) => {
    const data = { user: store.get('user'), img: store.get('img') };
    return data;
});




//Aparto donde se obtiene toda la informacion del equipo
electronIpcMain.handle('getTablaEquipo', async (event) => {
    const sql = 'SELECT * FROM equipo';

    try {
        const results = await queryAsync(sql);
        console.log("Tamano de los resultados: "+results.length);
        if (results.length > 0) {
            console.log(results)
            return results;
        } else {
            // Puedes manejar el caso en que no se encuentren resultados.
            console.log("No se encontraron resultados.");
            console.log(results.length)
            return null;
        }
    } catch (error) {
        // Manejar errores de consulta.
        console.error(error);
        return null;
    }
});


electronIpcMain.handle('getTablaUsuario', async (event) => {
    const sql = 'SELECT * FROM alumnos';

    try {
        const results = await queryAsync(sql);
        console.log("Tamano de los resultados: "+results.length);
        if (results.length > 0) {
            console.log(results)
            return results;
        } else {
            // Puedes manejar el caso en que no se encuentren resultados.
            console.log("No se encontraron resultados.");
            console.log(results.length)
            return null;
        }
    } catch (error) {
        // Manejar errores de consulta.
        console.error(error);
        return null;
    }
});
electronIpcMain.handle('getTablaAlumnos', async (event) => {
    const sql = 'SELECT * FROM alumnos';

    try {
        const results = await queryAsync(sql);
        console.log("Tamano de los resultados: "+results.length);
        if (results.length > 0) {
            console.log(results)
            return results;
        } else {
            // Puedes manejar el caso en que no se encuentren resultados.
            console.log("No se encontraron resultados.");
            console.log(results.length)
            return null;
        }
    } catch (error) {
        // Manejar errores de consulta.
        console.error(error);
        return null;
    }
});

electronIpcMain.handle('getTablaPrestamos', async (event) => {
    const sql = 'SELECT * FROM prestamos WHERE Fecha_D IS NULL';

    try {
        const results = await queryAsync(sql);
        console.log("Tamano de los resultados: "+results.length);
        if (results.length > 0) {
            console.log(results)
            return results;
        } else {
            // Puedes manejar el caso en que no se encuentren resultados.
            console.log("No se encontraron resultados.");
            console.log(results.length)
            return null;
        }
    } catch (error) {
        // Manejar errores de consulta.
        console.error(error);
        return null;
    }
});

electronIpcMain.handle('getTablaPrestamosDevueltos', async (event) => {
    const sql = 'SELECT * FROM prestamos WHERE Fecha_D IS NOT NULL';

    try {
        const results = await queryAsync(sql);
        console.log("Tamano de los resultados: "+results.length);
        if (results.length > 0) {
            console.log(results)
            return results;
        } else {
            // Puedes manejar el caso en que no se encuentren resultados.
            console.log("No se encontraron resultados.");
            console.log(results.length)
            return null;
        }
    } catch (error) {
        // Manejar errores de consulta.
        console.error(error);
        return null;
    }
});




electronIpcMain.handle('getTablaAlumnosLista', async (event) => {
    const sql = 'SELECT * FROM alumnos WHERE lista = 1';

    try {
        const results = await queryAsync(sql);
        console.log("Tamano de los resultados: "+results.length);
        if (results.length > 0) {
            console.log(results)
            return results;
        } else {
            // Puedes manejar el caso en que no se encuentren resultados.
            console.log("No se encontraron resultados.");
            console.log(results.length)
            return null;
        }
    } catch (error) {
        // Manejar errores de consulta.
        console.error(error);
        return null;
    }
});

//Aparto donde se consulta informacion d eun equipo
electronIpcMain.handle('registraEquipo', async (event, data) => {
    const sql = 'INSERT INTO equipo (idEquipo, Marca, Modelo,N_serie,Tipo) VALUES (?, ?, ?, ?, ?)';

    try {
        await queryAsync(sql, [data.idEquipo, data.marca, data.modelo, data.nSerie, data.tipo]);
        console.log("Registro equipo exitoso");
        return true;
    } catch (error) {
        console.error("Error al registrar:", error);
        return false;
    }
});

electronIpcMain.handle('eliminaEquipo', async (event,data) =>{
    const sql = 'DELETE FROM equipo WHERE idEquipo=?'
    try {
        await queryAsync(sql, [data]);
        console.log("Eliminar equipo exitoso");
        return true;
    } catch (error) {
        console.error("Error al eliminar equipo:", error);
        return false;
    }
});

//Apartado donde se edita un equipo
electronIpcMain.handle('editaEquipoData', async (event, data) => {
    const sql = 'UPDATE equipo SET idEquipo = ?, Marca = ?, Modelo = ?, N_serie = ?, Tipo = ? WHERE idEquipo = ?;';
    try {
        await queryAsync(sql, [data.idEquipo, data.marca, data.modelo, data.nSerie, data.tipo, data.id]);
        console.log("Editar equipo exitoso");
        return true;
    } catch (error) {
        console.error("Error al editar equipo:", error);
        return false;
    }
});

electronIpcMain.handle('devolverEquipo', async (event,data) =>{
    fecha= new Date().toISOString()
    const sql = 'UPDATE prestamos SET Fecha_D =?  WHERE idPrestamos =?'
    try {
        await queryAsync(sql, [fecha,data]);
        console.log("Devolver equipo exitoso");
        return true;
    } catch (error) {
        console.error("Error al devolver equipo:", error);
        return false;
    }
});
electronIpcMain.handle('eliminaHistorialPrestamo', async (event,data) =>{
    const sql = 'DELETE FROM prestamos WHERE idPrestamos=?'
    try {
        await queryAsync(sql, [data]);
        console.log("Eliminar historial del prestamo exitoso");
        return true;
    } catch (error) {
        console.error("Error al eliminar historial del prestamo equipo:", error);
        return false;
    }
});

electronIpcMain.handle('listaNegra', async (event,data) =>{
    fecha= new Date().toISOString()
    const sql = 'UPDATE alumnos SET lista = 1  WHERE Matricula_A =?'
    try {
        await queryAsync(sql, [data]);
        console.log("Devolver equipo exitoso");
        return true;
    } catch (error) {
        console.error("Error al devolver equipo:", error);
        return false;
    }
});

electronIpcMain.handle('quitarlistaNegra', async (event,data) =>{
    fecha= new Date().toISOString()
    const sql = 'UPDATE alumnos SET lista = 0  WHERE Matricula_A =?'
    try {
        await queryAsync(sql, [data]);
        console.log("Devolver equipo exitoso");
        return true;
    } catch (error) {
        console.error("Error al devolver equipo:", error);
        return false;
    }
});


electronIpcMain.on('logout', (event) => {
    store.delete('user');
    store.delete('matricula');
    store.delete('img');
    createWindow();
    loginWindow.show();
    window.close();
});

