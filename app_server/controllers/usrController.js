//USER SPECIFIC CONTROLLERS//
var User = require("../models/user");

//Add new user to DB
exports.addUser = function(req, res){
	var newUser = new User(req.body);
  newUser.save(function (err, doc) {
		if (err) {
			console.log(err);
		} else {
			console.log(doc);
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
