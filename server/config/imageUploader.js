const cloudinary = require('cloudinary').v2;

exports.uploadImageToCloudinary = async(file,folder,heigth,quality) =>{
	const options = {folder};
	
	if(heigth){ options.heigth = heigth; }
	if(quality){ options.quality = quality; }
	options.resourse_type = 'auto';

	return await cloudinary.uploader.upload(file.tempFilePath,options);
}

/*
How to use: 

const { uploadImageToCloudinary } = require("../utils/imageUploader");


const Image = req.files.Image;
const ImageUpload = await uploadImageToCloudinary(
			Image,
			process.env.FOLDER_NAME
		);
const URL = ImageUpload.secure_url;

OR 

if (req.files) {
		const thumbnail = req.files.thumbnailImage
		const thumbnailImage = await uploadImageToCloudinary(
		  thumbnail,
		  process.env.FOLDER_NAME
		)
		const url = thumbnailImage.secure_url
}

*/