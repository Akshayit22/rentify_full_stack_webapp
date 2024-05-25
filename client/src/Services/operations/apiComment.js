import apiConnector from "../apiConnector";
import { CommentEndpoints } from "../api";
import { toast } from "react-hot-toast";

const {CREATE_COMMENT_API,UPDATE_COMMENT_API,DELETE_COMMENT_API} = CommentEndpoints;

import { getBlog } from "./apiBlog";

export function createComment(blogId,body,token){
	return async(dispatch)=>{
		const toastId = toast.loading("Loading...");

		try{
			console.log("CREATE_COMMENT_API",CREATE_COMMENT_API);

			const response = await apiConnector("POST", CREATE_COMMENT_API, {blogId,body,token});

			if (!response.data.success) {
				throw new Error(response.data.message)
			}
			toast.success(response.data.message);
			dispatch(getBlog(blogId));
		}
		catch(error){
			console.log(error);
			toast.error(error?.response?.data.message);
			//toast.error('Something went wrong, please try again')
		}

		toast.dismiss(toastId);
	}
}

export function updateComment(commentId,body,token){
	return async(dispatch)=>{
		const toastId = toast.loading("Loading...");

		try{
			console.log("UPDATE_COMMENT_API",UPDATE_COMMENT_API);

			const response = await apiConnector("POST",UPDATE_COMMENT_API,{commentId,body,token})

			if (!response.data.success) {
				throw new Error(response.data.message)
			}
			toast.success(response.data.message);
			dispatch(getBlog(response.data.updatedComment.Blog));
		}
		catch(error){
			console.log(error);
			toast.error(error?.response?.data.message);
			//toast.error('Something went wrong, please try again')
		}

		toast.dismiss(toastId);
	}
}

export function deleteComment(blogId,commentId,token){
	return async(dispatch)=>{
		const toastId = toast.loading("Loading...");

		try{
			console.log("DELETE_COMMENT_API",DELETE_COMMENT_API);

			const response = await apiConnector("PUT",DELETE_COMMENT_API,{blogId,commentId,token});

			if (!response.data.success) {
				throw new Error(response.data.message)
			}
			toast.success(response.data.message);
			dispatch(getBlog(blogId));
		}
		catch(error){
			console.log(error);
			toast.error(error?.response?.data.message);
			//toast.error('Something went wrong, please try again')
		}

		toast.dismiss(toastId);
	}
}