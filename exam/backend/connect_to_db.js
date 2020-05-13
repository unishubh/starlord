require('dotenv').config() ;
const mysql = require('mysql') ;
const pool = mysql.createPool({
    connectionLimit : process.env.POOL_LIMIT ,
    host     : '127.0.0.1',
    user     : 'root',
    password : 'ldapmysql',
    port : 3306
});

module.exports = pool ;