var User = require("../models/user");
var bodyParser = require('body-parser');
var bcrypt = require("bcryptjs");
var Organization = require("../models/organization");
var Homework = require("../models/homework");
var Class = require("../models/class");
var mongoose = require("mongoose");


exports.adminStatus = function(req, res){
 res.send(req.session.user.admin)

}


exports.auth = function(req, res, next){
  console.log("auth hit");
  if (!req.isAuthenticated())
    res.send(401); else next(); };


exports.viewAssignments = function(req, res){
  console.log(req.session.user._id)
  User.findOne({_id:req.session.user._id}).populate('assignment')
  .exec(function (err, user) {

    if (err){ return handleError(err)
    }
    else{
      res.send(user)
    }
  })
}

exports.currentUser = function(req, res){
  User.find({"_id":req.session.user._id})
  .exec(function (err, user){
    res.send(user)
  })

}
exports.addUser = function(req, res) {
  var userx = new User({
    firstname: req.body.userFirstName,
    lastname: req.body.userLastName,
    username: req.body.username,
    password: req.body.userPassword,
    admin: req.body.userRole,
    // currently hardwired in until we can do a req value
    _organization: req.session.organization,
  });
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (user) {
      res.send("taken");
      console.log("found one")
      }
      else {
        console.log("didn't find one")
        userx.save(function(err, user) {
          console.log("saved")
          res.send("saved")
        });
      };



  })

}


exports.newUser = function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (user) {
      res.redirect("/?msg=Your email is already registered, please login.");
      console.log("found one");
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
              res.sendFile(process.cwd() + '/public/splash.html');
            })
          })
        }

      })
    }
  });
}

exports.firstPage = function(req, res) {

  console.log("firstPage hit");
 res.sendFile(process.cwd() + '/public/splash.html');
}

exports.defRoute = function(req, res) {
  res.sendFile(process.cwd() + '/public/home.html');
}

//Show this specific user
exports.getUser = function(req, res) {
  User.findOne({
    username: req.session.user.username
  })
  .exec(function(err, docs){
    if(err){
      console.log(err);
      res.send(err);
    } else {
      console.log(docs);
      res.send(docs);
    }
  });
}

//Show all users in the class
exports.getAllUsers = function(req, res) {
  User.find({
    _organization: req.session.organization
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

exports.getAllUsersGithub = function(req, res) {
  User.find({
    _organization: req.session.organization
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
exports.updateUser = function(req, res) {

  var user = req.session.user._id

  User.findByIdAndUpdate(user, {$set: {
    github: req.body.github,
    linkedin:req.body.linkedin,
    portfolio:req.body.portfolio
  }
}, {
  safe: true,
  upsert: true
}, function(err, model) {
  console.log("it worked?")
})
}

//Delete a user from DB
exports.userDelete = function(req, res) {

}

