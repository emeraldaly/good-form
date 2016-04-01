var mongoose = require("mongoose");
  
var Schema = mongoose.Schema;


var ClassSchema= new Schema({
	name: String,
	datetime:String,
	organization: [{
       type: Schema.Types.ObjectId,
        ref: 'Organization'
      }],
  student:[{
       type : Schema.Types.ObjectId,
        ref : 'User'
      }],
      teacher:[{
       type : Schema.Types.ObjectId,
        ref : 'User'
      }],
      ta:[{
       type : Schema.Types.ObjectId,
        ref : 'User'
      }]
});

var Class = mongoose.model('Class', ClassSchema);

module.exports = Class;