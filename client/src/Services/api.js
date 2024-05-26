// import dotenv from "dotenv";
// dotenv.config()
const BASE_URL = process.env.REACT_APP_BASE_URL

export const AuthEndpoints = {
	LOGIN_API:BASE_URL+'auth/login',
	SIGNUP_API:BASE_URL+'auth/signup',
	
	OTPGENRATE_API:BASE_URL+'auth/otpGenerator',
	RESETPASSWORD_API:BASE_URL+'auth/resetPassword',
	
};

export const DashboardEndpoints = {
	DASHBOARD_API:BASE_URL+'auth/dashboard',
	LikeOrDislike_API:BASE_URL+'auth/likeOrDislike',
	Interested_API:BASE_URL+'auth/intrested',
}

export const PropertyEndpoints = {
	CREATE_PROPERTY_API:BASE_URL+'property/createProperty',
	UPDATE_PROPERTY_API:BASE_URL+'property/updateProperty',

	GET_ALL_PROPERTY_API:BASE_URL+'property/getAllProperty',
	GET_PROPERTY_API:BASE_URL+'property/getProperty/',
	DELETE_PROPERTY_API:BASE_URL+'property/deleteProperty',
};



