const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'sathya123',
  database: 'librarydb'
});


const promisePool = pool.promise();

module.exports = promisePool;
