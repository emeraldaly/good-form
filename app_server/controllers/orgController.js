//ORGANIZATION DB SPECIFIC CONTROLLERS//
var org = require("../models/organization");

//Add an organization
exports.addOrg = function(req, res){
  var newOrg = new org (req.body);

  newOrg.save(function(err, doc){
    if(err){
      console.log(err);
    } else {
      res.send(doc);
    }
  });
}

//Get all classes
