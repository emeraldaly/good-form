//HW SPECIFIC CONTROLLERS//
var Hw = require("../models/homework");
var Class = require("../models/class");
var User = require("../models/user");

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

exports.createHw = function(req, res) {
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
        // debugger
        console.log(docs)
        req.session.studentArray = docs[0]._doc.student;
        var newHw = new Hw({
          _class: req.session.editClassId,
          description: req.body.description,
          poster: req.session.user._id,
          name: req.body.name
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
                debugger;
                console.log("it worked?")
              });
          }
        });
      }
    });
}
//Get all hw submissions for a specific week

//Get all hw from a specific user
