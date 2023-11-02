const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lab',
    port: '3307'
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