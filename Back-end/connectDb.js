const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'db_gerenciamento_academico',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao banco de dados do Mysql');
});

module.exports = connection;