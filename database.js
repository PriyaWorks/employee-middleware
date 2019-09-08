const mysql = require("mysql2");

const mySqlConnection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'ma123',
    database: 'employeedb',
    multipleStatements: true
});
//to check connection
mySqlConnection.getConnection ((err) => {
    if(!err){
        console.log("connected");
    }
    else
    {
        console.log("not connected");
    }
});

module.exports = mySqlConnection;