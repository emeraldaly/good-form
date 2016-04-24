var express  = require('express');
var app      = require('express')();
var PORT     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');

// //Socket.io requires http to run correctly
//var http = require("http").Server(app);
//var io = require('socket.io')(http);

var method = require("method-override");

app.use(logger('dev'));
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(bodyParser.json());

require("./app_server/models/db");

require('./routes')(app);
//require socket server
//require('./app_server/config/socketConnection')(io);
// io.on('connection', function(socket){
//   //change this to logged in user's name
//   var users = [];
//   var username = '';

//   console.log('a user has connected at:' + socket.id);

//   socket.on('request-users', function(){
//     socket.emit('users', {users: users});
//   });

//   socket.on('add-user', function(data){
//     io.emit('add-user', {
//       username: req.session.user.firstname
//     });
//     username = req.session.user.firstname;
//     users.push(req.session.user.firstname);
//   });

//   socket.on('message', function(data){
//     io.emit('message', {
//       username: username,
//       message: data.message
//     });
//   });

//   socket.on('disconnect', function(data){
// //     // console.log(username + ' has disconnected');
//     console.log('User has disconnected from ', socket.id);
// //   //   users.splice(users.indexOf(username), 1);
// //     // io.emit('remove-user', {username: username});
//   });
// });

http.listen(PORT, function(){
	console.log("listening on PORT:" + PORT);
});
