const mysql = require('mysql');

// Create DB Connection
const db = mysql.createConnection({
	port	 : '3306',
	host     : 'localhost',
    user     : 'root',
    password : '724274',
    database : 'matcha'
});

// Connect to DB
db.connect((err) => {
    if(err){
        console.log('Error: ', err);
    }
    console.log('MySql connected...')
})

module.exports = db;