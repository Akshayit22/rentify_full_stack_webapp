const { uploadImageToCloudinary } = require('../config/imageUploader');
const { RandomBlogImage } = require('../config/cloudinary');
const Blog = require('../models/Blog');
const User = require('../models/User')


/*
{
    "title":"First Blog",
    "content":[{"header":"First Blog","body":"This is First Blog"}],
    "referenceLinks":["http://github.com"],
    "category":["one"]
}
*/
exports.createBlog = async (req, res) => {
	try {
		const { title } = req.body;
		const  content  = JSON.parse(req.body.content);
		const category = JSON.parse(req.body.category);
		const referenceLinks = JSON.parse(req.body.referenceLinks);
		const { email, id } = req.user;
		const userDetails = await User.findOne({ email });
		
		var url = "";
		if (!title || content[0].heading === '' || content[0].body === '') {
			return res.status(403).send({
				success: false,
				message: "All Fields are required",
			});
		}
		console.log("req.files: " , req.files);
		if (req.files) {
			//Image Uploader
			const Image = req.files.Image;
			const ImageUpload = await uploadImageToCloudinary(
				Image,
				process.env.FOLDER_NAME,
			)
			url = ImageUpload.secure_url;
			console.log("File Uploaded : " , url);
		} else {
			url = RandomBlogImage[Math.floor(Math.random()*4)];
		}

		
		const NewBlog = await Blog.create({
			title:title,content: content,
			image: url,referenceLinks: referenceLinks,
			category: category, user: userDetails,
		});
		console.log("Blog Created :", NewBlog);


		return res.status(200).json({
			success: true,
			NewBlog:NewBlog,
			message: "Blog Created Successfull.",
		});


	}
	catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Internal server error while creating blog.",
		});
	}
}

exports.getAllBlogs = async (req, res) => {
	try {
		const AllBlogs = await Blog.find({})
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
			data: AllBlogs,
			message: "All blogs fetched successfully",
		});
	}
	catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Internal server error, while fetching all blogs",
		});
	}
}

/*
{
    "blogId":"65c9b452091462a32e429e43",
    "title":"First Blog.",
    "content":[{"header":"First Blog.","body":"This is First updated Blog"}],
    "referenceLinks":["http://www.github.com"],
    "category":["updated"],
    "image":"https://res.cloudinary.com/dwvnhmzvu/image/upload/v1707656948/setup/zisqss984okudza6nxtt.jpg"
}

*/
exports.updateBlog = async (req, res) => {
	try {
		const {blogId, title,image } = req.body;
		const content  = JSON.parse(req.body.content);
		const category = JSON.parse(req.body.category);
		const referenceLinks = JSON.parse(req.body.referenceLinks);
		const { email, id } = req.user;
		const userDetails = await User.findOne({ email });
		console.log(req.body);

		if (!title || !category || content[0].heading === '' || content[0].body === '') {
			return res.status(403).send({
				success: false,
				message: "All Fields are required",
			});
		}

		var url = "";
		console.log("req.files:", req.files);
		if (req.files) {
			//Image Uploader
			const Image = req.files.Image;
			const ImageUpload = await uploadImageToCloudinary(
				Image,
				process.env.FOLDER_NAME,
			)
			url = ImageUpload.secure_url;
		} else {
			url = image;
		}


		const NewBlog = await Blog.findByIdAndUpdate({_id:blogId},
			{
				title:title,content: content,
				image: url,referenceLinks: referenceLinks,
				category: category, user: userDetails,
			},
			{new:true});
		console.log("Blog Updated :", NewBlog);

		return res.status(200).json({
			success: true,
			NewBlog:NewBlog,
			message: "Blog Updated successfully",
		});
	}
	catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Internal server error, while updating blog.",
		});
	}
}

exports.getBlog = async(req,res) =>{
	try{
		const id = req.params.id || req.body.id;

		if(!id || id  === undefined || id === null){
			return res.status(403).send({
				success: false,
				message: "ID Fields are required",
			});
		}

		const BlogDetails  = await await Blog.find({_id:id})
				.populate("user")
				.populate({
					path:'comments',
					populate:{
						path:'user',
					}
				})
				.exec();

		if(!BlogDetails){
			return res.status(300).send({
				success: false,
				message: "Blog doen't exist in database.",
			});
		}

		return res.status(200).json({
			success: true,
			BlogDetails,
			message: "Blog details fetched successfully",
		});

	}
	catch(error){
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Internal server error, while fetching a blog",
		});
	}
}

exports.deleteBlog = async (req,res) =>{
	try{
		const {blogId} = req.body;

		const resp = await Blog.findByIdAndDelete(
			{_id:blogId}
		);


		return res.status(200).json({
			success: true,
			message: "Blog deleted successfully",
		});
	}
	catch(error){
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Internal server error, while deleting blog.",
		});
	}
}