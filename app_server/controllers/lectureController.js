var Lecture = require("../models/lecture");

exports.createLecture = function(req, res){
console.log(req.body.date)
var newLec = new Lecture({"github": req.body.github, "videoLink":req.body.videoLink,  
	"info":req.body.info, 
	"poster":req.session.user._id,
	"date":req.body.date,
	"_class":req.session.editClassId,
  "className":req.session.editClassName});
  newLec.save(function (err, doc) {
    if (err) {
      console.log(err);
    } else {
     res.send(doc);
    }
  });
}

exports.viewLecture = function(req,res){
  //will be used to view all the lectures
  console.log('got it')
}

exports.myLecture = function (req, res){
  debugger
  console.log(req.session.user._class)
  Lecture.find({
  _class:{ $in:req.session.user._class}
  })
  .populate("_class.")
  .exec(function(err, docs){
    debugger
      if(err){
        console.log(err);
        res.send(err);
      } else {
        res.send(docs);
      }
    });
}





