//CLASS SPECIFIC CONTROLLERS//
var Class = require("../models/class");
var User = require("../models/user");

exports.updateClass = function (req, res){
debugger
  var userRole = req.body.userRole;
  var classId= req.session.editClassId;
  var userId = req.body.userId;
  User.findByIdAndUpdate(userId, {
                _class: classId
            }, {
              safe: true,
              upsert: true
            }, function(err, model) {
              console.log("push to user")
            })

  // debugger
  if (userRole == "teacher"){
    Class.findByIdAndUpdate(classId, {
              $push: {
                teacher: req.body.userId
              }
            }, {
              safe: true,
              upsert: true
            }, function(err, model) {
              console.log("it worked?")
            })

  }
  else if (userRole == "ta"){
    Class.findByIdAndUpdate(classId, {
              $push: {
                ta: req.body.userId
              }
            }, {
              safe: true,
              upsert: true
            }, function(err, model) {
              console.log("it worked?")
            })
  }
  else
    Class.findByIdAndUpdate(classId, {
              $push: {
                student: req.body.userId
              }
            }, {
              safe: true,
              upsert: true
            }, function(err, model) {
              console.log("it worked?")
            })

}

//Add a New class
exports.createClass = function (req, res){
  // debugger
  var newClass = new Class({name:req.body.name, datetime:req.body.datetime, _organization: req.session.organization});
  newClass.save(function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      console.log(doc);
    }
  });
}

exports.showClasses = function (req, res){
  Class.find({
  _organization:req.session.organization
  })
  .populate('user')
  .exec(function(err, docs){
      if(err){
        console.log(err);
        res.send(err);
      } else {
        // debugger
        console.log(docs)
        res.send(docs);
      }
    });
}


exports.updateThisClass=function(req, res){
  // debugger
  console.log(req.session.editClassId)
Class.findOne({
    _id:req.session.editClassId
  })
    .populate('user')
    .exec(function(err, docs){
      if(err){
        console.log(err);
        res.send(err);
      } else {
        console.log(docs)
        res.send(docs);
      }
    });
}

exports.editClassId = function (req, res){
// debugger
req.session.editClassId = req.body.classId
res.send("got it");
      
}
//Get all users in class
exports.getClassUsers = function (req, res){
  Class.findOne({
    name:req.body.name
  })
    .populate('user')
    .exec(function(err, docs){
      if(err){
        console.log(err);
        res.send(err);
      } else {
        res.send(docs);
      }
    });
}
