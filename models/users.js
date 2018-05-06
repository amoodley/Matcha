const db = require('../database/db');

exports.insert = function(newUser){
    var sql = 'INSERT INTO `users` (id, username, password_hash, email, activated, state) VALUES(?)';
    var values = [newUser.id, newUser.username, newUser.password_hash, newUser.email, newUser.activated, newUser.state];
    var result = db.query(sql, [values]);

    return(result.data.rows.insertId);
}


return module.exports;