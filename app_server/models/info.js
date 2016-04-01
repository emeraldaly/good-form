var mongoose = require("mongoose");
  
var Schema = mongoose.Schema;

var InfoSchema= new Schema({
title:String,
infomation:String,

//which classes get to see it
class:[{
       type: Schema.Types.ObjectId,
        ref: 'class'
      }],
      //single poster info
poster:{type: Schema.Types.ObjectId,
				ref:User}
});

var Info = mongoose.model('Info', InfoSchema);

module.exports = Info;