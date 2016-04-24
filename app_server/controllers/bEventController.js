var Event = require("../models/event");
var bodyParser=require('body-parser');


exports.createEvent = function(req, res){
  var newEvent = new Event({
    title: req.body.title,
   start: String(req.body.start)
  });
  newEvent.save(function(err){
    if (err) {
      console.log(err);
    }else {
      console.log('save');
    
    }

  });
 }

exports.showEvent = function(req, res) {

 Event.find({})
  .exec(function(err, docs){
    if(err){
      console.log(err);
      res.send(err);
    } else {
      res.send(docs);
    }
  });


}
 