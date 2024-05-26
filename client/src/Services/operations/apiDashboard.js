import apiConnector from "../apiConnector";
import { DashboardEndpoints } from "../api";
import { toast } from "react-hot-toast";

const {DASHBOARD_API, LikeOrDislike_API, Interested_API} = DashboardEndpoints;

import {setProfileDetails,setUser,setUserBlogs} from '../../redux/slices/profileSlice';

export function dashboard(){
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");

		try {
			console.log("DASHBOARD_API", DASHBOARD_API);
			const response = await apiConnector("POST",DASHBOARD_API,{propertyId,token});

			if (!response.data.success) {
				throw new Error(response.data.message)
			}
			toast.success(response.data.message);

			console.log(response.data.OwnedProperties);
			console.log(response.data.IntrestedProperties);


		}
		catch (error) {
			console.log(error);
			toast.error(error?.response?.data?.message);
		}

		toast.dismiss(toastId);
	}
}


export function interested(propertyId,token){
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");

		try {
			console.log("Interested_API", Interested_API);
			const response = await apiConnector("PUT",Interested_API,{propertyId,token});

			if (!response.data.success) {
				throw new Error(response.data.message)
			}
			toast.success(response.data.message);
			console.log(response.data.saveIntrested);
		}
		catch (error) {
			console.log(error);
			toast.error(error?.response?.data?.message);
		}

		toast.dismiss(toastId);
	}
}


export function likeOrDislike(propertyId,mode,token) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");

		try {
			console.log("LikeOrDislike_API", LikeOrDislike_API);
			const response = await apiConnector("PUT",LikeOrDislike_API,{propertyId,mode,token});

			if (!response.data.success) {
				throw new Error(response.data.message)
			}
			toast.success(response.data.message);
			console.log(response.data.saved);

		}
		catch (error) {
			console.log(error);
			toast.error(error?.response?.data?.message);
		}

		toast.dismiss(toastId);
	}
}
