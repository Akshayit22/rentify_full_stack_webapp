const User = require('../models/User');
const Profile = require('../models/Profile');
const Blog = require('../models/Blog');

exports.updateProfile = async(req,res) =>{
	try{
		const {gender, about, contact} = req.body;
		const {email,id} = req.user;

		if (!gender || !about || !contact || !id) {
			return res.status(403).send({
				success: false,
				message: "All Fields are required",
			});
		}

		const userDetails = await User.findById({_id:id});

		const UpdatedProfile = await Profile.findByIdAndUpdate(
			{_id:userDetails.additionalDetails},
			{gender:gender,about:about,contact:contact},
			{new:true}
		);

		return res.status(200).json({
			success: true,
			data: UpdatedProfile,
			message: "Profile Updated successfully",
		});

	}
	catch(error){
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Internal server error, while updating Profile.",
		});

	}
}

exports.getUserDetails = async(req,res) =>{
	try{
		const {email,id} = req.user;

		const UserDetails = await User.findById({_id:id})
					.populate('additionalDetails')
					.populate('savedBlogs')
					.populate({
						path:'savedBlogs',
						populate:{
							path:'user',
						}
					})
					.exec();

		UserDetails.password = undefined;
		const UserBlogs = await Blog.find({user:UserDetails._id})
				.populate("user")
				.populate({
					path:'comments',
					populate:{
						path:'user',
					}
				})
				.exec();

		return res.status(200).json({
			success:true,
			UserDetails:UserDetails,
			UserBlogs:UserBlogs,
			message:"User details and user blogs fetched successfully.",
		});

	}
	catch(error){
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Internal server error, while blogs of user.",
		});
	}
}

exports.saveBlog = async(req,res) =>{
	try{
		const {email,id} = req.user;
		const {blogId,mode} = req.body;

		if (!blogId || !mode) {
			return res.status(403).send({
				success: false,
				message: "All Fields are required",
			});
		}

		if(mode === "Save"){
			const saved = await User.findByIdAndUpdate(
					{_id:id},
					{$push:{savedBlogs:blogId}},
					{new:true}
			)
		}
		else if(mode == "Unsave"){
			const saved = await User.findByIdAndUpdate(
				{_id:id},
				{$pull:{savedBlogs:blogId}},
				{new:true}
			)
		}
		else{
			return res.status(403).send({
				success: false,
				message: "Mode field is not defined correctly, options : Save / Unsave.  ",
			});
		}		

		return res.status(200).json({
			success:true,
			message:"Blog Saved/Unsaves successfully successfully."
		});

	}
	catch(error){
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Internal server error, while saving blog.",
		});
	}
}

exports.getUpdatedUser = async(req,res)=>{
	try{
		const {email,id} = req.user;

		const user = await User.findOne({ email }).populate('additionalDetails');
		
		return res.status(200).json({
			success:true,
			message:"Updated User details fetched successfully.",
			user,
		});

	}
	catch(error){
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Internal server error, while getting updated user details.",
		});
	}
}