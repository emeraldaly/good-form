var usrCtrl = require('../app_server/controllers/usrController');
var hwCtrl = require("../app_server/controllers/hwController");
var classCtrl = require("../app_server/controllers/classController");
var orgCtrl = require("../app_server/controllers/orgController");
var usrt = require("../app_server/controllers/usertestController");

module.exports = function (app) {
  //User Controls
  app.post('/adduser', usrCtrl.addUser);
  app.post('/newUser', usrCtrl.newUser);

  //Org Controls
  app.get('/allOrgs', orgCtrl.showAllOrgs);
  app.get('/orgsClasses', orgCtrl.getOrgsClasses);
  app.post('/register', orgCtrl.addOrg);

  //HW Controls
  app.post('/submitHw', hwCtrl.submitHw);

  //Class Controls
  app.get('/getClassUsers', classCtrl.getClassUsers)
  app.post('/createClass', classCtrl.createClass);

  // app.get('/usertest', usrt.usertest);


  app.get('*', usrCtrl.defRoute);
};
