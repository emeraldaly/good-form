var mongoose = require("mongoose");
  
var Schema = mongoose.Schema;

var LectureSchema= new Schema({
github:String,
videoLink:String,
info:String,
className:String,
_class:{
       type: Schema.Types.ObjectId,
        ref: 'Class'
      },
      //single poster Lecture
poster:{type: Schema.Types.ObjectId,
				ref:"User"},
				date:{type:String, default:Date.now}
});

var Lecture = mongoose.model('Lecture', LectureSchema);

module.exports = Lecture;