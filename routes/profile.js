const express = require('express');
const router = express.Router();
const ageCalculator = require('age-calculator');
let {AgeFromDateString, AgeFromDate} = require('age-calculator');
// Load Models
const users = require('../models/users.js');
const profiles = require('../models/profiles.js');

router.get('/edit', (req, res) => {
	var userId = users.isLoggedIn(req);
	var user = users.getUserById(userId);
	var profile = profiles.getProfileById(userId);
	var birthday = profile.birthday;
	birthday = birthday.substring(0, 10);
	let ageFromString = new AgeFromDateString(birthday).age;
	res.render('profile/edit', {
		title: 'Edit profile',
		user: user,
		profile: profile,
		age: ageFromString
	});
});

router.post('/editprofile', (req, res) => {
	
});

router.get('/:username', (req, res) => {
    var username = req.params.token;
	res.render('profile/profile', {
		title: username + '\'s profile'
	});
});

module.exports = router;