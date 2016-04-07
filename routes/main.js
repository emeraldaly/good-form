var hwCtrl = require("../app_server/controllers/hwController");
var infoCtrl = require("../app_server/controllers/infoController");
var classCtrl = require("../app_server/controllers/classController");
var orgCtrl = require("../app_server/controllers/orgController");
var usrCtrl = require("../app_server/controllers/usrController");
var passport = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var User = require('../app_server/models/user');

module.exports = function (app) {

  app.use(require('express-session')(
  {
    secret: 'a_rabbit_named_bruno',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: ( 4 * 60 * 60 * 1000 )
    }
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  //User Controls
 
  app.post('/adduser', usrCtrl.addUser);
  app.get('/viewAssignments', usrCtrl.viewAssignments);
  app.post('/updateUser', usrCtrl.updateUser);
  app.post('/newUser', usrCtrl.newUser);
  app.get('/getAllUsers', usrCtrl.getAllUsers);
  app.post('/login',
  passport.authenticate('login'),
  function(req, res){
    res.send("Fine Elie....");
  });

  //Org Controls
  app.get('/allOrgs', orgCtrl.showAllOrgs);
  app.get('/orgsClasses', orgCtrl.getOrgsClasses);
  app.post('/register', orgCtrl.addOrg);

  //HW Controls
  app.post('/submitHw', hwCtrl.submitHw);
  app.post('/createHomework', hwCtrl.createHw);
  app.post("/thisHomework", hwCtrl.thisHomework);

  //info controls
  app.get('/viewInfo', infoCtrl.viewInfo);
  app.post("/createInfo", infoCtrl.createInfo);

  //Class Controls
  app.get("/updateThisClass", classCtrl.updateThisClass);
  app.get('/getClassUsers', classCtrl.getClassUsers);
  app.post('/createClass', classCtrl.createClass);
  app.get('/showClasses', classCtrl.showClasses);
  app.post('/editClassId', classCtrl.editClassId)
  app.post('/updateClass', classCtrl.updateClass)


  app.get('*', usrCtrl.defRoute);

//passport
passport.serializeUser(function(user, done) {
  console.log('serialize')

  done(null, user);
});

passport.deserializeUser(function(user, done) {
  console.log('deserialize')

  done(null, user);
});


passport.use('login', new LocalStrategy({
  passReqToCallback : true
},
function(req, username, password, done) {
    // check in mongo if a user with username exists or not
    console.log("username");
    User.findOne({ 'username' :  username },
      function(err, user) {
        // In case of any error, return using the done method
        if (err)
          return done(err);
        // Username does not exist, log error & redirect back
        if (!user){
          console.log('User Not Found with username '+username);
          return done(null, false,
            console.log('message', 'User Not found.'));
        }
        // User exists but wrong password, log the error
        if (!isValidPassword(user, password)){

          return done(null, false,
            console.log('message', 'Invalid Password'));
        }
        // User and password both match, return user from
        // done method which will be treated like success
        // debugger
        req.session.user = user;
        req.session.organization = user._doc._organization
        console.log(user)
        console.log(req.session.user)
        return done(null, user);
      }
      );
  }));

var isValidPassword = function(user, password){


  return bcrypt.compareSync(password, user.password);
}



}
