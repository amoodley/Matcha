const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');

// Load Models
const db = require('../database/db');
const users = require('../models/users.js');

// Load Helpers
const sendMail = require('../helpers/sendMail');

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
		var userId = users.insert(newUser);
		// Send Activation Mail
		sendMail.activation(userId);
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

// GET: Registration Confirmation
router.get('/registrationConfirmation', (req, res) => {
	res.render('account/registrationConfirmation');
});

// GET: Reset Confirmation
router.get('/resetConfirmation', (req, res) => {
	res.render('account/resetConfirmation');
});

// GET: Password Confirmation
router.get('/passwordConfirmation', (req, res) => {
	res.render('account/passwordConfirmation');
});

// GET: Account Confirmation
router.get('/accountConfirmation/:token', (req, res) => {
	var userId = req.params.token;
	users.activateAccount(userId);
	
	res.render('account/accountConfirmation');
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
	
	if (email != '') {
		if (password != '') {
			var sql = 'SELECT * FROM `users` WHERE email=\'' + email +'\'';
			var result = db.query(sql);
			if (result.data.rows[0] != null) {
				if(bcrypt.compareSync(password, result.data.rows[0].password_hash)) {
					if (result.data.rows[0].activated != 1) {
						message.Email = 'Account not activated';
					}
				} else {
					message.Password = 'Incorrect password';
				}
			} else {
				message.Email = 'User not registered';
			}
		} else {
			message.Password = 'Password cannot be empty';
		}
	} else {
		message.Email = 'Email cannot be empty';
	}

	
	
	if (message.Email == '' && message.Password == ''){
		var token = crypto.randomBytes(64).toString('hex');
		var token_hash = crypto.createHash('sha1').update(token).digest("hex");
		var userId = result.data.rows[0].id;
		var values = [ null, token_hash, userId ];
		db.query('INSERT INTO `login_tokens`(id, token, user_id) VALUES(?)', [values]);
		
		// Set Cookie Options
		let options_1 = {
			maxAge: 1000 * 60 * 60 * 24 * 7, // would expire after 7 days
			httpOnly: true, // The cookie only accessible by the web server
		}
		let options_2 = {
			maxAge: 1000 * 60 * 60 * 24 * 3, // would expire after 3 days
			httpOnly: true, // The cookie only accessible by the web server
		}
	
		// Set cookie
		res.cookie('MID', token, options_1) // options is optional
		res.cookie('MID_', '1', options_2) // options is optional
		// Success: Redirect
		res.redirect('/');
	} else {
		res.render('account/login', {
			title: 'Login',
			email: email,
			message: message
		})
	}

});

// GET: Logout
router.get('/logout', (req, res) => {
	if (req.cookies.MID != undefined) {
        var cookie_hash = crypto.createHash('sha1').update(req.cookies.MID).digest("hex");
		db.query('DELETE FROM `login_tokens` WHERE token=\'' + cookie_hash +'\'');
		// Set Cookie Options
		let options = {
			maxAge: -3000, // would expire immediately 
			httpOnly: true, // The cookie only accessible by the web server
		}
		// Set cookie
		res.cookie('MID', '1', options) // options is optional
		res.cookie('MID_', '1', options) // options is optional
		res.redirect('login');
	}
});

// GET: ForgotP assword
router.get('/forgotPassword', (req, res) => {
	res.render('account/forgotPassword', {
        title: 'Forgot password',
        email: '',
        message: {
			Email: ''
		}
    })
});

// POST: Forgot Password
router.post('/forgotPassword', (req, res) => {
	var message = {
		Email: ''
	};

	var email = req.body.email;
	if (email == '') {
		message.Email = 'Email cannot be empty';
	} else {
        var sql = 'SELECT * FROM `users` WHERE email=\'' + email +'\'';
		var result = db.query(sql);
		if (result.data.rows[0] == null) {
			message.Email = 'Account doesn\'t exist';
		}
	}

	if (message.Email == '') {
		var sql = 'SELECT * FROM `users` WHERE email=\'' + email +'\'';
		var result = db.query(sql);
		var userId = result.data.rows[0].id;
		var token = crypto.randomBytes(64).toString('hex');
		var token_hash = crypto.createHash('sha1').update(token).digest("hex");
		var values = [ null, token_hash, userId ];
		db.query('INSERT INTO `password_tokens`(id, token, user_id) VALUES(?)', [values]);
		sendMail.passwordReset(userId, token);
		res.redirect('resetConfirmation');
	} else {
		res.render('account/forgotPassword', {
			title: 'Forgot password',
			email: email,
			message: message
		});
	}
});

// GET: Reset Password
router.get('/resetPassword/:token', (req, res) => {
	var message = {
		NewPassword: '',
		ConfirmPassword: ''
	};

	var token = req.params.token;
	var token_hash = crypto.createHash('sha1').update(token).digest("hex");
	var action = '/account/resetPassword/' + token;

	var result = db.query('SELECT * FROM `password_tokens` WHERE token=\'' + token_hash +'\'');
	if (result.data.rows[0] != undefined) {
		res.render('account/resetPassword', {
			title: 'Reset password',
			action: action,
			message: message
		});
	} else {
		message.NewPassword = 'Reset token expired';
		res.render('account/resetPassword', {
			title: 'Reset password',
			action: action,
			message: message
		});
	}
});

// POST: Reset Password
router.post('/resetPassword/:token', (req, res) => {
	var message = {
		NewPassword: '',
		ConfirmPassword: ''
	};

	var token = req.params.token;
	var action = '/account/resetPassword/' + token;
	var password = req.body.newPassword;
	var confirmPassword = req.body.confirmPassword;
	
	if (password == confirmPassword) {
		if (password != ''){
			if (password.length > 5){
				if (password.length > 30){
					message.NewPassword = 'Password cannot be longer than 30';
				}
			} else {
				message.NewPassword = 'Password cannot be shorter than 6';
			}
		} else {
			message.NewPassword = 'Password cannot be empty';
		}
	} else {
		message.NewPassword = 'Passwords don\'t match';
	}
	
	if (message.NewPassword == '' && message.ConfirmPassword == '') {
		var token_hash = crypto.createHash('sha1').update(token).digest("hex");
		var result = db.query('SELECT * FROM `password_tokens` WHERE token=\'' + token_hash +'\'');
		if (result.data.rows[0].user_id != undefined) {
			userId = result.data.rows[0].user_id;
			let hash = bcrypt.hashSync(password, 10);
			var password_hash = hash;
			db.query('UPDATE `users` SET `password_hash`=\''+ password_hash +'\' WHERE id=\'' + userId +'\'');
			db.query('DELETE FROM `password_tokens` WHERE token=\'' + token_hash +'\'');
			res.redirect('/account/passwordConfirmation');
		} else {
			message.NewPassword = 'Reset token expired';
			res.render('account/resetPassword', {
				title: 'Reset password',
				action: action,
				message: message
			});
		}
	} else {
		res.render('account/resetPassword', {
			title: 'Reset password',
			action: action,
			message: message
		});
	}
});

module.exports = router;