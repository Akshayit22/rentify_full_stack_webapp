import apiConnector from "../apiConnector";
import { ProfileEndpoints } from "../api";
import { toast } from "react-hot-toast";

const { UPDATE_PROFILE_API, GET_PROFILE_DETAILS_API, SAVE_BLOG_IN_PROFILE_API,GET_UPDATED_USER_DETAILS_API} = ProfileEndpoints;

import {setProfileDetails,setUser,setUserBlogs} from '../../redux/slices/profileSlice';

export function updateProfile(about, gender, contact,token) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");

		try {
			console.log("UPDATE_PROFILE_API", UPDATE_PROFILE_API);

			const response = await apiConnector("PUT",UPDATE_PROFILE_API,{gender, about, contact,token},{
				Authorisation: `Bearer ${token}`,
			});

			console.log(response);			

			if (!response.data.success) {
				throw new Error(response.data.message)
			}

			toast.success(response.data.message);

			dispatch(getProfile(token));

		}
		catch (error) {
			console.log(error);
			toast.error(error?.response?.data?.message);
			//toast.error('Something went wrong, please try again')
		}

		toast.dismiss(toastId);
	}
}

export function getProfile(token) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");

		try {
			console.log("GET_PROFILE_DETAILS_API", GET_PROFILE_DETAILS_API);

			const response = await apiConnector("POST", GET_PROFILE_DETAILS_API, {token}, {
				Authorisation: `Bearer ${token}`,
			});
			//console.log("GET_PROFILE_DETAILS_API",response);
			
			//dispatch(getDashboardDetails(token));

			if (!response.data.success) {
				throw new Error(response.data.message)
			}

			// toast.success(response.data.message);

			dispatch(setProfileDetails(response.data.UserDetails));
			dispatch(setUserBlogs(response.data.UserBlogs));

		}
		catch (error) {
			console.log(error);
			toast.error(error?.response?.data?.message);
			//toast.error('Something went wrong, please try again')
		}

		toast.dismiss(toastId);
	}
}

export function saveBlog(blogId,mode,token) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");

		try {
			console.log("SAVE_BLOG_IN_PROFILE_API", SAVE_BLOG_IN_PROFILE_API);
			const response = await apiConnector("PUT",SAVE_BLOG_IN_PROFILE_API,{blogId,mode,token});

			if (!response.data.success) {
				throw new Error(response.data.message)
			}
			toast.success(response.data.message);

		}
		catch (error) {
			console.log(error);
			toast.error(error?.response?.data?.message);
			//toast.error('Something went wrong, please try again')
		}

		toast.dismiss(toastId);
	}
}

export function getUpdatedUser(token){
	return async (dispatch) => {
		try{
			console.log("GET_UPDATED_USER_DETAILS_API", GET_UPDATED_USER_DETAILS_API);

			const response = await apiConnector("POST", GET_UPDATED_USER_DETAILS_API, {token}, {
				Authorisation: `Bearer ${token}`,
			});
			
			if (!response.data.success) {
				throw new Error(response.data.message)
			}

			dispatch(setUser(JSON.stringify({ ...response.data.user,})));
			localStorage.setItem("user", JSON.stringify(response.data.user));

		}
		catch(error){
			console.log(error);
			toast.error(error?.response?.data?.message);
		}
	}
}