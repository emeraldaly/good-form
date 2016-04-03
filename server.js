var express = require("express");
var app = express();
//Socket.io requires http to run correctly
var http = require("http").Server(app);
var io = require('socket.io')(http);

var bodyParser = require ("body-parser");
var cookieParser = require("cookie-parser");
var logger= require('morgan');
var PORT = process.env.PORT || 8080;
var method = require("method-override");
var passport = require("passport");
var passportlocal = require('passport-local').Strategy;

app.use(require('express-session')({
  secret: "rutgerpridesecrets",
  resave: true,
  saveUninitialized: true,
  cookie: {secure: false, maxAge: (1000 * 60 * 60 * 24 * 30) },
}));

app.use(logger('dev'));
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
 	extended: false
}));

app.use(bodyParser.json());


app.use(passport.initialize());
app.use(passport.session());

require("./app_server/models/db");

require('./routes')(app);
// require('./app_server/config/socketConnection')

// passport config

// app.use(passport.initialize());
// app.get('*', function(req, res){
//   res.sendFile(process.cwd() + '/index.html');
// });

// //SOCKET IO CONNECTION
io.on('connection', function(socket){
  //change this to logged in user's name
  var username = 'St';
  console.log('a user has connected');

//   socket.on('request-users', function(){
//     socket.emit('users', {users: users});
//   });

  socket.on('add-user', function(data){
//     if(users.indexOf(data.username) == -1){
//       io.emit('add-user', {
//         username: data.username
//       });
//       username = data.username;
//       users.push(data.username);
      users.push(username);
//       User.save(function(err){
//         if (err) throw err;
//         console.log('user saved to db');
//       });
//     } else {
//       socket.emit('prompt-username', {
//         message : "User already exists"
//       })
//     }
  });

  // when the client emits 'typing', we broadcast it to others
    socket.on('typing', function () {
      socket.broadcast.emit('typing', {
        username: socket.username
      });
    });

    // when the client emits 'stop typing', we broadcast it to others
    socket.on('stop typing', function () {
      socket.broadcast.emit('stop typing', {
        username: socket.username
      });
    });

  socket.on('message', function(data){
    io.emit('message', {
      username: username,
      message: data.message
    });
  });

  socket.on('disconnect', function(data){
    console.log(username + ' has disconnected');
//     users.splice(users.indexOf(username), 1);
    io.emit('remove-user', {username: username});
  });
});
// // END SOCKET

http.listen(PORT, function(){
  console.log("listening on PORT:" + PORT);
});
