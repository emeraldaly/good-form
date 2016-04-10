var mongoose = require("mongoose");
  
var Schema = mongoose.Schema;

var AttendanceSchema= new Schema({
	_class: {
       type: Schema.Types.ObjectId,
        ref: 'Class'
      },
      students:[{
        _user:{
        type : Schema.Types.ObjectId,
        ref : 'User'
        },
        here:{type:Boolean, default:false}
      }]
});

var Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = Attendance;

class
users:[{
  userid:
  present:boolean
}]