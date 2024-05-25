const mongoose = require('mongoose');


const ContactUsSchema = new mongoose.Schema({
	email:{
		type:String,
		require:true,
	},
	name:{
		type:String,
		require:true,
	},
	message:{
		type:String,
		require:true,
	},
	createdAt:{
		type:Date,
		default:Date.now(),
	}

});

module.exports = mongoose.model("ContactUs",ContactUsSchema);
