var Class = require("../models/class");
var User = require("../models/user");
var Attendance = require("../models/attendance");

exports.newAttendance = function(req,res){

    
Class.find({
		_id: req.session.editClassId
	})
	.exec(function(err, docs) {
		console.log(docs)
		if (err) {
			console.log(err);
			res.send(err);
		} else {

			//        docs[0]._doc.role
			var studentArray = docs[0]._doc.role

			var newAttend = new Attendance({
				_class: req.session.editClassId,
			})
			newAttend.save(function(err, doc) {
				if (err) {
					console.log(err);
				} else {
					debugger
					console.log(studentArray)
					for (var i = 0; i < studentArray.length; i++) {

						Attendance.update({
							_id: doc._doc._id
						}, {
							$push: {
								students: {
									_user: studentArray[i]._doc._user
								}
							}
						}, {
							safe: true,
							upsert: true
						}, function(err, model) {
							debugger
							console.log("it worked?")
						})
					}
				}
			})
		}
	})

}