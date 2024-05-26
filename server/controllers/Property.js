const Property = require('../models/Property');
const User = require('../models/User')


/*
{
    "title":"Room for Bachelors",
    "description":"Room for Bachelors both girls or boys only not for family",
    "rent":"1800",
    "deposite":"50000",
    "roomType":"1BHK",
    "area":"Baner",
    "city":"Pune",
    "constructedIn":"2019",
    "NearestHospitalDistance":"3 KM"
}

update

{
    "propertyId":"6652f24c6065d470e56b4a00",
    "title":"Room for Bachelors max 5",
    "description":"Room for Bachelors both girls or boys maximum 5 only, not for family",
    "rent":"1800",
    "deposite":"50000",
    "roomType":"1BHK",
    "area":"Baner",
    "city":"Pune",
    "constructedIn":"2018",
    "NearestHospitalDistance":"3.5 KM"
}

{title,description,image,rent,deposite,roomType,area,city,constructedIn,NearestHospitalDistance,owner}
*/
exports.createProperty = async (req, res) => {
	try {
		const {title,description,rent,deposite,roomType,area,city,constructedIn,NearestHospitalDistance} = req.body;
		const { email, id } = req.user;
		const userDetails = await User.findOne({ email });
		
		console.log(req.body);

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
			NewProperty,
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
			NewProperty,
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

		const resp = await Property.findByIdAndDelete(
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
		const PropertyId = req.params.id || req.body.id;
		console.log("id give is : "+PropertyId);
		if(!PropertyId || PropertyId  === undefined || PropertyId === null){
			return res.status(403).send({
				success: false,
				message: "ID Fields are required",
			});
		}

		const PropertyDetails  = await Property.findById({_id:PropertyId})
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
		const AllProperty = await Property.find({})
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

