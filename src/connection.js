const fs = require('fs');
const path = require('path');

const configFilePath = path.join(__dirname, 'configuracion.json'); // Ruta al archivo JSON

let configData;

try {
  const data = fs.readFileSync(configFilePath, 'utf-8');
  configData = JSON.parse(data);
} catch (error) {
  console.error('Error al leer el archivo de configuración:', error);
  process.exit(1); // Puedes manejar el error de acuerdo a tus necesidades
}

const dbIP = configData.Ipserver;

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: dbIP,
    user: 'root',
    password: '',
    database: 'lab',
    port: '3306'
});

connection.connect(function (err) {
    if (err) {
        console.log(err.code);
        console.log(err.fatal);
        return;
    } else {
        console.log('Conexion exitosa.');
    }
});

module.exports = connection;