//USER SPECIFIC CONTROLLERS//
var user = require("../models/user");

//Add new user to DB
exports.addUser = function(req, res){
	var userx = new user({username: "steph", role: "admin"});
  userx.save(function (err) {
		if (err) {
			var dummyvar;
		} else {
			console.log('record saved');
		}
	});
}

exports.defRoute = function(req, res){

 res.sendFile(process.cwd() + '/public/index.html');
}
//Show all users in the class
exports.getAllUsers = function(req, res){

}

//Update a user's info
exports.userUpdate = function(req, res){

}

//Delete a user from DB
exports.userDelete = function(req, res){

}
