var Lecture = require("../models/lecture");
var Organization = require("../models/organization");
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

exports.updateLecture=function(req, res){
  debugger
  var id = req.session.editLecture;
  Lecture.findByIdAndUpdate(id, {$set: {
    "github": req.body.github, 
    "videoLink":req.body.videoLink,  
    "info":req.body.info, 
    }
  }, {
  safe: true,
  upsert: true
  }, function(err, model) {
  debugger
  res.send("updated")
  });
}

exports.updateLectureInfo = function(req, res){
  Lecture.find({"_id":req.session.editLecture})
  .exec(function(err, docs){
    if (err){
      console.log(err)
    }
    else{
      res.send(docs)
    }
  })
}
exports.thisLecture = function(req, res){
  req.session.editLecture = req.body.id 
  res.send("gotit")
}
exports.deleteLecture = function(req, res){
  debugger
  console.log(req.body.id)
  Lecture.remove({_id:req.session.editLecture}, function(err, data){
    if (err){
      console.log(err)
    }
    else{
      res.send(data)
    }
  })
}

exports.viewLecture = function(req,res){
    Lecture.find({"_class":req.session.editClassId})
    .populate("poster")
    .exec(function(err, docs){
      if (err){
        res.send(err)
      }
      else{
        res.send(docs)
      }
    })
  // Organization.find({"_id":req.session.organization})
  // .exec(function(err, doc){
  //   if (err){
  //     console.log(error)
  //   }
  //   else{
  //     var orgClass = doc[0]._doc.class;
  //     Lecture.find({"_class":{
  //       $in:orgClass
  //     }
  //   }).exec(function(err,doc){
  //     debugger
  //     console.log(doc)
  //   })

  //   }
  // });

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





