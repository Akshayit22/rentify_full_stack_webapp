const Property = require('../models/Property');
const User = require('../models/User')


/*
{title,description,image,rent,deposite,roomType,area,city,constructedIn,NearestHospitalDistance,owner}
*/
exports.createProperty = async (req, res) => {
	try {
		const {title,description,rent,deposite,roomType,area,city,constructedIn,NearestHospitalDistance} = req.body;
		const { email, id } = req.user;
		const userDetails = await User.findOne({ email });
		
		if (!title || !description || !rent || !deposite || !roomType || !area || !city || !constructedIn || !NearestHospitalDistance) {
			return res.status(403).send({
				success: false,
				message: "All Fields are required",
			});
		}
		const image = `https://api.dicebear.com/5.x/initials/svg?seed=${roomType}`;

		const NewProperty = await Property.create({
			title,description,image,rent,deposite,roomType,area,city,constructedIn,NearestHospitalDistance,
			owner:userDetails,
		});
		console.log("Property Created :", NewProperty);


		return res.status(200).json({
			success: true,
			NewProperty:NewProperty,
			message: "New Property Created Successfully.",
		});


	}
	catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Internal server error while creating propertyId.",
		});
	}
}

exports.updateProperty = async (req, res) => {
	try {
		const { propertyId,title,description,rent,deposite,roomType,area,city,constructedIn,NearestHospitalDistance} = req.body;
		const { email, id } = req.user;
		const userDetails = await User.findOne({ email });

		if (!propertyId || !title || !description || !rent || !deposite || !roomType || !area || !city || !constructedIn || !NearestHospitalDistance) {
			return res.status(403).send({
				success: false,
				message: "All Fields are required",
			});
		}

		const NewProperty = await Property.findByIdAndUpdate({_id:propertyId},
			{
				title,description,rent,deposite,roomType,area,city,constructedIn,NearestHospitalDistance,
			},
			{new:true});
		console.log("Property Updated :", NewProperty);

		return res.status(200).json({
			success: true,
			NewProperty:NewProperty,
			message: "Property Updated successfully",
		});
	}
	catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Internal server error, while updating propertyId.",
		});
	}
}

exports.deleteProperty = async (req,res) =>{
	try{
		const {propertyId} = req.body;

		const resp = await Blog.findByIdAndDelete(
			{_id:propertyId}
		);


		return res.status(200).json({
			success: true,
			message: "propertyId deleted successfully",
		});
	}
	catch(error){
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Internal server error, while deleting propertyId.",
		});
	}
}

exports.getProperty = async(req,res) =>{
	try{
		const id = req.params.id || req.body.id;

		if(!id || id  === undefined || id === null){
			return res.status(403).send({
				success: false,
				message: "ID Fields are required",
			});
		}

		const PropertyDetails  = await Property.find({_id:id})
				.populate("owner")
				.exec();

		if(!PropertyDetails){
			return res.status(300).send({
				success: false,
				message: "Property doen't exist in database.",
			});
		}

		return res.status(200).json({
			success: true,
			PropertyDetails,
			message: "Property details fetched successfully",
		});

	}
	catch(error){
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Internal server error, while fetching a Property.",
		});
	}
}

exports.getAllProperty = async (req, res) => {
	try {
		const AllProperty = await Blog.find({})
			.populate("owner")
			.exec();
		

		return res.status(200).json({
			success: true,
			data: AllProperty,
			message: "All Properties fetched successfully",
		});
	}
	catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Internal server error, while fetching  all properties",
		});
	}
}

