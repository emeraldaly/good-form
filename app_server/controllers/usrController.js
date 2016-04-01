//USER SPECIFIC CONTROLLERS//
var User = require("../models/user");
var Org = require("../models/organization");

//Add new user to DB
exports.addUser = function(req, res){
	var newUser = new User({
		firstname: req.body.userFirstName,
		lastname:req.body.userLastName,
		email:req.body.userEmail,
		password:req.body.userPassword,
		admin:true,
		// currently hardwired in until we can do a req value
	  _organization:"56fd84b7b49810d615bb1e21"
	});
  newUser.save(function (err, user) {
		if (err) {
			console.log(err);
		} else {
			console.log(user);
			//need req.session.organizationId
			var id = "56fd84b7b49810d615bb1e21";
			Org.findByIdAndUpdate(id,  {$push: {"user": user}},
			{safe: true, upsert: true}, function(err, model) {
				console.log("it worked?");
			});
			res.send(user);
		}
	});
};


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

// var orgx = new organization({name: req.body.organizationName, address:req.body.address, website:req.body.website});
		// 	orgx.save(function (err, data) {
		// 		if (err) {
		// 			var dummyvar;
		// 		} else {

		// 			console.log(data._doc._id)
		// 		}

		// 	});
