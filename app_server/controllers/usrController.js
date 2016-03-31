var user = require("../models/user");
var organization = require("../models/organization");
var homework = require("../models/homework");
var classy = require("../models/class");


exports.addUser = function(req, res){
  	var orgx = new organization({name: req.body.organizationName, address:req.body.address, website:req.body.website});
			orgx.save(function (err, data) {
				if (err) {
					var dummyvar;
				} else {
					debugger
					console.log(data._doc._id)
					var userx = new user({firstname: req.body.userFirstName,
						lastname:req.body.userLastName,
						email:req.body.userEmail,
						password:req.body.userPassword,
						admin:true,
					 _organization:data._doc._id,
					});
			userx.save(function (err, data) {
				if (err) {
					console.log(err)
				} else {
					console.log("saved")
				}
			})
				}

			});


}

exports.defRoute = function(req, res){

 res.sendFile(process.cwd() + '/public/index.html');
}