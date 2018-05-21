const db = require('../database/db');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const ageCalculator = require('age-calculator');
let {AgeFromDateString, AgeFromDate} = require('age-calculator');

const users = require('./users');

exports.insertNewProfile = function(newProfile){
    var sql = 'INSERT INTO `profiles` (id, user_id, first_name, last_name, birthday, city, gender, preference, bio, interests, profileimg, latitude, longitude, img1, img2, img3, img4, fame) VALUES(?)';
    var values = [null, newProfile.userId, newProfile.firstName, newProfile.lastName, newProfile.birthday, newProfile.city, newProfile.gender, newProfile.preference, newProfile.bio, newProfile.interests, null, null, null, null, null, null, null, null];
    var result = db.query(sql, [values]);
    var sql = 'UPDATE `users` SET `state` = \'2\' WHERE id=\'' + newProfile.userId +'\'';
    var result = db.query(sql);
    return(result.data.rows.insertId);
}

exports.getProfileById = function(userId){
    var sql = 'SELECT * FROM `profiles` WHERE user_id=\'' + userId +'\'';
    var result = db.query(sql);

    return(result.data.rows[0]);
}

exports.updateProfile = function(user){
    var sql = 'UPDATE `profiles` SET `first_name` = \''+ user.firstName +'\', `last_name` = \''+ user.lastName +'\', `birthday` = \''+ user.birthday +'\', `city` = \''+ user.city +'\', `gender` = \''+ user.gender +'\', `preference` = \''+ user.preference +'\', `bio` = \''+ user.bio +'\', `interests` = \''+ user.interests +'\' WHERE id=\'' + user.userId +'\'';
    var result = db.query(sql);
    return(result.data.rows);
}

exports.updateLocation = function(user){
    var sql = 'UPDATE `profiles` SET `latitude` = \''+ user.latitude +'\', `longitude` = \''+ user.longitude +'\' WHERE id=\'' + user.userId +'\'';
    var result = db.query(sql);
    return(result.data.rows);
}

exports.searchProfiles = function(searchQuery){
    var sql = 'SELECT * FROM `profiles` WHERE gender=\''+ searchQuery.preference +'\' AND preference=\''+ searchQuery.gender +'\'';
    var searchResult = db.query(sql).data.rows;
    for(i in searchResult) {
        if (searchResult.hasOwnProperty(i)) {
            var user = users.getUserById(searchResult[i].user_id);
            var birthday = searchResult[i].birthday.substring(0, 10);
            searchResult[i].username = user.username;
            searchResult[i].age = new AgeFromDateString(birthday).age;
        }
    }
    return(searchResult);
    
}

exports.updateFameRating = function(userId){
    var currentFame = db.query('SELECT * FROM `profiles` WHERE user_id=\'' + userId +'\'').data.rows[0].fame;
    var newFame = currentFame + 1;
    var result = db.query('UPDATE `profiles` SET `fame` = \'' + newFame +'\' WHERE id=\'' + userId +'\'');

    return(result.data.rows[0]);
}

exports.addToProfileViews = function(userId, viewerId){
    var sql = 'INSERT INTO `profile_views` (id, user_id, viewer_id) VALUES(?)';
    var values = [null, userId, viewerId];
    var result = db.query(sql, [values]);

    return(result.data.rows.insertId);
}

exports.getViews = function(userId){
    var sql = 'SELECT * FROM `profile_views` WHERE user_id=\'' + userId +'\' ORDER BY id DESC';
    var result = db.query(sql).data.rows;
    var views = [];
    result.forEach(element => {
        var viewerProfile = this.getProfileById(element.viewer_id);
        var user = users.getUserById(viewerProfile.user_id);
        var birthday = viewerProfile.birthday.substring(0, 10);
        viewerProfile.username = user.username;
        viewerProfile.age = new AgeFromDateString(birthday).age;
        views.push(viewerProfile);
    })
    return views;
}

exports.addToLikes = function(userId, likerId){
    var sql = 'INSERT INTO `likes` (id, user_id, liker_id) VALUES(?)';
    var values = [null, userId, likerId];
    var result = db.query(sql, [values]);

    return(result.data.rows.insertId);
}

exports.getLikes = function(userId){
    var sql = 'SELECT * FROM `likes` WHERE user_id=\'' + userId +'\' ORDER BY id DESC';
    var result = db.query(sql).data.rows;
    var likes = [];
    result.forEach(element => {
        var likerProfile = this.getProfileById(element.liker_id);
        var user = users.getUserById(likerProfile.user_id);
        var birthday = likerProfile.birthday.substring(0, 10);
        likerProfile.username = user.username;
        likerProfile.age = new AgeFromDateString(birthday).age;
        likes.push(likerProfile);
    })
    return likes;
}

return module.exports;