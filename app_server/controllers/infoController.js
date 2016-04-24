var Slack = require('slack-node');
var Class = require("../models/class");
var User = require("../models/user");
var Info = require("../models/info");
var webhookUri = "https://hooks.slack.com/services/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";

exports.createInfo = function (req, res){
	var newInfo = new Info({title: req.body.title, information:req.body.information,  class:req.session.editClassId, poster:req.session.user._id});
  newInfo.save(function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      slack = new Slack();
      slack.setWebhook(webhookUri);
      slack.webhook({    
        channel: "#general",
        username: "INFO",
        text: req.body.information
      }, function(err, response) {
        console.log(response);
      });
      res.send(doc);
    }
  });
}

exports.viewInfo = function (req, res){
  Info.find({
    class:{ $in:req.session.user._class}
  })
  .exec(function(err, docs){
    if(err){
      console.log(err);
      res.send(err);
    } else {
      console.log(docs)
      res.send(docs);
    }
  });
}
