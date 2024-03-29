const express = require('express');
const router = express.Router();
const multer = require('multer');
const ageCalculator = require('age-calculator');
let { AgeFromDateString, AgeFromDate } = require('age-calculator');
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/uploads/')
	},
	filename: function (req, file, cb) {
		var fileObj = {
			"image/png": ".png",
			"image/jpeg": ".jpeg",
			"image/jpg": ".jpg"
		};
		if (fileObj[file.mimetype] == undefined) {
			cb(new Error("file format not valid"));
		} else {
			cb(null, file.fieldname + '-' + Date.now() + fileObj[file.mimetype])
		}
	}
});
const upload = multer({ storage: storage });

// Load Models
const db = require('../database/db');
const users = require('../models/users.js');
const profiles = require('../models/profiles.js');

router.get('/edit', (req, res) => {
	if (users.isLoggedIn(req)) {
		var userId = users.isLoggedIn(req);
		var user = users.getUserById(userId);
		var profile = profiles.getProfileById(userId);
		var birthday = profile.birthday;
		birthday = birthday.substring(0, 10);
		let ageFromString = new AgeFromDateString(birthday).age;
		var result = db.query('SELECT * FROM `blocked` WHERE user_id=\'' + userId +'\'').data.rows;
		var blockedUsers = [];
		result.forEach(element => {
			var profile = profiles.getProfileById(element.blocked_id);
			var user = users.getUserById(element.blocked_id);
			profile.username = user.username;			
			blockedUsers.push(profile);
		});
		res.render('profile/edit', {
			title: 'Edit profile',
			user: user,
			profile: profile,
			age: ageFromString,
			blockedUsers: blockedUsers
		});
	} else {
		res.redirect('/account/login');
	}
});

router.post('/editprofile', (req, res) => {
	console.log('In Controller');
	var user = {
		userId: users.isLoggedIn(req),
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		birthday: req.body.birthday,
		city: req.body.city,
		gender: req.body.gender,
		preference: req.body.preference,
		bio: req.body.bio,
		interests: req.body.interests
	};
	var result = profiles.updateProfile(user);
	if (result) {
		res.send('Success');
	} else {
		res.send(result);
	}
});

router.post('/editphotos', upload.any('photos', 5), (req, res) => {
	var userId = users.isLoggedIn(req);
	if (req.files) {
		if (req.files[0]) {
			var path, path1, path2, path3, path4 = '';
			path = req.files[0].path;
			path = path.replace(/\\/g, '/');
			path = path.substring(6, path.length);
		}
		if (req.files[1]) {
			path1 = req.files[1].path;
			path1 = path1.replace(/\\/g, '/');
			path1 = path1.substring(6, path1.length);
		}
		if (req.files[2]) {
			path2 = req.files[2].path;
			path2 = path2.replace(/\\/g, '/');
			path2 = path2.substring(6, path2.length);
		}
		if (req.files[3]) {
			path3 = req.files[3].path;
			path3 = path3.replace(/\\/g, '/');
			path3 = path3.substring(6, path3.length);
		}
		if (req.files[4]) {
			path4 = req.files[4].path;
			path4 = path4.replace(/\\/g, '/');
			path4 = path4.substring(6, path4.length);
		}
		var sql = 'UPDATE `profiles` SET `profileimg` = \'' + path + '\', `img1` = \'' + path1 + '\', `img2` = \'' + path2 + '\', `img3` = \'' + path3 + '\', `img4` = \'' + path4 + '\' WHERE user_id=\'' + userId + '\'';
		var result = db.query(sql);
		res.send('Success');
	} else {
		res.send('Error');
	}

});

router.post('/editlocation', (req, res) => {
	var userId = users.isLoggedIn(req);
	var user = {
		userId: userId,
		latitude: req.body.latitude,
		longitude: req.body.longitude
	};
	var result = profiles.updateLocation(user);
	if (result) {
		res.send('Success');
	} else {
		res.send(result);
	}

})

router.get('/:username', (req, res) => {
	if (users.isLoggedIn(req)) {
		var userId = users.isLoggedIn(req);
		var user = users.getUserById(userId);
		var userProfile = profiles.getProfileById(userId);
		var userBirthday = userProfile.birthday;
		userBirthday = userBirthday.substring(0, 10);
		var userAgeFromString = new AgeFromDateString(userBirthday).age;

		var viewUsername = req.params.username;
		var viewUser = users.getUserByUsername(viewUsername);
		var viewProfile = profiles.getProfileById(viewUser.id);
		var viewBirthday = viewProfile.birthday;
		viewBirthday = viewBirthday.substring(0, 10);
		var viewAgeFromString = new AgeFromDateString(viewBirthday).age;

		var isLiked = db.query('SELECT * FROM `likes` WHERE user_id=\'' + viewUser.id + '\' AND liker_id=\'' + userId + '\'').data.rows[0];

		if (userId != viewUser.id) {
			profiles.updateFameRating(viewUser.id);
			profiles.addToProfileViews(viewUser.id, userId);
		}

		res.render('profile/profile', {
			title: viewUsername + '\'s profile',
			user: user,
			userProfile: userProfile,
			userAge: userAgeFromString,
			viewUser: viewUser,
			viewProfile: viewProfile,
			viewAge: viewAgeFromString,
			isLiked: isLiked
		});
	} else {
		res.redirect('/account/login');
	}
});

module.exports = router;