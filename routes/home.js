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


// Define the home page route
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
			var profileImg = profileImg.substring(6, profileImg.length);
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

router.get('/setupImage', (req, res) => {
	res.render('home/setupImage', {
		title: 'Set profile image',
		message: ''
	});
});

router.post('/setupImage', upload.single('profileImg'), (req, res) => {
	var userId = users.isLoggedIn(req);
	if (req.file){
		var path = req.file.path;
		path = path.replace(/\\/g, '/');
		var sql = 'UPDATE `profiles` SET `profileimg` = \'' + path +'\' WHERE user_id=\'' + userId +'\'';
		var result = db.query(sql);
		var sql = 'UPDATE `users` SET `state` = \'3\' WHERE id=\'' + userId +'\'';
		var result = db.query(sql);
		res.redirect('/');
	} else {
		res.render('home/setupImage', {
			title: 'Set profile image',
			message: 'Please choose a profile picture'
		});
	}
});

router.get('/setupLocation', (req, res) => {
	res.render('home/setupLocation', {
		title: 'Set location'
	});
});

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