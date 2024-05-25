const cloudinary = require('cloudinary').v2;
const dotenv = require("dotenv");
dotenv.config();


exports.cloudinaryConnect = () =>{

	try{
		cloudinary.config({
			cloud_name:process.env.CLOUD_NAME,
			api_key:process.env.API_KEY,
			api_secret:process.env.API_SECRET,
		})
		console.log('cloudinary connection successful.')
	}
	catch(error){
		console.log("Cloudinary connection error",error);
	}

}

exports.RandomBlogImage = 
[
	"https://res.cloudinary.com/dwvnhmzvu/image/upload/v1707656972/setup/n8d7m7e4flqmsyheskm9.jpg",
	"https://res.cloudinary.com/dwvnhmzvu/image/upload/v1707656948/setup/zisqss984okudza6nxtt.jpg",
	"https://res.cloudinary.com/dwvnhmzvu/image/upload/v1707656996/setup/tin5mgrstuom5lqogne6.jpg",
	"https://res.cloudinary.com/dwvnhmzvu/image/upload/v1707656858/setup/oocdzr99jzqem0gj1s1q.jpg",
];