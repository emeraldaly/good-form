//ORGANIZATION DB SPECIFIC CONTROLLERS//
var Org = require("../models/organization");

//Add an organization
exports.addOrg = function(req, res){
  var newOrg = new Org (req.body);

  newOrg.save(function(err, doc){
    if(err){
      console.log(err);
    } else {
      res.send(doc);
    }
  });
}

//Get all Organizations
exports.showAllOrgs = function (req, res){
  Org.find({})
  .exec(function(err, docs){
    if(err){
      console.log(err);
      res.send(err);
    } else {
      res.send(docs);
    }
  });
}

//Get all classes for specific org
exports.getOrgsClasses = function (req, res){
  Org.findOne({
    name:req.body.name
  })
    .populate('classes')
    .exec(function(err, docs){
      if(err){
        console.log(err);
        res.send(err);
      } else {
        res.send(docs);
      }
    });
}
