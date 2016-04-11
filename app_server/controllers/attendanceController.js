var Class = require("../models/class");
var User = require("../models/user");
var Attendance = require("../models/attendance");

exports.deleteAttend = function(req, res){
	Attendance.remove({_id:req.session.editAttend}, function(err, data){
		if (err){
			console.log(err)
		}
		else{
			res.send(data)
		}
	})
}

exports.editAttend = function(req, res){
	debugger
	req.session.editAttend = req.body.editAttend
	res.send("got id")
}

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
			"student.$.here": req.body.here
		}
	}, {
		safe: true,
		upsert: true
	}, function(err, model) {
		debugger
		if (err){
		console.log(err)
		}
		res.send("it worked?")
	})
};

exports.viewAttendDates = function (req,res){
	Attendance.find({_class:req.session.editClassId})
	.exec(function(err, docs){
		if (err){
			console.log(error)
		}
		else{
			res.send(docs)
		}
	})
	}

exports.getAttend = function(req,res){
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
			var array = docs[0]._doc.role
			var studentArray = []

			for (var i = 0; i < array.length; i++) {
				if (array[i]._doc.roleType == "student"){
					studentArray.push(array[i])
				}
			}
			

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
					debugger
					
					console.log(studentArray)
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