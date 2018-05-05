const db = require('../database/Connection');

exports.getUsername = function(data, callback){
    var sql = "SELECT * FROM `users` WHERE id = ?";
    var values = [ data ];
    // console.log(values);
    db.query(sql, data, function(err, results){
        if (err) {
            console.log(err);
        }
        console.log(results[0].username);

        return callback(results[0].username);
    })
}

exports.query = function(data, callback){
    var sql = data;
    db.query(sql, function(err, results){
          if (err){ 
            console.log(err);
          }
          return callback(results);
  })
}

return module.exports;