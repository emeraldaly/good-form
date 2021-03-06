	var mongoose = require("mongoose");
  var Schema = mongoose.Schema;
  var SALT_WORK_FACTOR = 10;
  var bcrypt = require("bcryptjs");

  var UserSchema = new Schema({
    _class: [{
     type: Schema.Types.ObjectId,
     ref: 'Class'
   }],
   _organization: {
     type: Schema.Types.ObjectId,
     ref: 'organization'
   },
   linkedin: String,
   github: String,
   portfolio:String,
   admin: Boolean,
   firstname:String,
   lastname:String,
   email:String,
   username: { type: String, required: true, index: { unique: true } },
   password: { type: String, required: true },
   assignment:[{
     type: Schema.Types.ObjectId,
     ref: 'Homework',
   //when completed, it will be removed from the array, and put in the assignment's array of completed"

   }],
 });

  UserSchema.pre('save', function(next) {
   var user = this;
  
// // only hash the password if it has been modified (or is new)

// // generate a salt
bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
  if (err) return next(err);

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
      });
  });
});

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

var User = mongoose.model('User', UserSchema);
module.exports = User;