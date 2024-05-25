const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	Blog:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"Blog",
	},
	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"User",
	},
	body:{
		type:String,
		require:true,
	},
	createdAt:{
		type:Date,
		default:Date.now(),
	},
});

module.exports = mongoose.model('Comment',commentSchema);