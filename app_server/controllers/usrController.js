var User = require("../models/user");
var Organization = require("../models/organization");
var Homework = require("../models/homework");
var Class = require("../models/class");

exports.newUser = function(req, res) {
	debugger
	console.log(req.body.userRole)
		var userx = new User({
		firstname: req.body.userFirstName,
		lastname: req.body.userLastName,
		email: req.body.userEmail,
		password: req.body.userPassword,
		admin: req.body.userRole,
		// currently hardwired in until we can do a req value
		_organization: "56fd84b7b49810d615bb1e21",
	});
	userx.save(function(err, user) {
		if (err) {
			console.log(err)
		} else {
			console.log("saved")
		}
		// need req.session.organizationId
		var id = "56fd84b7b49810d615bb1e21";
		Organization.findByIdAndUpdate(id, {
			$push: {
				"user": user
			}
		}, {
			safe: true,
			upsert: true
		}, function(err, model) {
			console.log("it worked?")
		})
	})
}


exports.addUser = function(req, res) {
	// make a if statement organization id == undefined then
	var orgx = new Organization({
		name: req.body.organizationName,
		address: req.body.address,
		website: req.body.website
	});
	orgx.save(function(err, data) {
		if (err) {
			var dummyvar;
		} else {

			console.log(data._doc._id)
		}
	});
	//else so we can use one function for creating all users
	var userx = new User({
		firstname: req.body.userFirstName,
		lastname: req.body.userLastName,
		email: req.body.userEmail,
		password: req.body.userPassword,
		admin: true,
		// currently hardwired in until we can do a req value
		_organization: "56fd84b7b49810d615bb1e21",
	});
	userx.save(function(err, user) {
		if (err) {
			console.log(err)
		} else {
			console.log("saved")
		}
		// need req.session.organizationId
		var id = "56fd84b7b49810d615bb1e21";
		Organization.findByIdAndUpdate(id, {
			$push: {
				"user": user
			}
		}, {
			safe: true,
			upsert: true
		}, function(err, model) {
			console.log("it worked?")
		})
	})
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

exports.defRoute = function(req, res){

 res.sendFile(process.cwd() + '/public/index.html');
}