var mongoose = require("mongoose");
  
var Schema = mongoose.Schema;


var ClassSchema= new Schema({
	name: String,
	datetime:String,
	_organization: [{
       type: Schema.Types.ObjectId,
        ref: 'Organization'
      }],
      role:[{
        _user:{
        type : Schema.Types.ObjectId,
        ref : 'User'
        },
        roleType:{type:String, default:"Lanna"}
      }]
});

var Class = mongoose.model('Class', ClassSchema);

module.exports = Class;