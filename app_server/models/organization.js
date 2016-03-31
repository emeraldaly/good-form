var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var OrganizationSchema = new Schema({
	name: String,
	address: String,
	website: String,
	class:[{
       type : Schema.Types.ObjectId,
        ref : 'Class'
      }],
  user:[{
       type : Schema.Types.ObjectId,
        ref : 'user'
      }]
});

var Organization = mongoose.model('Organization', OrganizationSchema);

module.exports = Organization;