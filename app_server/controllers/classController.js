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
