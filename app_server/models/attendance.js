var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AttendanceSchema= new Schema({
	_class: {
   type: Schema.Types.ObjectId,
   ref: 'Class'
 },
 student:[{
  _user:{
    type : Schema.Types.ObjectId,
    ref : 'User'
  },
  here:{type:Boolean, default:false}
}],
date:{type:Date, default:Date.now}
});

var Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = Attendance;

