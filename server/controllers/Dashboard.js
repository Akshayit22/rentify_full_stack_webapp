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

exports.likeOrDislike = async(req,res) =>{
	try{
		const {PropertyId,mode} = req.body;


		const {id,email} = req.user;
		const userDetails = await User.findOne({ email });
		console.log("In the likeOrDislike controller", req.user.email);

		const PropertyDetails = await Property.findById({PropertyId});

		if (!PropertyId || !mode) {
			return res.status(403).send({
				success: false,
				message: "All Fields are required",
			});
		}

		if(mode === "Like"){
			const saved = await Property.findByIdAndUpdate(
					{_id:PropertyId},
					{LikesCount: PropertyDetails.LikesCount + 1},
					{new:true}
			)
		}
		else if(mode == "Dislike"){
			const saved = await Property.findByIdAndUpdate(
				{_id:PropertyId},
				{LikesCount: PropertyDetails.LikesCount - 1},
				{new:true}
		)
		}		

		return res.status(200).json({
			success: true,
			message: "Liked or Unliked successfully",
		});


	}
	catch(error){
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Error in likeOrDislike, Please try again.",
		});
	}
}

exports.intrested = async(req,res) =>{
	try{
		const {PropertyId} = req.body;


		const {id,email} = req.user;
		const userDetails = await User.findOne({ email });
		console.log("In the Intrested controller", req.user.email);

		const saveIntrested = await Intrested.create({
			user:id,
			property:PropertyId,
		})
						

		return res.status(200).json({
			success: true,
			saveIntrested,
			message: "Intreste saved successfully",
		});


	}
	catch(error){
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Error in Intrested, Please try again.",
		});
	}
}