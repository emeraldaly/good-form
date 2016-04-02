//CLASS SPECIFIC CONTROLLERS//
var Class = require("../models/class");

//Add a New class
exports.createClass = function (req, res){
  debugger
  var newClass = new Class({name:req.body.name, datetime:req.body.datetime, _organization: "56fd84b7b49810d615bb1e21"});
  newClass.save(function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      console.log(doc);
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
