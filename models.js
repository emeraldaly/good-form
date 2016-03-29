var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Organization = new Schema({
	name:String,
	address:String,
	website:String,
	class:[{
       type : Schema.Types.ObjectId,
        ref : 'class'
      }]
});
var Class= new Schema({
	name:String
	_organization: {
       type: Schema.Types.ObjectId,
        ref: 'organization'
      },
  user:[{
       type : Schema.Types.ObjectId,
        ref : 'user'
      }]
});

	var User = new Schema({
		_class: {
       type: Schema.Types.ObjectId,
        ref: 'class'
      },
    linkedin:String,
    github:String,
    admin:Boolean,
    role:String,
    username:String,
    password:String,
	});



// class:
// name:
// refrences organiztion
// refrences students

// user
// linkin
// github
// class refrences class
// role
// admin:Boolean 

// homework:
// refrences: class
// refrences: question
// due date:


// question:
// refrences:answer
// actualy question

// line height:
// answer height:
