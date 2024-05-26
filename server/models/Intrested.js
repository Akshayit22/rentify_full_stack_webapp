const mongoose = require('mongoose');


const IntrestedSchema = new mongoose.Schema({
	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"User",
		require:true,
	},
	property:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"Property",
		require:true,
	},
	createdAt:{
		type:Date,
		default:Date.now(),
	}
});

module.exports = mongoose.model("Intrested",IntrestedSchema);
