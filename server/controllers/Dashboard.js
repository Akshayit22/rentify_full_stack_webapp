const User = require('../models/User');

exports.dashboard = async(req,res) =>{
	try{
		const {id,email} = req.user;
		console.log("In the dashboard controller", req.user.email);

		//like and intrested remain

		return res.status(200).json({
			success: true,
			
			message: "User details fetched successfully",
		});


	}
	catch(error){
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Error in Dashboard, Please try again.",
		});
	}
}
