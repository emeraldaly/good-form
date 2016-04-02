
var passport = require("../config/passport");
var User = require("../models/user");
var Organization = require("../models/organization");
var Homework = require("../models/homework");
var Class = require("../models/class");
var mongoose = require("mongoose");

exports.login = function(req, res) {
	// console.log(req.body);
	//   passport.authenticate('local', { successRedirect: '/successRedirect',
	//                                    failureRedirect: '/login' });
	// console.log(passport.authenticate);
}

exports.addUser = function(req, res) {
	console.log(req.body.userRole)
	var userx = new User({
		firstname: req.body.userFirstName,
		lastname: req.body.userLastName,
		username: req.body.username,
		password: req.body.userPassword,
		admin: req.body.userRole,
		// currently hardwired in until we can do a req value
		_organization: "56fd84b7b49810d615bb1e21",
	});
	User.findOne({
		username: req.body.username
	}, function(err, user) {
		if (user) {
			res.redirect("/?msg=Your email is already registered, please login.");
			console.log("found one")
		} else {
			console.log("didn't find one")
			userx.save(function(err, user) {
				console.log("saved")
			});

			console.log(user)
			res.redirect("/?msg=Thank you for registering, please login.");

		};



	})

	// userx.save(function(err, user) {
	// 	if (err) 
	// 		console.log(err);
	// console.log(user);	
	//    // fetch user and test password verification

	//     // test a matching password
	//     userx.comparePassword(req.body.userPassword, function(err, isMatch) {
	//         if (err) throw err;
	//         console.log('Password123:', isMatch); // -> Password123: true
	//     });

	//     // test a failing password
	//     userx.comparePassword(req.body.userPassword, function(err, isMatch) {
	//         if (err) throw err;
	//         console.log('123Password:', isMatch); // -> 123Password: false
	//     });
	// });

}


// 		} else {

// 			console.log("saved")
// 		}
// 		// need req.session.organizationId
// 		var id = "56fd84b7b49810d615bb1e21";
// 		Organization.findByIdAndUpdate(id, {
// 			$push: {
// 				"user": user
// 			}
// 		}, {
// 			safe: true,
// 			upsert: true
// 		}, function(err, model) {
// 			console.log("it worked?")
// 		})
// 	})
// }


exports.newUser = function(req, res) {
	User.findOne({
		username: req.body.username
	}, function(err, user) {
		if (user) {
			res.redirect("/?msg=Your email is already registered, please login.");
			console.log("found one")
		} else {

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
					var organization = data._doc._id;
					console.log(data)
					var userx = new User({
						firstname: req.body.userFirstName,
						lastname: req.body.userLastName,
						username: req.body.username,
						password: req.body.userPassword,
						admin: true,
						// currently hardwired in until we can do a req value
						_organization: organization,
					});

					userx.save(function(err, user) {
						if (err) {
							console.log(err)
						} else {
							console.log("saved")
						}
						// need req.session.organizationId
						Organization.findByIdAndUpdate(organization, {
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

			})
		}
	});
}

exports.defRoute = function(req, res) {

	res.sendFile(process.cwd() + '/public/index.html');
}

//Show all users in the class
exports.getAllUsers = function(req, res) {
  User.find({
    _organization:"56fd84b7b49810d615bb1e21"
  })
    .exec(function(err, docs){
      if(err){
        console.log(err);
        res.send(err);
      } else {
        res.send(docs);
      }
    });

}

//Update a user's info
exports.userUpdate = function(req, res) {

}

//Delete a user from DB
exports.userDelete = function(req, res) {

}

exports.defRoute = function(req, res) {

	res.sendFile(process.cwd() + '/public/index.html');
}