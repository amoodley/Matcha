const syncSql = require('sync-sql');

// Create DB Connection
const host = {
	port	 : '3306',
	host     : 'localhost',
    user     : 'root',
    password : '724274',
    database : 'matcha'
};

module.exports.query = function(sql){
    var json = JSON.stringify(syncSql.mysql(this.host, sql));
    var result = JSON.parse(json);

    return result;
}
