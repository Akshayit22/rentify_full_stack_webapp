const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
	title:{
		type:String,
		require:true,
	},
	content:[{
		header:String,
		body:String,
	}],
	image:{
		type:String,
		require:true,
	},
	referenceLinks:[{
		type:String,
	}],
	createdAt:{
		type:Date,
		default:Date.now(),
	},
	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"User",
		require:true,
	},
	comments:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:"Comment"
	}],
	category:[{
		type:String,
		require:true
	}]

});

module.exports = mongoose.model("Blog",blogSchema);
