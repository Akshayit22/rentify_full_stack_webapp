import apiConnector from "../apiConnector";
import { PropertyEndpoints } from "../api";
import { toast } from "react-hot-toast";

const { CREATE_PROPERTY_API, UPDATE_PROPERTY_API, GET_ALL_PROPERTY_API, GET_PROPERTY_API, DELETE_PROPERTY_API} = PropertyEndpoints;
import { addBlogs, addBlog } from '../../redux/slices/blogsSlice';


export function createProperty(data, token, navigate) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");

		try {
			console.log("CREATE_PROPERTY_API", CREATE_PROPERTY_API);
			const response = await apiConnector("POST", CREATE_PROPERTY_API, data, {
				"Content-Type": "multipart/form-data",
				Authorisation: `Bearer ${token}`,
			});

			//image in request.files
			if (!response.data.success) {
				throw new Error(response.data.message)
			}
			console.log("CREATE_PROPERTY_API Response", response.data.NewProperty);
			toast.success(response.data.message);
			//navigate(`/property/${response.data.NewProperty._id}`);
		}
		catch (error) {
			console.log(error);
			toast.error(error?.response?.data?.message);
			//toast.error('Something went wrong, please try again')
		}

		toast.dismiss(toastId);
	}
}

export function updateProperty(data, token, navigate) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");

		try {
			console.log("UPDATE_PROPERTY_API", UPDATE_PROPERTY_API);

			const response = await apiConnector("PUT", UPDATE_PROPERTY_API, data, {
				"Content-Type": "multipart/form-data",
				Authorisation: `Bearer ${token}`,
			});

			if (!response.data.success) {
				throw new Error(response.data.message)
			}
			toast.success(response.data.message);
			console.log(response.data.NewProperty);
			//dispatch(getBlog(blogId));
			//navigate(`/blog/${response.data.NewBlog._id}`)
		}
		catch (error) {
			console.log(error);
			toast.error(error?.response?.data?.message);
			//toast.error('Something went wrong, please try again')
		}

		toast.dismiss(toastId);
	}
}

export function deleteProperty(blogId, token) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");
		try {
			console.log("DELETE_PROPERTY_API", DELETE_PROPERTY_API);
			const response = await apiConnector("PUT", DELETE_PROPERTY_API, { propertyId, token }, {
				Authorisation: `Bearer ${token}`,
			});
			if (!response.data.success) {
				throw new Error(response.data.message)
			}
			toast.success(response.data.message);
			//dispatch(getDashboard(token));
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
			//dispatch(addBlogs(data.data));


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

			// console.log(response.data.PropertyDetails);

			if (!response.data.success) {
				throw new Error(response.data.message)
			}

			//dispatch(addBlog(response.data.BlogDetails));



		}
		catch (error) {
			console.log(error);
			toast.error(error?.response?.data?.message);
			//toast.error('Something went wrong, please try again')
		}

		toast.dismiss(toastId);
	}
}