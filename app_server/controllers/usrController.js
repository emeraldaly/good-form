// var passport = require("../config/passport");
var express = require("express");
var app = express();
var User = require("../models/user");
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var bcrypt = require("bcryptjs");
var Organization = require("../models/organization");
var Homework = require("../models/homework");
var Class = require("../models/class");
var mongoose = require("mongoose");	

app.use(require('express-session')({
  secret: "rutgerpridesecrets",
  resave: true,
  saveUninitialized: true,
  cookie: {secure: false, maxAge: (1000 * 60 * 60 * 24 * 30) },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({
  extended: false
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  done(null, { id: id, username: id })
});

passport.use('local', new LocalStrategy({
  passReqToCallback: true,

},
function(req, email, password, done) {

  User.findOne({
    where: {
      email: email
    }
  })
  .then(function(user){
    if(user){
      bcrypt.compare(password, user.dataValues.password, function(err, user) {
        if (user) {

          //if password is correct authenticate the user with cookie
          done(null, { id: email, username: email });
        } else{
          done(null, null);
        }
      });
    } else {
      done(null, null);
    }
  });
}));


exports.login = function(req, res) {
  console.log(req.body);
  passport.authenticate('local', { successRedirect: '/successRedirect',
                                   failureRedirect: '/login' });
} 


exports.newUser = function(req, res) {
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
	User.findOne({ username: req.body.userEmail }, function(err, user) {
		if (user) {
			res.redirect("/?msg=Your email is already registered, please login.");
			console.log("found one")} 
			else { console.log("didn't find one")
				userx.save(function(err, user) {console.log("saved")});
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