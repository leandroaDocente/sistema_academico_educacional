const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'db_gerenciamento_academico',
});

module.exports = connection;