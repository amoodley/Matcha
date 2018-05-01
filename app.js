const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');

const hostname = '127.0.0.1';
const port = 3000;

// Create DB Connection
const db = mysql.createConnection({
	port	 : '3307',
	host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'matcha'
});

// Connect
db.connect((err) => {
    if(err){
        console.log('Error: ', err);
    }
    console.log('MySql connected...')
})

// Create App
const app = express();

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

// Create DB
// app.get('/createdb', (req, res) => {
// 	let sql = 'CREATE DATABASE nodemysql';
// 	db.query(sql, (err, result) => {
// 		if(err) {
// 			console.log('Error: ', err);
// 		}
// 		console.log(result);
// 		res.send('database created...');
// 	})
// })

// GET: Home
app.get('/', (req, res) => {

	res.render('index', {
		title: 'Home',
	});
});

// GET: Register
app.get('/register', (req, res) => {

	res.render('register', {
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
app.post('/register', (req, res) => {
	
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
			message.Username = 'Username cannot be longer than 30'
		}
	}
	else {
		message.Username = 'Username cannot be empty';
	}
	
	if (req.body.email == '')	{
		message.Email = 'Email cannot be empty';
	}

	if (password != '') {
		if (password.length < 6) {
		message.Password = 'Password cannot be shorter than 6'
		}
		else if (password.length > 30) {
			message.Password = 'Password cannot be longer than 30'
		}
	}
	else {
		message.Password = 'Password cannot be empty'
	}
	
	if ((message.Username == '') && (message.Password == '') && (message.Email == '')) {
		var newUser = {
			id: null,
			username: req.body.username,
			password_hash: '',
			email: req.body.email,
			activated: 0,
			state: 1
		}
		let hash = bcrypt.hashSync(password, 10);
		newUser.password_hash = hash;
		let sql = 'INSERT INTO `users` (id, username, password_hash, email, activated, state) VALUES(?)';
		var values = [newUser.id, newUser.username, newUser.password_hash, newUser.email, newUser.activated, newUser.state]
		let query = db.query(sql, [values], (err, result) => {
			if(err) {
				console.log('Error: ', err);
			}
			console.log(result);
			res.send('User inserted...');
		})
	}
	else {
		res.render('register', {
			title: 'Register',
			username: username,
			email: email,
			message: message
		});
	}
});



// Start Server
app.listen(3000, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});