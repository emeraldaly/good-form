//HW SPECIFIC CONTROLLERS//
var Hw = require("../models/homework");

//Post a HW submission
exports.submitHw = function (req, res){
  var newHw = new Hw(req.body);
  newHw.save(function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      console.log(doc);
    }
  });
}


exports.createHw = function (req, res){
	debugger
	console.log(req.body)
	req.session.editClassId
	 var newHw = new Hw({_class:req.session.editClassId, description:req.body.description, poster:req.session.user._id, name:req.body.name});
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
