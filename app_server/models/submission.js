var mongoose = require("mongoose");
  
var Schema = mongoose.Schema;

var SubmissionSchema= new Schema({
  _homework:{
       type: Schema.Types.ObjectId,
        ref: 'Homework'
      },
	heroku: String,
	github:String,
	student: {
       type: Schema.Types.ObjectId,
        ref: 'User'
      }
});

var Submission = mongoose.model('Submission', SubmissionSchema);

module.exports = Submission;