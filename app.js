const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

// var logger = function(req, res, next){
// 	console.log('logging...');
// }
// app.use(logger);

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set Static Paths
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

// GET: Home
app.get('/', (req, res) => {

	res.render('index', {
		title: 'Home'
	});
});

// GET: Register
app.get('/users/register', (req, res) => {

	res.render('register', {
		title: 'Register'
	});
});

// POST: Register
app.post('/users/register', (req, res) => {
	
	var message = '';
	var username = req.body.username;
	var password = req.body.password;

	if (req.body.username != null) {

		if (username.length > 3) {

			if (username.length < 31) {

				if (req.body.email != null)	{

					if (password != null) {

						if (password.length > 6) {

							if (password < 31) {

								var newUser = {

									username: req.body.username,
									email: req.body.email,
									password: req.body.password
								}
							}
							message = 'Password cannot be longer than 30'
						}
						message = 'Password must be longer than 6'
					}
					message = 'Email cannot be null';
				}
				message = 'Username cannot be longer than 30'
			}
			message = 'Username must be greater than 3 characters';
		}
		message = 'Username cannot be null';
	}
	
	if (message != null) {
		res.render('register', {
			title: 'Register',
			message: message
		});
	}
	else {
		console.log(newUser);
	}

	
});

app.listen(3000, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});