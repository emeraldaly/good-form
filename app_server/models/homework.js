	var mongoose = require("mongoose");
	
	var Schema = mongoose.Schema;

	var HomeworkSchema = new Schema({
		_class: [{
			type: Schema.Types.ObjectId,
			ref: 'Class'
		}],
		linkedin: String,
		github: String,
		admin: Boolean,
		role: String,
		username: String,
		password: String,
	});

	var Homework = mongoose.model('Homework', HomeworkSchema);

	module.exports = Homework;