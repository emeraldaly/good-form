// var ctrl = require('../app_server/controllers');
var usrCtrl = require('../app_server/controllers/usrController');

module.exports = function(app){
  app.get('/', usrCtrl.test);
};
