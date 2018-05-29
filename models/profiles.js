const db = require('../database/db');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const ageCalculator = require('age-calculator');
const geolib = require('geolib');
let { AgeFromDateString, AgeFromDate } = require('age-calculator');

const users = require('./users');

exports.insertNewProfile = function (newProfile) {
    var sql = 'INSERT INTO `profiles` (id, user_id, first_name, last_name, birthday, city, gender, preference, bio, interests, profileimg, latitude, longitude, img1, img2, img3, img4, fame) VALUES(?)';
    var values = [null, newProfile.userId, newProfile.firstName, newProfile.lastName, newProfile.birthday, newProfile.city, newProfile.gender, newProfile.preference, newProfile.bio, newProfile.interests, null, null, null, null, null, null, null, null];
    var result = db.query(sql, [values]);
    var sql = 'UPDATE `users` SET `state` = \'2\' WHERE id=\'' + newProfile.userId + '\'';
    var result = db.query(sql);
    return (result.data.rows.insertId);
}

exports.getProfileById = function (userId) {
    var sql = 'SELECT * FROM `profiles` WHERE user_id=\'' + userId + '\'';
    var result = db.query(sql);

    return (result.data.rows[0]);
}

exports.updateProfile = function (user) {
    var sql = 'UPDATE `profiles` SET `first_name` = \'' + user.firstName + '\', `last_name` = \'' + user.lastName + '\', `birthday` = \'' + user.birthday + '\', `city` = \'' + user.city + '\', `gender` = \'' + user.gender + '\', `preference` = \'' + user.preference + '\', `bio` = \'' + user.bio + '\', `interests` = \'' + user.interests + '\' WHERE id=\'' + user.userId + '\'';
    var result = db.query(sql);
    return (result.data.rows);
}

exports.updateLocation = function (user) {
    var sql = 'UPDATE `profiles` SET `latitude` = \'' + user.latitude + '\', `longitude` = \'' + user.longitude + '\' WHERE id=\'' + user.userId + '\'';
    var result = db.query(sql);
    return (result.data.rows);
}

exports.searchProfiles = function (searchQuery) {
    var profile = this.getProfileById(searchQuery.userId);
    var sql = 'SELECT * FROM `profiles` WHERE gender=\'' + searchQuery.preference + '\' AND preference=\'' + searchQuery.gender + '\'';
    var searchResult = db.query(sql).data.rows;
    for (var i = searchResult.length - 1; i >= 0; i--) {
        if (searchResult.hasOwnProperty(i)) {
            var birthday = searchResult[i].birthday.substring(0, 10);
            var age = new AgeFromDateString(birthday).age;
            if (age >= searchQuery.fromAge && age <= searchQuery.toAge) {
                var distance = geolib.getDistance(
                    { lat: profile.latitude, lng: profile.longitude },
                    { lat: searchResult[i].latitude, lng: searchResult[i].longitude }
                );
                distance = distance / 1000;
                distance = parseInt(distance);
                if (distance <= searchQuery.distance) {
                    var user = users.getUserById(searchResult[i].user_id);
                    searchResult[i].username = user.username;
                    searchResult[i].age = age;
                    searchResult[i].distance = distance;
                    var userTags = profile.interests.split(" ");
                    var profileTags = searchResult[i].interests.split(" ");
                    var commonTags = [];
                    for (var j = 0; j < userTags.length; j++) {
                        for (var k = 0; k < profileTags.length; k++) {
                            if (userTags[j] == profileTags[k]) {
                                commonTags.push(userTags[j]);
                            }
                        }
                    }
                    searchResult[i].commonTags = commonTags;
                } else {
                    searchResult.splice(i, 1);
                }
            } else {
                searchResult.splice(i, 1);
            }
        }
    }
    return (searchResult);

}

exports.updateFameRating = function (userId) {
    var currentFame = db.query('SELECT * FROM `profiles` WHERE user_id=\'' + userId + '\'').data.rows[0].fame;
    var newFame = currentFame + 1;
    var result = db.query('UPDATE `profiles` SET `fame` = \'' + newFame + '\' WHERE id=\'' + userId + '\'');

    return (result.data.rows[0]);
}

exports.addToProfileViews = function (userId, viewerId) {
    var sql = 'INSERT INTO `profile_views` (id, user_id, viewer_id) VALUES(?)';
    var values = [null, userId, viewerId];
    var result = db.query(sql, [values]);

    return (result.data.rows.insertId);
}

exports.getViews = function (userId) {
    var sql = 'SELECT * FROM `profile_views` WHERE user_id=\'' + userId + '\' ORDER BY id DESC';
    var profile = this.getProfileById(userId);
    var result = db.query(sql).data.rows;
    var views = [];
    result.forEach(element => {
        var viewerProfile = this.getProfileById(element.viewer_id);
        var user = users.getUserById(viewerProfile.user_id);
        var birthday = viewerProfile.birthday.substring(0, 10);
        viewerProfile.username = user.username;
        viewerProfile.age = new AgeFromDateString(birthday).age;
        var distance = geolib.getDistance(
            { lat: profile.latitude, lng: profile.longitude },
            { lat: viewerProfile.latitude, lng: viewerProfile.longitude }
        );
        distance = distance / 1000;
        distance = parseInt(distance);
        viewerProfile.distance = distance;
        var userTags = profile.interests.split(" ");
        var profileTags = viewerProfile.interests.split(" ");
        var commonTags = [];
        for (var j = 0; j < userTags.length; j++) {
            for (var k = 0; k < profileTags.length; k++) {
                if (userTags[j] == profileTags[k]) {
                    commonTags.push(userTags[j]);
                }
            }
        }
        viewerProfile.commonTags = commonTags;
        views.push(viewerProfile);
    })
    return views;
}

exports.getMatches = function (userId) {
    var sql = 'SELECT * FROM `likes` WHERE user_id=\'' + userId + '\' ORDER BY id DESC';
    var profile = this.getProfileById(userId);
    var result = db.query(sql).data.rows;
    var matches = [];
    result.forEach(element => {
        var matchProfile = this.getProfileById(element.liker_id);
        var user = users.getUserById(matchProfile.user_id);
        var birthday = matchProfile.birthday.substring(0, 10);
        matchProfile.username = user.username;
        matchProfile.age = new AgeFromDateString(birthday).age;
        var distance = geolib.getDistance(
            { lat: profile.latitude, lng: profile.longitude },
            { lat: matchProfile.latitude, lng: matchProfile.longitude }
        );
        distance = distance / 1000;
        distance = parseInt(distance);
        matchProfile.distance = distance;
        var userTags = profile.interests.split(" ");
        var profileTags = matchProfile.interests.split(" ");
        var commonTags = [];
        for (var j = 0; j < userTags.length; j++) {
            for (var k = 0; k < profileTags.length; k++) {
                if (userTags[j] == profileTags[k]) {
                    commonTags.push(userTags[j]);
                }
            }
        }
        matchProfile.commonTags = commonTags;
        var sql = 'SELECT * FROM `likes` WHERE liker_id=\'' + userId + '\' AND user_id=\'' + user.id + '\'';
        var result = db.query(sql).data.rows;
        if (result[0] != undefined) {
            matches.push(matchProfile);
        }
    })
    return matches;
}

exports.addToLikes = function (userId, likerId) {
    var isLiked = db.query('SELECT * FROM `likes` WHERE user_id=\'' + userId + '\' AND liker_id=\'' + likerId + '\'').data.rows[0];
    if (!isLiked) {
        var sql = 'INSERT INTO `likes` (id, user_id, liker_id) VALUES(?)';
        var values = [null, userId, likerId];
        var result = db.query(sql, [values]);
        return ('liked');
    } else {
        var sql = 'DELETE FROM `likes` WHERE id=\'' + isLiked.id + '\'';
        var result = db.query(sql);
        return ('unliked');
    }
}

exports.getLikes = function (userId) {
    var sql = 'SELECT * FROM `likes` WHERE user_id=\'' + userId + '\' ORDER BY id DESC';
    var profile = this.getProfileById(userId);
    var result = db.query(sql).data.rows;
    var likes = [];
    result.forEach(element => {
        var likerProfile = this.getProfileById(element.liker_id);
        var user = users.getUserById(likerProfile.user_id);
        var birthday = likerProfile.birthday.substring(0, 10);
        likerProfile.username = user.username;
        likerProfile.age = new AgeFromDateString(birthday).age;
        var distance = geolib.getDistance(
            { lat: profile.latitude, lng: profile.longitude },
            { lat: likerProfile.latitude, lng: likerProfile.longitude }
        );
        distance = distance / 1000;
        distance = parseInt(distance);
        likerProfile.distance = distance;
        var userTags = profile.interests.split(" ");
        var profileTags = likerProfile.interests.split(" ");
        var commonTags = [];
        for (var j = 0; j < userTags.length; j++) {
            for (var k = 0; k < profileTags.length; k++) {
                if (userTags[j] == profileTags[k]) {
                    commonTags.push(userTags[j]);
                }
            }
        }
        likerProfile.commonTags = commonTags;
        likes.push(likerProfile);
    })
    return likes;
}

exports.getSuggestions = function (userId) {
    var user = users.getUserById(userId);
    var profile = this.getProfileById(userId);
    var birthday = profile.birthday.substring(0, 10);
    var age = new AgeFromDateString(birthday).age;
    var ageMax = age + 10;
    var ageMin = (age / 2) + 7;
    if (ageMin < 18) {
        ageMin = 18;
    }
    var sql = 'SELECT * FROM `profiles` WHERE gender=\'' + profile.preference + '\' AND preference=\'' + profile.gender + '\'';
    var result = db.query(sql).data.rows;
    var suggestions = [];
    result.forEach(element => {
        var suggestionProfile = this.getProfileById(element.user_id);
        var suggestionUser = users.getUserById(element.user_id);
        var suggestionBirthday = suggestionProfile.birthday.substring(0, 10);
        suggestionProfile.username = suggestionUser.username;
        var distance = geolib.getDistance(
            { lat: profile.latitude, lng: profile.longitude },
            { lat: suggestionProfile.latitude, lng: suggestionProfile.longitude }
        );
        distance = distance / 1000;
        distance = parseInt(distance);
        suggestionProfile.distance = distance;
        var userTags = profile.interests.split(" ");
        var profileTags = suggestionProfile.interests.split(" ");
        var commonTags = [];
        for (var j = 0; j < userTags.length; j++) {
            for (var k = 0; k < profileTags.length; k++) {
                if (userTags[j] == profileTags[k]) {
                    commonTags.push(userTags[j]);
                }
            }
        }
        suggestionProfile.commonTags = commonTags;
        suggestionProfile.age = new AgeFromDateString(suggestionBirthday).age;
        if (suggestionProfile.age > ageMin && suggestionProfile.age < ageMax) {
            suggestions.push(suggestionProfile);
        }
    })
    return suggestions;
}

return module.exports;