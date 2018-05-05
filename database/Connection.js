const syncSql = require('sync-sql');

// Create DB Connection
const db = syncSql({
	port	 : '3306',
	host     : 'localhost',
    user     : 'root',
    password : '724274',
    database : 'matcha'
});

module.exports = db;