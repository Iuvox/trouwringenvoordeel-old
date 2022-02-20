const mysql = require("mysql");
const logger = require("./logging");

// Create a connection to the database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
});

// open the MySQL connection
connection.connect(error => {
    if (error) {
        console.log(error) 
        return
    };
    logger.debug("Successfully connected to the database.");
});

module.exports = connection;