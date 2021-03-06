var mongoose = require("mongoose");

var Schema = mongoose.Schema;
  //can we add an input for the week and date/time submitted?
  var HomeworkSchema = new Schema({
  	_class: {
  		type: Schema.Types.ObjectId,
  		ref: 'Class'
  	},
  	poster: {
  		type: Schema.Types.ObjectId,
  		ref: 'User'
  	},
  	_submission:[{
  		type: Schema.Types.ObjectId,
  		ref: 'Submission'}
  		],
		//by user
		//by week
		duedate:String,
		duetime:String,
		name: String,
		description: String,
		uncompleted:[{
			type: Schema.Types.ObjectId,
			ref: 'User'
		}]
	});

  var Homework = mongoose.model('Homework', HomeworkSchema);

  module.exports = Homework;
