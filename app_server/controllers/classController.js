
//CLASS SPECIFIC CONTROLLERS//
var Class = require("../models/class");
var User = require("../models/user");


exports.viewThisClass = function(req,res){

  Class.find({_id:req.session.editClassId})
  .populate('role._user')
  .exec(function(err, docs) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {

        console.log(docs)
        res.send(docs);
      }
    });

}
exports.updateClass = function(req, res) {
  var userRole = req.body.userRole;
  var classId = req.body.Id;
  var userId = req.body.userId;
    User.findByIdAndUpdate(userId, {
      $push:{
      _class: classId
    }
    }, {
      safe: true,
      upsert: true
    }, function(err, model) {
      console.log("push to user")
    })
    Class.findByIdAndUpdate(classId, {
      $push: {
        role: {
          _user:req.body.userId,
          roleType:userRole
        }
      }
    }, {
      safe: true,
      upsert: true
    }, function(err, model) {
      console.log("it worked?")
    })


}

//Add a New class
exports.createClass = function(req, res) {
  // 
  var newClass = new Class({
    name: req.body.name,
    datetime: req.body.datetime,
    _organization: req.session.organization
  });
  newClass.save(function(err, doc) {
    if (err) {
      console.log(err);
    } else {
      console.log(doc);
    }
  });
}

exports.showClasses = function(req, res) {
  Class.find({
      _organization: req.session.organization
    })
    .populate('user')
    .exec(function(err, docs) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        // 
        console.log(docs)
        res.send(docs);
      }
    });
}


exports.updateThisClass = function(req, res) {
  // 
  console.log(req.session.editClassId)
  Class.findOne({
      _id: req.session.editClassId
    })
    .populate('user')
    .exec(function(err, docs) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(docs)
        res.send(docs);
        
      }
    });
}

exports.editClassId = function(req, res) {
    // 
    req.session.editClassId = req.body.classId
    res.send("got it");

  }
  //Get all users in class
exports.getClassUsers = function(req, res) {
  Class.findOne({
      name: req.body.name
    })
    .populate('user')
    .exec(function(err, docs) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        docs
        res.send(docs);
      }
    });
}