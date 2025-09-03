const mysql = require('mysql2');

const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'db_gerenciamento_academico',
});

pool.connect((err) => {
    if (err) throw err;
    console.log("Conectado ao banco de dados MySql!")
})

module.exports = pool;