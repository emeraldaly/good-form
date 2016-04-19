// $(document).ready(function() {

//     // page is now ready, initialize the calendar...

//     $('#calendar').fullCalendar({
//       dayClick: function() {
//         alert('a day has been clicked!');
//       },
//       height: 300
//     });

// });
$(document).ready(function() {

    // page is now ready, initialize the calendar...

    $('#calendar').fullCalendar({
      events: function(start, end, timezone, callback) {
        $.ajax({
          method: 'GET',
          url: '/getEvent',
          success: function(result) {
            var events = [];
            for (i = 0; i < result.length; i++){
              events.push({
                title: result[i].title,
                        start: result[i].start // will be parsed
                      });
             };
        callback(events);
         }
    });
  }
})

    // $( "#thisbutton" ).click(function() {
    //   alert("thisbutton clicked");
    //   var eventTitles = [];
    //   var eventStarts = [];
    //   var events = [];
    //   $.ajax({ 
    //     method: 'GET',
    //     url: "/getEvent",
    //     success: function(result){
    //      console.log(result);
    //      for (i = 0; i < result.length; i++){

    //       eventTitles[i] = result[i].title;
    //       eventStarts[i] = result[i].start;

    //       events[i] = [eventTitles[i], eventStarts[i]];
    //       console.log(events);
    //     }
    //   }
    // });



   //  $('#calendar').fullCalendar({

   //   height: 300

   // });

   //  events: events;
   // : [
   //     {
   //       title: 'Event 1',
   //       start: '2016-04-13'
   //    },
   //    {
   //      title: 'Event 2',
   //      start: '2016-04-14',
   //    },
   //    {
   //      title: 'Event 3',
   //      start: '2016-04-15'
   //    }
   //    ]

 // });


});
