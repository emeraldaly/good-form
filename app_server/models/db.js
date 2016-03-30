require("./user");
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
  console.log(dbURI);
  mongoose.connect(dbURI);

}

mongoose.connection.on("connected", function() {
	console.log("mongoose connected to " + dbURI);
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