import apiConnector from "../apiConnector";
import { PropertyEndpoints } from "../api";
import { toast } from "react-hot-toast";

const { CREATE_PROPERTY_API, UPDATE_PROPERTY_API, GET_ALL_PROPERTY_API, GET_PROPERTY_API, DELETE_PROPERTY_API} = PropertyEndpoints;
import { addProperties, addProperty } from '../../redux/slices/propertySlice';
import {dashboard} from '../operations/apiDashboard';

export function createProperty(title,description,rent,deposite,roomType,area,city,constructedIn,NearestHospitalDistance,token, navigate) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");

		try {
			console.log("CREATE_PROPERTY_API", CREATE_PROPERTY_API);
			const response = await apiConnector("POST", CREATE_PROPERTY_API, {title,description,rent,deposite,roomType,area,city,constructedIn,NearestHospitalDistance,token}, {
				Authorisation: `Bearer ${token}`,
			});

			//image in request.files
			if (!response.data.success) {
				throw new Error(response.data.message)
			}
			console.log("CREATE_PROPERTY_API Response", response.data.NewProperty);
			toast.success(response.data.message);
			navigate(`/property/${response.data.NewProperty._id}`);
		}
		catch (error) {
			console.log(error);
			toast.error(error?.response?.data?.message);
			//toast.error('Something went wrong, please try again')
		}

		toast.dismiss(toastId);
	}
}

export function updateProperty(propertyId,title,description,rent,deposite,roomType,area,city,constructedIn,NearestHospitalDistance, token, navigate) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");

		try {
			console.log("UPDATE_PROPERTY_API", UPDATE_PROPERTY_API);

			const response = await apiConnector("PUT", UPDATE_PROPERTY_API,{propertyId,title,description,rent,deposite,roomType,area,city,constructedIn,NearestHospitalDistance, token}, {
				Authorisation: `Bearer ${token}`,
			});

			if (!response.data.success) {
				throw new Error(response.data.message)
			}
			toast.success(response.data.message);
			console.log(response.data.NewProperty);
			navigate(`/property/${response.data.NewProperty._id}`)
		}
		catch (error) {
			console.log(error);
			toast.error(error?.response?.data?.message);
			//toast.error('Something went wrong, please try again')
		}

		toast.dismiss(toastId);
	}
}

export function deleteProperty(PropertyId, token) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");
		try {
			console.log("DELETE_PROPERTY_API", DELETE_PROPERTY_API);
			const response = await apiConnector("PUT", DELETE_PROPERTY_API, { PropertyId, token }, {
				Authorisation: `Bearer ${token}`,
			});
			if (!response.data.success) {
				throw new Error(response.data.message)
			}
			toast.success(response.data.message);
			dispatch(dashboard(token));
		}
		catch (error) {
			console.log(error);
			toast.error(error?.response?.data?.message);
			//toast.error('Something went wrong, please try again')
		}
		toast.dismiss(toastId);
	}
}

export function getAllProperty() {
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");

		try {

			const response = await apiConnector("GET", GET_ALL_PROPERTY_API);

			console.log("GET_ALL_PROPERTY_API",GET_ALL_PROPERTY_API);
			console.log("GET_ALL_PROPERTY_API RESPONSE............", response.data);

			const data = response.data;
			// console.log(response.data);

			if (!response.data.success) {
				throw new Error(response.data.message)
			}
			dispatch(addProperties(data.data));


		}
		catch (error) {
			console.log(error);
			toast.error(error?.response?.data?.message);
			//toast.error('Something went wrong, please try again')
		}

		toast.dismiss(toastId);
	}
}

export function getProperty(id) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");

		try {

			console.log("GET_PROPERTY_API",GET_PROPERTY_API+id);

			const response = await apiConnector("GET", GET_PROPERTY_API + id);

			//console.log(response.data.PropertyDetails);

			if (!response.data.success) {
				throw new Error(response.data.message)
			}

			dispatch(addProperty(response.data.PropertyDetails));

		}
		catch (error) {
			console.log(error);
			toast.error(error?.response?.data?.message);
			//toast.error('Something went wrong, please try again')
		}

		toast.dismiss(toastId);
	}
}