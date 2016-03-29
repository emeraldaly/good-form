// require("./articles");
require("dotenv").config();
var mongoose = require("mongoose");

if(process.env.NODE_ENV === 'production') {
  // HEROKU DB
  console.log(process.env.MONGOLAB_URI);

  mongoose.connect(process.env.MONGOLAB_URI);
}
else {
  // LOCAL DB
  var dbURI = 'mongodb://localhost/goodform';
  mongoose.connect(dbURI);

}

mongoose.connection.on("connected", function() {
	console.log("mongoose connected to " + dbURI);
});


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Organization = new Schema({
	name:String,
	address:String,
	website:String,
	class:[{
       type : Schema.Types.ObjectId,
        ref : 'class'
      }]
});
var Class= new Schema({
	name:String
	_organization: {
       type: Schema.Types.ObjectId,
        ref: 'organization'
      },
  user:[{
       type : Schema.Types.ObjectId,
        ref : 'user'
      }],
  location:String,
  dates:String,
});

	var User = new Schema({
		_class: {
       type: Schema.Types.ObjectId,
        ref: 'class'
      },
    linkedin:String,
    github:String,
    admin:Boolean,
    role:String,
    first:String,
    last:
    username:String,
    password:String,
    portfolio:String,
    trello:String
	});

mongoose.connection.on("error", function() {
	console.log("mongoose connection err " + err);
});

mongoose.connection.on("disconnected", function() {
	console.log("mongoose disconnected");
});

gracefulShutdown = function(msg, callback) {
	mongoose.connection.close(function() {
		console.log("Mongoose disconnected through " + msg);
		callback();
	});
};

process.on('SIGINT', function() {
	gracefulShutdown('app termination', function() {
		process.exit(0);
	});
});  

process.on('SIGTERM', function() {
	gracefulShutdown('heroku termination', function() {
		process.exit(0);
	});
}); 