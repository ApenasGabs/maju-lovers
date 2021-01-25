const mysql = require('mysql');
const pool = mysql.createPool({
    host     : 'mysql742.umbler.com',
    port     : '41890',
    user     : 'majulovers',
    password : '/6OUXeg8?L.+',
    database : 'majulovers'
});

pool.on('connection', function (connection) {
  connection.query('SET SESSION auto_increment_increment=1')
});

pool.on('enqueue', function () {
  console.log('Waiting for available connection slot');
});

pool.on('acquire', function (connection) {
  console.log('Connection %d acquired', connection.threadId);
});

pool.on('release', function (connection) {
  console.log('Connection %d released', connection.threadId);
});

module.exports = pool;