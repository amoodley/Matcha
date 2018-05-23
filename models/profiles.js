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
	var isLiked = db.query('SELECT * FROM `likes` WHERE user_id=\'' + userId +'\' AND liker_id=\'' + likerId +'\'').data.rows[0];
    if (!isLiked) {
        var sql = 'INSERT INTO `likes` (id, user_id, liker_id) VALUES(?)';
        var values = [null, userId, likerId];
        var result = db.query(sql, [values]);
        return('liked');
    } else {
        var sql = 'DELETE FROM `likes` WHERE id=\'' + isLiked.id +'\'';
        var result = db.query(sql);
        return('unliked');
    }
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

exports.getSuggestions = function(userId){
    var user = users.getUserById(userId);
    var profile = this.getProfileById(userId);
    var birthday = profile.birthday.substring(0, 10);
    var age = new AgeFromDateString(birthday).age;
    var ageMax = age + 5;
    var ageMin = (age / 2) + 7;
    console.log('Min: ' + ageMin + '; Max: ' + ageMax);
    console.log(profile.preference);
    console.log(profile.gender);
    if (ageMin < 18){
        ageMin = 18;
    }
    var sql = 'SELECT * FROM `profiles` WHERE gender=\''+ profile.preference +'\' AND preference=\''+ profile.gender +'\'';
    var result = db.query(sql).data.rows;
    var suggestions = [];
    result.forEach(element => {
        var suggestionProfile = this.getProfileById(element.user_id);
        var suggestionUser = users.getUserById(element.user_id);
        var suggestionBirthday = suggestionProfile.birthday.substring(0, 10);
        suggestionProfile.username = suggestionUser.username;
        suggestionProfile.age = new AgeFromDateString(suggestionBirthday).age;
        if (suggestionProfile.age > ageMin && suggestionProfile.age < ageMax) {
            suggestions.push(suggestionProfile);
        }
    })
    return suggestions;
}

return module.exports;