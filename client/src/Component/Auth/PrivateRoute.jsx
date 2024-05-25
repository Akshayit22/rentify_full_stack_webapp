import React from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from "react-router-dom";


const PrivateRoute = ({children}) => {
	const {token} = useSelector((state)=>state.auth);
	const navigator = useNavigate();
	// if(token !== null){
	// 	return children;

	// }
	// else{
	// 	toast.error('You need to Login First to access the private routes.')
		
	// }
	//console.log("open",token);
	return(
		token !== null ? (children) : (
			// (toast.error('You need to Login First to access the private routes.'))
			<div className='flex flex-col h-screen items-center gap-5 align-center pt-[15vh] '>
				<h1 className='text-[3vh] md:text-[4vh] text-red'>You are Not Logged In</h1>
				<h2 className='text-[2vh] md:text-[3vh]'>Please Login or SignUp</h2>
				<button onClick={()=>{navigator('/user-auth')}} className='btn bg-blue-600 text-white  font-semibold px-3 py-1 rounded hover:bg-blue-700 duration-500 md:static w-fit justify-center' >Get Started</button>
			</div>
		)
	)

}

export default PrivateRoute;