const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			trim: true,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		token: {
			type: String,
		},
		image:{
			type:String,
			require:true,
		},
		additionalDetails: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Profile",
		},
		savedBlogs:[{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Blog",
		}],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User',userSchema);