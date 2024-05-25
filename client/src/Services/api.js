// import dotenv from "dotenv";
// dotenv.config()
const BASE_URL = process.env.REACT_APP_BASE_URL
const BASE_API = BASE_URL;

// AUTH ENDPOINTS : /auth
export const AuthEndpoints = {
	LOGIN_API:BASE_URL+'auth/login',
	SIGNUP_API:BASE_URL+'auth/signup',
	DASHBOARD:BASE_URL+'auth/dashboard',
	OTPGENRATE_API:BASE_URL+'auth/otpGenerator',
	RESETPASSWORD_API:BASE_URL+'auth/resetPassword',
	UPLOAD_IMAGE_API:BASE_URL+'auth/uploadImage',
	
};

// Blog endpoints : /blog
export const BlogEndpoints = {
	CREATE_BLOG_API:BASE_API+'blog/createBlog',
	UPDATE_BLOG_API:BASE_API+'blog/updateBlog',

	GET_ALL_BLOG_API:BASE_API+'blog/getAllBlogs',
	GET_BLOG_API:BASE_API+'blog/getBlog/',
	DELETE_BLOG_API:BASE_API+'blog/deleteBlog',
};

// Comment endpint : /comment
export const CommentEndpoints = {
	CREATE_COMMENT_API:BASE_API+'comment/createComment',
	UPDATE_COMMENT_API:BASE_API+'comment/updateComment',
	DELETE_COMMENT_API:BASE_API+'comment/deleteComment',
	
};

//Profile endpoints : /profile
export const ProfileEndpoints = {
	UPDATE_PROFILE_API:BASE_API+'profile/updateProfile',
	GET_PROFILE_DETAILS_API:BASE_API+'profile/getUserDetails',
	SAVE_BLOG_IN_PROFILE_API:BASE_API+'profile/saveBlog',
	GET_UPDATED_USER_DETAILS_API:BASE_API+'profile/getUpdatedUser'
};


// CONTACT-US API
export const contactusEndpoint = {
	CONTACT_US_API: BASE_URL+'auth/contactUs',
};