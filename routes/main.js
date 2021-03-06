var hwCtrl = require("../app_server/controllers/hwController");
var infoCtrl = require("../app_server/controllers/infoController");
var classCtrl = require("../app_server/controllers/classController");
var orgCtrl = require("../app_server/controllers/orgController");
var attendance = require("../app_server/controllers/attendanceController");
var usrCtrl = require("../app_server/controllers/usrController");
var lecture = require("../app_server/controllers/lectureController");
var event = require("../app_server/controllers/bEventController");
var passport = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var User = require('../app_server/models/user');
var usernameExport;

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
  app.get('/', usrCtrl.firstPage);
  app.get("/currentUser", usrCtrl.currentUser);
  app.post('/adduser', usrCtrl.addUser);
  app.get('/viewAssignments', usrCtrl.viewAssignments);
  app.post('/updateUser', usrCtrl.updateUser);
  app.post('/newUser', usrCtrl.newUser);
  app.get('/getUser', usrCtrl.getUser);
  app.get('/getAllUsers', usrCtrl.getAllUsers);
  app.get('/getAllUsersGithub', usrCtrl.getAllUsersGithub);
  app.post('/login',
    passport.authenticate('login',
     { successRedirect: '/home',
     failureRedirect: '/?msg=failure'
   })
    );
  app.get('/adminStatus', usrCtrl.adminStatus);

  //Org Controls
  app.get('/allOrgs', orgCtrl.showAllOrgs);
  app.get('/orgsClasses', orgCtrl.getOrgsClasses);
  app.get('/registration', orgCtrl.showRegistration);
  app.post('/register', usrCtrl.newUser);

  // lecture Controls
  app.post("/updateLecture", lecture.updateLecture);
  app.post("/createLecture", lecture.createLecture);
  app.get("/viewLecture", lecture.viewLecture)
  app.post("/deleteLecture", lecture.deleteLecture)
  app.post("/thisLecture", lecture.thisLecture)
  app.get("/updateLectureInfo", lecture.updateLectureInfo)
  //for getting all the lectures
  // app.get("/viewLecture", lecture.viewLecture)
  //for getting the lectures for the logged in user
  app.get("/myLecture", lecture.myLecture)
  //HW Controls
  app.post('/submitHw', hwCtrl.submitHw);
  app.post('/createHomework', hwCtrl.createHw);
  app.post("/thisHomework", hwCtrl.thisHomework);
  app.get("/viewHomeworkByClass", hwCtrl.viewHomeworkByClass)
  app.get("/viewSubmissions", hwCtrl.viewSubmissions)
  app.get("/uncompletedSubmission", hwCtrl.uncompletedSubmission)
  //info controls
  app.get('/viewInfo', infoCtrl.viewInfo);
  app.post("/createInfo", infoCtrl.createInfo);
  //attendance controls
  app.get("/viewAttendDates", attendance.viewAttendDates)
  app.post('/newAttendance', attendance.newAttendance);
  app.get("/getAttend", attendance.getAttend);
  app.post("/updateAttend", attendance.updateAttend);
  app.post("/editAttend", attendance.editAttend);
  app.post("/deleteAttend", attendance.deleteAttend);

  //Class Controls
  app.post("/removeFromClass", classCtrl.removeFromClass)
  app.get("/myclass", classCtrl.myClass);
  app.get("/updateThisClass", classCtrl.updateThisClass);
  app.get('/getClassUsers', classCtrl.getClassUsers);
  app.post('/createClass', classCtrl.createClass);
  app.get('/showClasses', classCtrl.showClasses);
  app.get("/viewThisClass", classCtrl.viewThisClass)
  app.post('/editClassId', classCtrl.editClassId)
  app.post('/updateClass', classCtrl.updateClass);
  app.post("/deleteClass", classCtrl.deleteClass);

  app.post('/addEvent', event.createEvent);
  app.get('/getEvent', event.showEvent);
  app.get('/home', usrCtrl.defRoute);
  app.get("/orgName", orgCtrl.orgName)

  app.get('/logout', function (req, res){
  // req.logOut();
  req.session.destroy(function (err) {
    res.sendFile(process.cwd() + '/public/splash.html');
  });
});



//passport
passport.serializeUser(function(user, done) {
  console.log('serialize', user);

  done(null, user);
});

passport.deserializeUser(function(user, done) {
  // console.log('deserialize');
  // console.log('user: ' + user.username);
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
        usernameExport = user;
        req.session.organization = user._doc._organization
        console.log(req.session.user)
        return done(null, user);
      }
      );
  }));


var isValidPassword = function(user, password){
  return bcrypt.compareSync(password, user.password);
}



}


