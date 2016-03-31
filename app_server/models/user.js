	var mongoose = require("mongoose");
  var crypto = require("crypto");
  var jwt = require("jsonwebtoken");

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

  UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  };

  UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;

  };

  UserSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
      _id : this._id,
      email: this.email,
      name: this.name,
      exp: parseInt(expiry.getTime() / 1000),
    }, process.env.JWT_SECRET);
};
  
  

var User = mongoose.model('User', UserSchema);

module.exports = User;