var usrCtrl = require('../app_server/controllers/usrController');

module.exports = function (app) {
  app.get('/adduser', usrCtrl.addUser);
  app.get('*', usrCtrl.defRoute);
};
