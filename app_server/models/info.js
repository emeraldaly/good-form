var mongoose = require("mongoose");
  
var Schema = mongoose.Schema;

var InfoSchema= new Schema({
title:String,
information:String,
//which classes get to see it
class:{
       type: Schema.Types.ObjectId,
        ref: 'Class'
      },
      //single poster info
poster:{type: Schema.Types.ObjectId,
				ref:"User"}
});

var Info = mongoose.model('Info', InfoSchema);

module.exports = Info;