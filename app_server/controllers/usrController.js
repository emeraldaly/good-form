var user = require("../models/user");
var organization = require("../models/organization");
var homework = require("../models/homework");
var classy = require("../models/class");


exports.addUser = function(req, res){
  	var userx = new user({username: "steph", role: "admin"});
			userx.save(function (err) {
				if (err) {
					var dummyvar;
				} else {
					console.log('record saved');
				}
			});


}

exports.defRoute = function(req, res){

 res.sendFile(process.cwd() + '/public/index.html');
}