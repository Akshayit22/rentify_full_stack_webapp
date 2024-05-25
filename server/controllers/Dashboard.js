const User = require('../models/User');
const Blog = require('../models/Blog');
const jwt = require("jsonwebtoken");

exports.dashboard = async(req,res) =>{
	try{
		const {id,email} = req.user;
		console.log("In the dashboard controller", req.user.email);

		const user = await User.findOne({email}).populate('additionalDetails').exec();

		const AllBlogsOfUser = await Blog.find({user:user})
			.populate("user")
			.populate({
				path:'comments',
				populate:{
					path:'user',
				}
			})
			.exec();

		return res.status(200).json({
			success: true,
			user:user,
			data:AllBlogsOfUser,
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
