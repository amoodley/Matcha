var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'matcha'
});

connection.connect();

connection.query('SELECT * FROM users', 
function(err, rows, fields) {
    if(!err)
        console.log('The solution is: ', rows);
    else
        console.log('Error while performing Query');
});

connection.end();