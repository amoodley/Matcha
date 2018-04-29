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

// Set Static Path
app.use(express.static(path.join(__dirname, 'public')));

var users = [
	{
		id: '1',
		first_name: 'John',
		last_name: 'Doe',
		email: 'johndoe@gmail.com',
	},
	{
		id: '2',
		first_name: 'Eva',
		last_name: 'Doe',
		email: 'evadoe@gmail.com',
	},
	{
		id: '3',
		first_name: 'Jane',
		last_name: 'Doe',
		email: 'janedoe@gmail.com',
	},
]

app.get('/', function(req, res){
	res.render('index', {
		title: 'Home',
		users: users
	});
});

app.listen(3000, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});