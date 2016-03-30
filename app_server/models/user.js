	var mongoose = require("mongoose");
  
  var Schema = mongoose.Schema;

  var UserSchema = new Schema({
		_class: [{
       type: Schema.Types.ObjectId,
        ref: 'Class'
      }],
    linkedin: String,
    github: String,
    admin: Boolean,
    role: String,
    username: String,
    password: String,
	});

var User = mongoose.model('User', UserSchema);

module.exports = User;