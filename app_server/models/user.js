	var mongoose = require("mongoose");
  
  var Schema = mongoose.Schema;

  var UserSchema = new Schema({
		name: { 
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    hash: String,
    salt: String,
    linkedin: String,
    github: String,
    admin: Boolean,
    role: String,
    _class: [{
       type: Schema.Types.ObjectId,
        ref: 'Class'
      }]
  });

var User = mongoose.model('User', UserSchema);

module.exports = User;