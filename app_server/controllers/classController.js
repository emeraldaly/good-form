//CLASS SPECIFIC CONTROLLERS//
var Class = require("../models/class");

//Add a New class
exports.createClass = function (req, res){
  debugger
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
        debugger
        console.log(docs)
        res.send(docs);
      }
    });
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
