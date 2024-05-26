import apiConnector from "../apiConnector";
import { DashboardEndpoints } from "../api";
import { toast } from "react-hot-toast";

const {DASHBOARD_API, LikeOrDislike_API, Interested_API} = DashboardEndpoints;

import {setOwnedProperties,setInterestedProperties} from '../../redux/slices/dashboardSlice';

export function dashboard(token){
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");

		try {
			console.log("DASHBOARD_API", DASHBOARD_API);
			const response = await apiConnector("POST",DASHBOARD_API,{token});

			if (!response.data.success) {
				throw new Error(response.data.message)
			}
			toast.success(response.data.message);

			console.log(response.data);

			dispatch(setInterestedProperties(response.data.IntrestedProperties));
			dispatch(setOwnedProperties(response.data.OwnedProperties));

		}
		catch (error) {
			console.log(error);
			toast.error(error?.response?.data?.message);
		}

		toast.dismiss(toastId);
	}
}


export function interested(PropertyId,token){
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");

		try {
			console.log("Interested_API", Interested_API);
			const response = await apiConnector("PUT",Interested_API,{PropertyId,token});

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


export function likeOrDislike(PropertyId,mode,token) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");

		try {
			console.log("LikeOrDislike_API", LikeOrDislike_API);
			const response = await apiConnector("PUT",LikeOrDislike_API,{PropertyId,mode,token});

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
