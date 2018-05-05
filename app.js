const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Set server address
const hostname = '127.0.0.1';
const port = 3000;

// Load Routes
const home = require('./routes/home');
const account = require('./routes/account');


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

// Set Routes
app.use('/', home);
app.use('/account', account);


// Start Server
app.listen(3000, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});