const mysql = require('mysql');

// Create DB Connection
const db = mysql.createConnection({
	port	 : '3307',
	host     : 'localhost',
    user     : 'root',
    password : 'root',
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