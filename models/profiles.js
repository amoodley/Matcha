const db = require('../database/db');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');

exports.insert = function(newUser){
    var sql = 'INSERT INTO `users` (id, username, password_hash, email, activated, state) VALUES(?)';
    var values = [newUser.id, newUser.username, newUser.password_hash, newUser.email, newUser.activated, newUser.state];
    var result = db.query(sql, [values]);

    return(result.data.rows.insertId);
}

exports.getUserById = function(userId){
    var sql = 'SELECT * FROM `users` WHERE id=\'' + userId +'\'';
    var result = db.query(sql);

    return(result.data.rows[0]);
}

exports.activateAccount = function(userId){
    var sql = 'UPDATE `users` SET `activated` = \'1\' WHERE id=\'' + userId +'\'';
    var result = db.query(sql);

    return(result.data.rows[0]);
}


return module.exports;