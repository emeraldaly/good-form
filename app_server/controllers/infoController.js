var Class = require("../models/class");
var User = require("../models/user");
var Info = require("../models/info");
exports.createInfo = function (req, res){
	debugger
	var newInfo = new Info({title: req.body.title, information:req.body.information,  class:req.body.class, poster:req.session.user._id});
  newInfo.save(function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      console.log(doc);
    }
  });

	}