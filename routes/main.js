var usrCtrl = require('../app_server/controllers/usrController');

module.exports = function (app) {
  app.get('/test', usrCtrl.test);
};
