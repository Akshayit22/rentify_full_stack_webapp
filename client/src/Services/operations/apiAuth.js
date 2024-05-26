import apiConnector  from '../apiConnector';
import { AuthEndpoints} from '../api';
import { toast } from "react-hot-toast";
import {setToken} from '../../redux/slices/authSlice.js';
import {setUser} from '../../redux/slices/dashboardSlice.js';
import {setOwnedProperties,setInterestedProperties} from '../../redux/slices/dashboardSlice.js';
const { LOGIN_API, SIGNUP_API,RESETPASSWORD_API,OTPGENRATE_API,UPLOAD_IMAGE_API,DASHBOARD} = AuthEndpoints;

function login(email, password, navigate) {
	return async (dispatch) => {
		// loading toast : On
		const toastId = toast.loading("Loading...")

		try {
			const response = await apiConnector("POST", LOGIN_API, { email, password });
			//const response = {data:{success:true}};
			console.log(LOGIN_API);

			console.log("LOGIN API RESPONSE............", response);

			if (response.data.success === false) {
				throw new Error(response.message);
			}
			
			// login success toast
			// get User data in response.data.user
			dispatch(setToken(JSON.stringify(response.data.token).toString().replaceAll('"','')))
			dispatch(setUser(JSON.stringify({ ...response.data.user,})));

			localStorage.setItem("user", JSON.stringify(response.data.user))
			localStorage.setItem("token", JSON.stringify(response.data.token))
				
			toast.success('Login Success.');
			setTimeout(()=>{
				navigate("/dashboard");
			},1000);
			toast.success('Welcome to Dashboard');
			
		}
		catch (error) {
			console.log("LOGIN API ERROR............", error);
			toast.error(error?.response?.data?.message);
			// toast.error(error.response.data.message)
		}
		toast.dismiss(toastId);

		
	}
}
export default login;

export function signup(firstName,lastName,email,contact,password,navigate){
	return async(dispatch)=>{

		//loading on
		const toastId = toast.loading("Loading...")
		try{
			console.log("SIGNUP API RESPONSE",SIGNUP_API);
			const response = await apiConnector("POST", SIGNUP_API,{firstName,lastName,email,contact,password});
			//const response = {data:{success:true}};
			console.log("SIGNUP API RESPONSE............", response);
	
			if (!response.data.success) {
			  throw new Error(response.data.message)
			}
			//navigate
			toast.success('Sign Up Success, Now login into your account');
			setTimeout(()=>{
				//navigate("/login");
				dispatch(login(email, password, navigate));
			},1000);
			
		}
		catch(error){
			toast.error(error.response.data.message);
			//toast.error('Something went wrong, please try again')
			console.log(error);
		}
		//loading off
		toast.dismiss(toastId)

	}
}

export function logout() {
	return async(dispatch) => {
		dispatch(setToken(null))
		dispatch(setUser(null))
		localStorage.removeItem("token")
		localStorage.removeItem("user")
		toast.success("Logged Out Successfully !!!")
		dispatch(setOwnedProperties(null));
		dispatch(setInterestedProperties(null));
		//navigate("/")
	}
}

export function generateOtp(email){
	return async(dispatch) =>{
		const toastId = toast.loading("Sending OTP...")
		try{
			const response = await apiConnector("PUT", OTPGENRATE_API, {email});
			console.log("RESETPASSWORD API RESPONSE............", response,email);
			if (response.data.success === false) {
				throw new Error(response.message);
			}
				
			toast.success('OTP Sent Successfully.');
		}
		catch(error){
			console.log("RESETPASSWORD API ERROR............", error)
			toast.error(error.response.data.message);
		}
		// loading toast : off
		toast.dismiss(toastId);
	}
}

export function resetPassword(email,otp,password,confirmPassword, navigate) {
	return async (dispatch) => {
		// loading toast : On
		const toastId = toast.loading("Loading...")

		try {
			const response = await apiConnector("POST", RESETPASSWORD_API, { email,otp,password,confirmPassword});
			//const response = {data:{success:true}};
			console.log(RESETPASSWORD_API);

			console.log("RESETPASSWORD API RESPONSE............", response,{ email,otp,password,confirmPassword});

			if (response.data.success === false) {
				throw new Error(response.message);
			}
				
			toast.success('Password changed Successfully, Now you can Login.');
			setTimeout(()=>{
				navigate("/user-auth");
			},1000);
			
		}
		catch (error) {
			console.log("RESETPASSWORD API ERROR............", error)
			toast.error(error.response.data.message);
			// toast.error(error.response.data.message)
		}
		toast.dismiss(toastId);

		
	}
}
