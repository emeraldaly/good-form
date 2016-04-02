var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var session = require('express-session');
//bcrypt
var User = mongoose.model('User');
// var session = require('express-session');

passport.use(new LocalStrategy(
  function(username, password, done) {
console.log(username);
console.log(password);
User.findOne({ username: username}, function (err, user) {
if (err) {return done(err); }

if (!user) {
	return done (null, false, {
		message: 'Incorrect username.'
	})
}
})
}))

passport.serializeUser(function(user, done) {
	done(null, user.username);

});

passport.deserializeUser(function(username, done) {
done(null, {username: username})

});

module.exports = passport;