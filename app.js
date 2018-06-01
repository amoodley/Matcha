const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');
const path = require('path');

// Set server address
const hostname = '127.0.0.1';
const port = 3000;

// Load Models
const db = require('./database/db');
const users = require('./models/users.js');
const profiles = require('./models/profiles.js');

// Load Routes
const home = require('./routes/home');
const account = require('./routes/account');
const profile = require('./routes/profile');

// Create App
const app = express();

// Run server to listen on port 3000.
const server = app.listen(3000, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
const io = require('socket.io')(server);

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
app.use('/js', express.static(__dirname + '/node_modules/socket.io-client/dist')); // redirect Socket.io

// Set Routes
app.use('/', home);
app.use('/account', account);
app.use('/profile', profile);


var connections = [];

io.sockets.on('connection', function (socket) {
  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.length);

  // Disconnect
  socket.on('disconnect', function (data) {
      connections.splice(connections.indexOf(socket), 1);
      console.log('Disconnected: %s sockets', connections.length);
  });

  // Send Message
 socket.on('send message', function (data) {
      io.sockets.emit('new message', { msg: data.msg, username: data.username, recipient: data.recipient });
      var chatResult = db.query('SELECT chat_id FROM chats WHERE user_id=\'' + data.username + '\' AND recipient_id=\'' + data.recipient + '\'').data.rows;
      if (chatResult[0] == undefined) {
          chatResult = db.query('SELECT chat_id FROM chats WHERE user_id=\'' + data.recipient + '\' AND recipient_id=\'' + data.username + '\'').data.rows;
          if (chatResult[0] == undefined) {
              var sql = 'INSERT INTO `chats` (id, chat_id, user_id, recipient_id, message) VALUES(?)';
              var values = [null, null, data.username, data.recipient, data.msg];
              var chatId = db.query(sql, [values]).data.rows.insertId;
              var result = db.query('UPDATE `chats` SET chat_id=\'' + chatId + '\' WHERE id=\'' + chatId + '\'');
          } else {
              var sql = 'INSERT INTO `chats` (id, chat_id, user_id, recipient_id, message) VALUES(?)';
              var values = [null, null, data.username, data.recipient, data.msg];
              var id = db.query(sql, [values]).data.rows.insertId;
              var chatId = chatResult[0].chat_id;
              var result = db.query('UPDATE `chats` SET chat_id=\'' + chatId + '\' WHERE id=\'' + id + '\'');
          }
      } else {
          var sql = 'INSERT INTO `chats` (id, chat_id, user_id, recipient_id, message) VALUES(?)';
          var values = [null, null, data.username, data.recipient, data.msg];
          var id = db.query(sql, [values]).data.rows.insertId;
          var chatId = chatResult[0].chat_id;
          var result = db.query('UPDATE `chats` SET chat_id=\'' + chatId + '\' WHERE id=\'' + id + '\'');
      }
  });

  socket.on('send view', function (data) {
    console.log(data);
    io.sockets.emit('new view', { viewer: data.viewername, user: data.username });
  });
});