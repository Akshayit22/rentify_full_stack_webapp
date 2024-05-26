const User = require('../models/User');
const Property = require('../models/Property');
const Intrested = require('../models/Intrested');

exports.dashboard = async(req,res) =>{
	try{
		const {id,email} = req.user;
		const userDetails = await User.findOne({ email });
		console.log("In the dashboard controller", req.user.email);

		//like and intrested remain
		const OwnedProperties = await Property.find({owner:userDetails});

		const IntrestedProperties = await Intrested.find({user:userDetails}).populate('property').exec();

		return res.status(200).json({
			success: true,
			OwnedProperties,
			IntrestedProperties,
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
