var express = require('express');
var router = express.Router();
const cookieParser = require('cookie-parser');

const users = require('../models/users.js');


// define the home page route
router.get('/', (req, res) => {
	if (users.isLoggedIn(req)) {
		var userId = users.isLoggedIn(req);
		var result = users.getUserById(userId);
		console.log(result.state);
		if (result.state == 1) {
			res.redirect('/setupProfile');
		} else {
			res.render('home/index', {
				title: 'Home',
			});
		}
	} else {
		res.redirect('/account/login');
	}
});

router.get('/setupProfile', (req, res) => {
	res.render('home/setupProfile', {
		title: 'Setup profile'
	});
});

module.exports = router;