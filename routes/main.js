var usrCtrl = require('../app_server/controllers/usrController');
var hwCtrl = require("../app_server/controllers/hwController");
var classCtrl = require("../app_server/controllers/classController");
var orgCtrl = require("../app_server/controllers/orgController");


module.exports = function (app) {
  //User Controls
  app.post('/adduser', usrCtrl.addUser);
  app.post('/newUser', usrCtrl.newUser);
  app.post('/login', usrCtrl.login);
  app.get('*', usrCtrl.defRoute);

  //Org Controls
  app.get('/allOrgs', orgCtrl.showAllOrgs);
  app.get('/orgsClasses', orgCtrl.getOrgsClasses);
  app.post('/register', orgCtrl.addOrg);

  //HW Controls
  app.post('/submitHw', hwCtrl.submitHw);

  //Class Controls
  app.get('/getClassUsers', classCtrl.getClassUsers)
  app.post('/addClass', classCtrl.addClass);

  // app.get('/usertest', usrt.usertest);


  app.get('*', usrCtrl.defRoute);

  app.use(require('express-session')({
    secret: 'keyboardcat',
    resave: true,
    saveUninitialized: true,
    cookie : { secure : false, maxAge : (4 * 60 * 60 * 1000) }, // 4 hours
  }));




};
