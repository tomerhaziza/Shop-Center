const mysql = require("mysql2");
require('dotenv').config();

// Connection to server DB
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});

// Ping database to check for common exception errors.
pool.getConnection((err, connection) => {
    if (err) {
        return console.log("Failed to create connection + " + err);
    }
    if (connection) {
        connection.release();
        return console.log("We're connected to MySQL");
    }
})

function execute(sql) {
    return new Promise((resolve, reject) => {
        pool.query(sql, function (err, results, fields) {
            if (err) {
                console.log("Failed interacting with DB, calling reject");
                console.log("Error " + err);
                reject(err);
                return;
            }
            resolve(results);
        });
    });
}

function executeWithParameters(sql, parameters) {
    return new Promise((resolve, reject) => {
        pool.query(sql, parameters, (err, result, fields) => {
            if (err) {
                console.log("Failed interacting with DB, calling reject");
                console.log("Error " + err);
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

module.exports = {
    execute,
    executeWithParameters
};