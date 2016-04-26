var express  = require('express');
var app      = require('express')();
var PORT     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var favicon = require('serve-favicon');
var method = require("method-override");

app.use(logger('dev'));
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(bodyParser.json());
app.use(favicon(__dirname + '/public/assets/img/favicon.ico'));

require("./app_server/models/db");

require('./routes')(app);


app.listen(PORT, function(){
	console.log("listening on PORT:" + PORT);
});
