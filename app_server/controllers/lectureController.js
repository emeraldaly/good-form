var Lecture = require("../models/lecture");

exports.createLecture = function(req, res){
debugger
console.log(req.body.github)
var newLec = new Lecture({"github": req.body.github, "videoLink":req.body.videoLink,  
	"info":req.body.info, 
	"poster":req.session.user._id,
	"date":req.body.date,
	"_class":req.session.editClassId});
  newLec.save(function (err, doc) {
    if (err) {
      console.log(err);
    } else {
     res.send(doc);
    }
  });

}