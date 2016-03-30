var mongoose = require("mongoose");
  
var Schema = mongoose.Schema;


var ClassSchema= new Schema({
	name: String,
	organization: [{
       type: Schema.Types.ObjectId,
        ref: 'Organization'
      }],
  user:[{
       type : Schema.Types.ObjectId,
        ref : 'User'
      }]
});

var Class = mongoose.model('Class', ClassSchema);

module.exports = Class;