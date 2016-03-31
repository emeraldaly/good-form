	var mongoose = require("mongoose");
  
  var Schema = mongoose.Schema;

  var UserSchema = new Schema({
		_class: [{
       type: Schema.Types.ObjectId,
        ref: 'Class'
      }],
      _organization: [{
       type: Schema.Types.ObjectId,
        ref: 'organization'
      }],
    linkedin: String,
    github: String,
    admin: Boolean,
    role: String,
    firstname:String,
    lastname:String,
    email:String,
    password: String,
	});


var User = mongoose.model('User', UserSchema);

module.exports = User;