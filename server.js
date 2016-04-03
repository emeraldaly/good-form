var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var configDB = require('./models/db.js');


var express = require("express");
var app = express();
var bodyParser = require ("body-parser");
var cookieParser = require("cookie-parser");
var logger= require('morgan');
var PORT = process.env.PORT || 8080;
var method = require("method-override");
var session = require('express-session');

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


require("./app_server/models/db");

require('./routes')(app);


// passport config

// app.use(passport.initialize());
// app.get('*', function(req, res){
//   res.sendFile(process.cwd() + '/index.html');
// });


app.listen(PORT, function(){
  console.log("listening on PORT:" + PORT);
});
