var express = require("express");
var app = express();
var bodyParser = require ("body-parser");
var logger= require('morgan');
var PORT = process.env.PORT || 8080;
var method = require("method-override");
app.use(express.static('public'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
 	extended: false
}));

app.get('*', function(req, res){
  res.sendFile(process.cwd() + '/index.html');
});

require("dotenv").config();
require("./app_server/models/db");
require('./routes')(app);

app.listen(PORT, function(){
  console.log("listening on PORT:" + PORT);
});



