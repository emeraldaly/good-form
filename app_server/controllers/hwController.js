//HW SPECIFIC CONTROLLERS//
var hw = require("../models/homework");

//Post a HW submission
exports.submitHw = function (req, res){
  var newHw = new hw(req.body);
  newHw.save(function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      console.log(doc);
    }
  });
}
//Get all hw submissions for a specific week

//Get all hw from a specific user
