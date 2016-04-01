require("dotenv").load();
var express = require("express");
var app = express();
var cookieParser = require("cookie-parser");
var bodyParser = require ("body-parser");
var logger= require('morgan');
var PORT = process.env.PORT || 8080;
var method = require("method-override");
var passport = require("passport");

require("./app_server/models/db");
require('./routes')(app);

app.use(express.static('public'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
 	extended: false
}));

app.use(passport.initialize());
// app.get('*', function(req, res){
//   res.sendFile(process.cwd() + '/index.html');
// });


app.listen(PORT, function(){
  console.log("listening on PORT:" + PORT);
});
