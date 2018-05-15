var express = require('express');
var router = express.Router();
const cookieParser = require('cookie-parser');
const multer  = require('multer');
const ageCalculator = require('age-calculator');
let {AgeFromDateString, AgeFromDate} = require('age-calculator');
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

const db = require('../database/db');
const users = require('../models/users.js');


// GET: Home/Index
router.get('/', (req, res) => {
	if (users.isLoggedIn(req)) {
		var userId = users.isLoggedIn(req);
		var result = users.getUserById(userId);
		if (result.state == 1) {
			res.redirect('/setupProfile');
		} else if (result.state == 2) {
			 res.redirect('/setupImage');
		} else if (result.state == 3) {
			 res.redirect('/setupLocation');
		} else if (result.state == 4) {
			var user = users.getUserById(userId);
			var profile = db.query('SELECT * FROM `profiles` WHERE user_id=\'' + userId +'\'');
			var profileImg = profile.data.rows[0].profileimg;
			var bio = profile.data.rows[0].bio;
			var interests = profile.data.rows[0].interests;
			var username = user.username;
			var city = profile.data.rows[0].city;
			var birthday = profile.data.rows[0].birthday;
			birthday = birthday.substring(0, 10);
			let ageFromString = new AgeFromDateString(birthday).age;

			res.render('home/index', {
				title: 'Home',
				profileImg: profileImg,
				username: username,
				age: ageFromString,
				city: city,
				bio: bio,
				interests: interests
			});
		}
	} else {
		res.redirect('/account/login');
	}
});

// GET: SetupProfile
router.get('/setupProfile', (req, res) => {
	res.render('home/setupProfile', {
		title: 'Setup profile',
		firstName: '',
		lastName: '',
		birthday: '',
		city: '',
		gender: '',
		preference: '',
		bio: '',
		interests: '',
		message: {
			firstName: '',
			lastName: '',
			birthday: '',
			city: '',
			gender: '',
			preference: ''
		}
	});
});

// POST: SetupProfile
router.post('/setupProfile', (req, res) => {

	var message = {
		firstName: '',
		lastName: '',
		birthday: '',
		city: '',
		gender: '',
		preference: '',
	};

	var userId = users.isLoggedIn(req);
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var birthday = req.body.birthday;
	var city = req.body.city;
	var gender = req.body.gender;
	var preference = req.body.preference;
	var bio = req.body.bio;
	var interests = req.body.interests;


	if (firstName == '') {
		message.firstName = 'Please enter your first name';
	}
	if (lastName == '') {
		message.lastName = 'Please enter your last name';
	}
	if (birthday == '') {
		message.birthday = 'Required';
	}
	if (city == '') {
		message.city = 'Required';
	}
	if (gender == 'null') {
		message.gender = 'Required';
	}
	if (preference == 'null') {
		message.preference = 'Required';
	}
			
	if (message.firstName == '' && message.lastName == '' && message.gender == '' && message.preference == '' && message.birthday == '' && message.city == '') {
		var newProfile = {
			userId: userId,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			birthday: req.body.birthday,
			city: req.body.city,
			gender: req.body.gender,
			preference: req.body.preference,
			bio: req.body.bio,
			interests: req.body.interests,
			profileImg: '',
			latitude: '',
			longitude: ''
		};
		var sql = 'INSERT INTO `profiles` (id, user_id, first_name, last_name, birthday, city, gender, preference, bio, interests, profileimg, latitude, longitude) VALUES(?)';
		var values = [null, newProfile.userId, newProfile.firstName, newProfile.lastName, newProfile.birthday, newProfile.city, newProfile.gender, newProfile.preference, newProfile.bio, newProfile.interests, null, null, null];
		var result = db.query(sql, [values]);
		var sql = 'UPDATE `users` SET `state` = \'2\' WHERE id=\'' + userId +'\'';
		var result = db.query(sql);
		res.redirect('/');
	} else {
		res.render('home/setupProfile', {
			title: 'Setup profile',
			firstName: firstName,
			lastName: lastName,
			birthday: birthday,
			city: city,
			gender: gender,
			preference: preference,
			bio: bio,
			interests: interests,
			message: message
		});
	}
});

// GET: Setup Image
router.get('/setupImage', (req, res) => {
	res.render('home/setupImage', {
		title: 'Set profile image',
		message: ''
	});
});

// POST: Setup Profile
router.post('/setupImage', upload.any('photos', 5), (req, res) => {
	var userId = users.isLoggedIn(req);
	if (req.files[0]){
		var path, path1, path2, path3, path4 = '';
		path = req.files[0].path;
		path = path.replace(/\\/g, '/');
		path = path.substring(6, path.length);
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
		var sql = 'UPDATE `profiles` SET `profileimg` = \'' + path +'\', `img1` = \'' + path1 +'\', `img2` = \'' + path2 +'\', `img3` = \'' + path3 +'\', `img4` = \'' + path4 +'\' WHERE user_id=\'' + userId +'\'';
		var result = db.query(sql);
		console.log(result);
		var result = db.query('UPDATE `users` SET `state` = \'3\' WHERE id=\'' + userId +'\'');
		res.redirect('/');
	} else {
		res.render('home/setupImage', {
			title: 'Set profile image',
			message: 'Please choose a profile picture'
		});
	}

	// if (req.files){
	// 	var path = req.file.path;
	// 	path = path.replace(/\\/g, '/');
	// 	var sql = 'UPDATE `profiles` SET `profileimg` = \'' + path +'\' WHERE user_id=\'' + userId +'\'';
	// 	var result = db.query(sql);
	// 	var sql = 'UPDATE `users` SET `state` = \'3\' WHERE id=\'' + userId +'\'';
	// 	var result = db.query(sql);
	// 	res.redirect('/');
	// } else {
	// 	res.render('home/setupImage', {
	// 		title: 'Set profile image',
	// 		message: 'Please choose a profile picture'
	// 	});
	// }
});

// GET: Setup 
router.get('/setupLocation', (req, res) => {
	res.render('home/setupLocation', {
		title: 'Set location'
	});
});

// POST: Setup Location
router.post('/setupLocation', (req, res) => {
	var userId = users.isLoggedIn(req);
	var latitude = req.body.latitude;
	var longitude = req.body.longitude;

	if (latitude != '' && longitude != '') {
		var sql = 'UPDATE `profiles` SET `latitude` = \'' + latitude +'\', `longitude` = \'' + longitude +'\'  WHERE user_id=\'' + userId +'\'';
		var result = db.query(sql);
		var sql = 'UPDATE `users` SET `state` = \'4\' WHERE id=\'' + userId +'\'';
		var result = db.query(sql);
		res.redirect('/');
	} 
});



module.exports = router;