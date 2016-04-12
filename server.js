var express  = require('express');
var app      = require('express')();
var PORT     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');

//Socket.io requires http to run correctly
var http = require("http").Server(app);
var io = require('socket.io')(http);

var method = require("method-override");

// app.use(logger('dev'));
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
 	extended: false
}));

app.use(bodyParser.json());

require("./app_server/models/db");

require('./routes')(app);
//require socket server
require('./app_server/config/socketConnection')(io);

http.listen(PORT, function(){
  console.log("listening on PORT:" + PORT);
});
