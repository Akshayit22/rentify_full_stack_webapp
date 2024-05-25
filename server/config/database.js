const mongoose = require('mongoose');
require('dotenv').config();

exports.connect = () =>{
	mongoose.connect(process.env.Database_url,{
		useNewUrlParser:true, useUnifiedTopology:true,
	})
	.then(()=>console.log('DB connection Successful.'))
	.catch((error)=>{
		console.log("DB connection Failed");
		console.error(error);
		process.exit(1);
	})
};