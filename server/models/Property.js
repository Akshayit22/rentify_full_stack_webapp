const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
	title:{
		type:String,
		require:true,
	},
	description:{
		type:String,
		require:true,
	},
	image:{
		type:String,
		require:true,
	},
	rent:{
		type:String,
		require:true,
	},
	deposite:{
		type:String,
		require:true,
	},
	roomType:{
		type:String,
		require:true,
	},
	area:{
		type:String,
		require:true,
	},
	city:{
		type:String,
		require:true,
	},
	constructedIn:{
		type:String,
		require:true,
	},
	NearestHospitalDistance:{
		type:String,
		require:true,
	},
	createdAt:{
		type:Date,
		default:Date.now(),
	},
	owner:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"User",
		require:true,
	},
	LikesCount:{
		type:Number,
		default:0,
		require:false,
	}

});

module.exports = mongoose.model("Property",propertySchema);
