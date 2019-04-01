const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "users"
	},
	handle: {
		type: String,
		required: true,
		max: 40
	},

	status: {
		type: String,
		required: true
	},
	bio: {
		type: String
	},
	fitbitusername: {
		type: String
	},
	social: {
		twitter: {
			type: String
		},
		facebook: {
			type: String
		},
		instagram: {
			type: String
		}
	},
	userSince: {
		type: Date,
		default: Date.now
	}
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
