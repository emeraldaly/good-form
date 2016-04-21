$(document).ready(function () {

  // page is now ready, initialize the calendar...


  $('#calendar').fullCalendar({

    events: function (start, end, timezone, callback) {
      $.ajax({
        method: 'GET',
        url: '/getEvent',
        success: function (result) {
          var events = [];
          for (i = 0; i < result.length; i++) {
            events.push({
              title: result[i].title,
              start: result[i].start, // will be parsed
            });
          };
          callback(events);
        }
      });
    }
  });
});

// });

$("#thisbutton").click(function () {

  $('#calendar').fullCalendar("refetchEvents");

});




