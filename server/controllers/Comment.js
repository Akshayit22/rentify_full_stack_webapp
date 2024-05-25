const User = require('../models/User');
const Comment = require('../models/Comment');
const Blog = require('../models/Blog');

exports.createComment = async(req,res) =>{
	try{
		const {blogId,body} = req.body;

		if(!body || !blogId){
			return res.status(403).send({
				success: false,
				message: "All Fields are required",
			});
		}
		
		const commentResp = await Comment.create({
			Blog:blogId,
			user:req.user.id,
			body:body
		})

		const blogUpdate = await Blog.findByIdAndUpdate(
				{_id:commentResp.Blog},
				{$push:{comments:commentResp._id}},
				{new:true}
		);

		return res.status(200).json({
			success: true,
			commentResp,
			message: "Comment Created successfully",
		});


	}
	catch(error){
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Internal server error, while creating comment.",
		});
	}
}


exports.updateComment = async (req,res) =>{

	try{
		const {commentId,body} = req.body;

		const updatedComment = await Comment.findByIdAndUpdate(
			{_id:commentId},
			{body:body},
			{new:true}
		)

		if(!updatedComment){
			return res.status(301).json({
				success: false,
				message: "Comment with given Id is not exist in database.",
			});
		}

		return res.status(200).json({
			success: true,
			updatedComment,
			message: "Comment updated successfully",
		});

	}
	catch(error){
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Internal server error, while updating comment.",
		});
	}
}


exports.deleteComment = async(req,res) =>{
	try{
		const {blogId,commentId} = req.body;
		
		const blogUpdate = await Blog.findByIdAndUpdate(
			{_id:blogId},
			{$pull:{comments:commentId}},
			{new:true}
		);

		const commentUpdated = await Comment.findByIdAndDelete(
			{_id:commentId},
			{new:true}
		);

		if(!blogUpdate || !commentUpdated){
			return res.status(301).json({
				success: false,
				message: "Blog or comment with given id is not exist in database.",
			});
		}

		return res.status(200).json({
			success: true,
			message: "Comment Deleted Successfully",
		});

	}
	catch(error){
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Internal server error, while deleting comment.",
		});
	}
}