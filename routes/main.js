var usrCtrl = require('../app_server/controllers/usrController');
var hwCtrl = require("../app_server/controllers/hwController");
var classCtrl = require("../app_server/controllers/classController");
var orgCtrl = require("../app_server/controllers/orgController");

module.exports = function (app) {
  app.post('/adduser', usrCtrl.addUser);
  app.post('/register', orgCtrl.addOrg);
  app.get('*', usrCtrl.defRoute);
};
