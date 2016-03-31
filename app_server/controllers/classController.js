//CLASS SPECIFIC CONTROLLERS//

//"class" is a reserved JS keyword
var classy = require("../models/class");

//Add a New class
exports.addClass = function (req, res){
  var newClass = new classy(req.body);
  newClass.save(function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      console.log(doc);
    }
  });
}

//Get all users in class
