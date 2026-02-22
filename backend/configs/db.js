const mysql = require('mysql2');

const db = mysql.createConnection({
   host: 'mysql-service',   // IMPORTANT
   port: '3306',
   user: 'root',
   password: 'root123',
   database: 'react_node_app'
});

module.exports = db;
