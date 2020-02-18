// import mysql from 'mysql';

const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  // socketPath needs for MAMP, if u do not use it, just comment out
  // socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
  host: 'localhost',
  user: 'root',
  // make sure ur password is correct
   password: '',
  database: 'tourreview',
  multipleStatements: true
});

mysqlConnection.connect(err => {
  if (err) {
    console.log('failed connected', err);
  } else {
    console.log('connected');
  }
});

module.exports = mysqlConnection;
