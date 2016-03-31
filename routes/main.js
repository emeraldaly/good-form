var usrCtrl = require('../app_server/controllers/usrController');
var hwCtrl = require("../app_server/controllers/hwController");
var classCtrl = require("../app_server/controllers/classController");
var orgCtrl = require("../app_server/controllers/orgController");

module.exports = function (app) {
  //User Controls
  app.post('/adduser', usrCtrl.addUser);
  //Org Controls
  app.post('/register', orgCtrl.addOrg);
  //HW Controls
  app.post('/submitHw', hwCtrl.submitHw);
  //Class Controls
  app.post('/addClass', classCtrl.addClass);

  app.get('*', usrCtrl.defRoute);
};
