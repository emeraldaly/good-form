var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var OrganizationSchema = new Schema({
	name: {
    type: String,
    unique: true
  },
	address: String,
	website: String,
	class:[{
    type : Schema.Types.ObjectId,
    ref : 'Class'
  }],
  user:[{
    type : Schema.Types.ObjectId,
    ref : 'User'
  }]
});

var Organization = mongoose.model('Organization', OrganizationSchema);

module.exports = Organization;
