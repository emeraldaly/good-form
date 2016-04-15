//ORGANIZATION DB SPECIFIC CONTROLLERS//
var Org = require("../models/organization");


exports.showRegistration = function(req, res){
console.log("showreg hit");
 res.sendFile(process.cwd() + '/public/register.html');
};

//Add an organization
exports.addOrg = function(req, res){
  var newOrg = new Org ({
    name: req.body.organizationName,
    address:req.body.address,
    website:req.body.website
  });

  newOrg.save(function(err, doc){
    if(err){
      console.log(err);
    } else {
      console.log(doc._doc._id)
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
