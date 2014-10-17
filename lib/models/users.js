var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Users = new Schema({
	name : String,
	email: String,
	password: String,
	created: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model('Users', Users);