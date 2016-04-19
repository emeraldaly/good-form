var Event = require("../models/event");
// console.log(Event);
var bodyParser=require('body-parser');

//var Class = require("../models/class");
//var mongoose = require("mongoose");

exports.createEvent = function(req, res){
  // console.log('what do you mean?')
  var newEvent = new Event({
    title: req.body.title,
   start: req.body.start
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
  // var eventx = new Event({
  //           title: req.body.title,
  //           start: req.body.start,
  //           });

  //         eventx.save(function(err, user) {
  //           if (err) {
  //             console.log(err)
  //           } else {
  //             console.log("saved")
  //          }
  // var event = {events: [
  //     {
  //       title: 'Event 1',
  //       start: '2016-04-17'
  //     },
  //     {
  //       title: 'Event 2',
  //       start: '2016-04-18'
  //     },
  //     {
  //       title: 'Event 3',
  //       start: '2016-04-09T16:00:00'
  //     }
  //   ]};
  //res.send(event)
  
    
  // $(function() { // document ready
  
  // $('#calendar').fullCalendar({
  //   header: {
  //     left: 'prev,next today',
  //     center: 'title',
  //     right: 'month,agendaWeek,agendaDay'
  //   },
  //   defaultDate: '2016-04-19',
  //   events: [
  //     {
  //       title: 'Event 1',
  //       start: '2016-04-13'
  //     },
  //     {
  //       title: 'Event 2',
  //       start: '2016-04-14',
  //     },
  //     {
  //       title: 'Event 3',
  //       start: '2016-04-15'
  //     }
  //     ]
  //   });
  //  }); 
  // Event.find({
  //   title: req.session.title
  // })
  // .populate('event')
  // .exec(function(err, docs){
  //   if(err) {
  //     console.log(err);
  //   }else {
  //     console.log(docs)
  //     res.send(docs);
  //   }
  //});
