var Class = require("../models/class");
var User = require("../models/user");
var Attendance = require("../models/attendance");



exports.updateAttend = function(req, res) {
	console.log(req.session.editAttend)
	Attendance.update({
		$and: [{
			"_id": req.session.editAttend
		}, {
			"student._user": req.body.id
		}]
	}, {
		$set: {
			"student.$.here": true
		}
	}, {
		safe: true,
		upsert: true
	}, function(err, model) {
		console.log("it worked?")
	})
};



exports.getAttend = function(req,res){
	
	console.log(req.session.editClassId)
	console.log(req.session.editAttend)
	Attendance.find({_id:req.session.editAttend})
	.populate('student._user')
    .exec(function(err, docs) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        
        console.log(docs)
        res.send(docs);
      }
    })
}
exports.newAttendance = function(req,res){
Class.find({
		_id: req.session.editClassId
	})
	.exec(function(err, docs) {
		console.log(docs)
		if (err) {
			console.log(err);
			
		} else {
			var studentArray = docs[0]._doc.role
			var newAttend = new Attendance({
				_class: req.session.editClassId,
			})
			newAttend.save(function(err, doc) {
				var editAttend = doc._doc._id
				req.session.editAttend = editAttend;
					console.log(req.session.editAttend)
				if (err) {
					console.log(err);
				} else {
					res.send("starting loop")
					for (var i = 0; i < studentArray.length; i++) {
						Attendance.update({
							_id: doc._doc._id
						}, {
							$push: {
								student: {
									_user: studentArray[i]._doc._user
								}
							}
						}, {
							safe: true,
							upsert: true
						}, function(err, model) {
	
							console.log("it worked?")
						});
					}
				}

			});
		}
	});


}