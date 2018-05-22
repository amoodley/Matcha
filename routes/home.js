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
const profiles = require('../models/profiles.js');


// GET: Home/Index
router.get('/', (req, res) => {
	if (users.isLoggedIn(req)) {
		var userId = users.isLoggedIn(req);
		var user = users.getUserById(userId);
		if (user.state == 1) {
			res.redirect('/setupProfile');
		} else if (user.state == 2) {
			 res.redirect('/setupImage');
		} else if (user.state == 3) {
			 res.redirect('/setupLocation');
		} else if (user.state == 4) {
			var profile = profiles.getProfileById(userId);
			var birthday = profile.birthday;
			birthday = birthday.substring(0, 10);
			let ageFromString = new AgeFromDateString(birthday).age;

			res.render('home/index', {
				title: 'Home',
				user: user,
				profile: profile,
				age: ageFromString,
			});
		}
	} else {
		res.redirect('/account/login');
	}
});

// POST: Search
router.post('/search', (req, res) => {
	var userId = users.isLoggedIn(req);
	var profile = profiles.getProfileById(userId);
	var searchQuery = {
		gender: profile.gender,
		preference: req.body.preference,
		fromAge: req.body.fromAge,
		toAge: req.body.toAge,
		distance: req.body.distance
	}
	var searchResult = profiles.searchProfiles(searchQuery);
	res.send(searchResult);
});

// GET: Profile Views
router.get('/views', (req, res) => {
	var userId = users.isLoggedIn(req);
	var profile = profiles.getProfileById(userId);
	var views = profiles.getViews(userId);
	res.send(views);
});

// GET: Profile Views
router.get('/likes', (req, res) => {
	var userId = users.isLoggedIn(req);
	var profile = profiles.getProfileById(userId);
	var likes = profiles.getLikes(userId);
	res.send(likes);
});

// POST: Like
router.post('/like', (req, res) => {
	var username = req.body.username;
	var viewername = req.body.viewername;
	var user = users.getUserByUsername(username);
	var viewer = users.getUserByUsername(viewername);
	var result = profiles.addToLikes(user.id, viewer.id);

	res.send(result);
});

// GET: Setup Profile
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

// POST: Setup Profile
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
		var result = profiles.insertNewProfile(newProfile);
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
		var result = db.query('UPDATE `users` SET `state` = \'3\' WHERE id=\'' + userId +'\'');
		res.redirect('/');
	} else {
		res.render('home/setupImage', {
			title: 'Set profile image',
			message: 'Please choose a profile picture'
		});
	}
});

// GET: Setup Location
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