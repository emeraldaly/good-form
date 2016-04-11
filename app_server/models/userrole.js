var mongoose = require("mongoose");
  
var Schema = mongoose.Schema;

var RoleSchema= new Schema({
_user:{
       type: Schema.Types.ObjectId,
        ref: 'Class'
      },
_class:{
       type: Schema.Types.ObjectId,
        ref: 'Class'
      },
//which classes get to see it
role:String,
});

var Role = mongoose.model('Role', RoleSchema);

module.exports = Role;