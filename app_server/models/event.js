var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
  title: String,
  start: String
});

var Event = mongoose.model('Event', eventSchema);
module.exports = Event;