//HW SPECIFIC CONTROLLERS//
var Hw = require("../models/homework");
var Class = require("../models/class");
var User = require("../models/user");
var Submission = require("../models/submission");
//Post a HW submission

// exports.thisHomework = function(req,res){
// req.session.jibba = "jabba"
// req.session.hw = req.body.homeworkId;
// console.log(req.session.hw + req.body.homeworkId)
// }

exports.thisHomework = function (req, res){
// 
req.session.thisHomeworkId = req.body.homeworkId;
res.send("got it");
      
}


exports.submitHw = function (req, res){
console.log(req.session.thisHomeworkId)
 var newSubmission = new Submission({github:req.body.github, heroku:req.body.heroku, _homework:req.session.thisHomeworkId, student: req.session.user._id});
  newSubmission.save(function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      req.session.submissionId = doc._doc._id;

      var thisHomework = req.session.thisHomeworkId;
  

      console.log(thisHomework)

      Hw.findByIdAndUpdate(thisHomework, {
              $push: {
                _submission: req.session.submissionId
              }
            }, {
              safe: true,
              upsert: true
            }, function(err, model) {
              User.update({_id: req.session.user._id  }, 
                {$pull: { assignment: req.session.thisHomeworkId }
              }, 
                function (err,val) {
                    debugger
                    console.log(val)
                });
          
              console.log("it worked?")
            })




    }
  });
}

exports.viewHomeworkByClass = function(req, res){

  Hw.find({_class:req.session.editClassId}).
  populate("Class")
  .exec(function(err, docs) {
      console.log(docs)
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        debugger
        res.send(docs)
      }
    })
}

exports.createHw = function(req, res) {
  debugger
  Class.find({
      _id: req.session.editClassId
    })
    .populate('user')
    .exec(function(err, docs) {
      console.log(docs)
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        //         console.log(docs)
        req.session.studentArray = docs[0]._doc.student;
        var newHw = new Hw({
          _class: req.session.editClassId,
          description: req.body.description,
          poster: req.session.user._id,
          name: req.body.name,
          duedate:req.body.duedate,
          duetime:req.body.duetime
        });
        newHw.save(function(err, doc) {
          if (err) {
            console.log(err);
          } else {
            
            req.session.homeworkId = doc._doc._id;
            console.log(req.session.homeworkId)
            console.log(req.session.studentArray)
            
            User.update({
               _id: {$in: req.session.studentArray}
              }, {
                $push: {
                "assignment": req.session.homeworkId
                }
              }, {
               multi: true, 
              // safe: true,
                // upsert: true
              },
              function(err, model) {
                
                console.log("it worked?")
              });
          }
        });
      }
    });
}
//Get all hw submissions for a specific week

//Get all hw from a specific user
