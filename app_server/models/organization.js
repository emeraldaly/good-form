var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var OrganizationSchema = new Schema({
	name: {
    type: String,
    unique: true
  },
	address: String,
	website: String,
	classes:[{
    type : Schema.Types.ObjectId,
    ref : 'Class'
  }]
});

var Organization = mongoose.model('Organization', OrganizationSchema);

module.exports = Organization;
