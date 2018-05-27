const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');
const path = require('path');

// Set server address
const hostname = '127.0.0.1';
const port = 3000;

// Load Routes
const home = require('./routes/home');
const account = require('./routes/account');
const profile = require('./routes/profile');


// Create App
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

// Cookie Parser Middleware
app.use(cookieParser());

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
app.use('/js', express.static(__dirname + '/node_modules/masonry-layout/dist')); // redirect Masonry Layout
app.use('/js', express.static(__dirname + '/node_modules/isotope-layout/dist')); // redirect Isotope Layout

// Set Routes
app.use('/', home);
app.use('/account', account);
app.use('/profile', profile);


// Start Server
server.listen(3000, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});

io.sockets.on('connection', function(socket){
  connections.push('Connected: %s sockets connected', connections.length);

  // Disconnect
  socket.on('disconnect', function(data){
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected: %s sockets', connections.length);
  });
  
});