//CLASS SPECIFIC CONTROLLERS//
var Class = require("../models/class");

//Add a New class
exports.addClass = function (req, res){
  var newClass = new Class(req.body);
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
    .populate('user');
    .exec(function(err, docs){
      if(err){
        console.log(err);
        res.send(err);
      } else {
        res.send(docs);
      }
    });
}
