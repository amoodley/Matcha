const syncSql = require('sync-sql');

// Query Function
exports.query = function(sql, values){

    // Set DB Credentials
    const host = {
        port	 : '3306',
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'matcha'
    };

    if (values != null) {
        var json = JSON.stringify(syncSql.mysql(host, sql, values));
        var result = JSON.parse(json);
    } else {
        var json = JSON.stringify(syncSql.mysql(host, sql));
        var result = JSON.parse(json);
    }

    return result;
}

return module.exports;
