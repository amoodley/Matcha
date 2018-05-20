const db = require('../database/db');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');

exports.isLoggedIn = function(req){
    
    if (req.cookies.MID != undefined) {
        var cookie_hash = crypto.createHash('sha1').update(req.cookies.MID).digest("hex");
        var result = db.query('SELECT user_id FROM `login_tokens` WHERE token=\'' + cookie_hash +'\'');
        
        if (result.data.rows[0] != undefined) {
            var userId = result.data.rows[0].user_id;

            if (req.cookies.MID_ != undefined) {
                return userId;
            } else {
                var token = crypto.randomBytes(64).toString('hex');
                var token_hash = crypto.createHash('sha1').update(token).digest("hex");
                var values = [ null, token_hash, userId ];
                db.query('INSERT INTO `login_tokens`(id, token, user_id) VALUES(?)', [values]);
                db.query('DELETE FROM `login_tokens` WHERE token=\'' + cookie_hash +'\'');
                // Set Cookie Options
                let options_1 = {
                    maxAge: 1000 * 60 * 60 * 24 * 7, // would expire after 7 days
                    httpOnly: true, // The cookie only accessible by the web server
                }
                let options_2 = {
                    maxAge: 1000 * 60 * 60 * 24 * 3, // would expire after 3 days
                    httpOnly: true, // The cookie only accessible by the web server
                }
                // Set cookie
                res.cookie('MID', token, options_1) // options is optional
                res.cookie('MID_', '1', options_2) // options is optional
                
                return userId;
            }
        }
    }

    return false;
}

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

exports.getUserByUsername = function(username){
    var sql = 'SELECT * FROM `users` WHERE username=\'' + username +'\'';
    var result = db.query(sql);

    return(result.data.rows[0]);
}

exports.activateAccount = function(userId){
    var sql = 'UPDATE `users` SET `activated` = \'1\' WHERE id=\'' + userId +'\'';
    var result = db.query(sql);

    return(result.data.rows[0]);
}

return module.exports;