var user = require("../models/user");
var organization = require("../models/organization");
var homework = require("../models/homework");
var classy = require("../models/class");


exports.addUser = function(req, res){
 	// var orgx = new organization({name: req.body.organizationName, address:req.body.address, website:req.body.website});
		// 	orgx.save(function (err, data) {
		// 		if (err) {
		// 			var dummyvar;
		// 		} else {
					
		// 			console.log(data._doc._id)
		// 		}

		// 	});
	var userx = new user({firstname: req.body.userFirstName,
		lastname:req.body.userLastName,
		email:req.body.userEmail,
		password:req.body.userPassword,
		admin:true,
		// currently hardwired in until we can do a req value
	 _organization:"56fd84b7b49810d615bb1e21",
	});
	userx.save(function (err, user) {
		if (err) {
			console.log(err)
		} else {
			console.log("saved")
		}
		// need req.session.organizationId
		var id = "56fd84b7b49810d615bb1e21";
			organization.findByIdAndUpdate(id,  {$push: {"user": user}},
			{safe: true, upsert: true}, function(err, model) {
				console.log("it worked?")
			})






			})		
		

}

exports.defRoute = function(req, res){

 res.sendFile(process.cwd() + '/public/index.html');
}