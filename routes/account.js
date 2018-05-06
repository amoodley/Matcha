const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');

// Load Model
const db = require('../database/db');
const users = require('../models/users.js')

// GET: Register
router.get('/register', (req, res) => {
	res.render('account/register', {
		title: 'Register',
		username: '',
		email: '',
		message: {
			Username: '',
			Password: '',
			Email: ''
		}
	});
});

// POST: Register
router.post('/register', (req, res) => {
	var message = {
		Username: '',
		Password: '',
		Email: ''
	}

	var username = req.body.username;
	var password = req.body.password;
    var email = req.body.email;

	if (username != '') {
		if (username.length < 3) {
			message.Username = 'Username cannot be shorter than 3';
		}
		else if (username.length > 30) {
			message.Username = 'Username cannot be longer than 30';
		} else {
            var sql = 'SELECT * FROM `users` WHERE username=\'' + username +'\'';
			var result = db.query(sql);
			if (result.data.rows[0] != null) {
				message.Username = 'Username already exists';
			}
        }
	}
	else {
		message.Username = 'Username cannot be empty';
	}
	
	if (email == '') {
		message.Email = 'Email cannot be empty';
	} else {
        var sql = 'SELECT * FROM `users` WHERE email=\'' + email +'\'';
		var result = db.query(sql);
		if (result.data.rows[0] != null) {
			message.Email = 'Email already exists';
		}
	}

	if (password != '') {
		if (password.length < 6) {
		message.Password = 'Password cannot be shorter than 6'
		}
		else if (password.length > 30) {
			message.Password = 'Password cannot be longer than 30'
		}
	} else {
		message.Password = 'Password cannot be empty'
	}
	
	// Validation ? Success : Failure
	if ((message.Username == '') && (message.Password == '') && (message.Email == '')) {
		// Create User Object
		var newUser = {
			id: null,
			username: req.body.username,
			password_hash: '',
			email: req.body.email,
			activated: 0,
			state: 1
		}
		// Hash Password
		let hash = bcrypt.hashSync(password, 10);
		newUser.password_hash = hash;
		// Insert User
		var result = users.insert(newUser);
		console.log(result);
		// Success: Redirect
		res.redirect('registrationConfirmation');
	} else {
		// Failure: Reload
		res.render('account/register', {
			title: 'Register',
			username: username,
			email: email,
			message: message
		});
	}
});

// GET: RegistrationConfirmation
router.get('/registrationConfirmation', (req, res) => {
	res.render('account/registrationConfirmation');
});

// GET: Login
router.get('/login', (req, res) => {
    res.render('account/login', {
        title: 'Login',
        email: '',
        message: {
			Password: '',
			Email: ''
		}
    })
});

// POST: Login
router.post('/login', (req, res) => {
    var message = {
		Password: '',
		Email: ''
	}
	var password = req.body.password;
    var email = req.body.email;
	
});


module.exports = router;