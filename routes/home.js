var express = require('express');
var router = express.Router();
const cookieParser = require('cookie-parser');

const users = require('../models/users.js');


// define the home page route
router.get('/', (req, res) => {

	if (users.isLoggedIn(req)) {
		var userId = users.isLoggedIn(req);
		res.render('home/index', {
			title: 'Home',
		});
	} else {
		res.redirect('/account/login');
	}
});

module.exports = router;