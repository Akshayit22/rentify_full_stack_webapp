import React, { useState } from 'react'
import Navbar from './common/Navbar';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { signup } from '../Services/operations/apiAuth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import login from '../Services/operations/apiAuth';
const GetStarted = () => {

	const [mode, setMode] = useState('login');
	const { register, handleSubmit, reset,
		formState: { errors, isSubmitSuccessful } } = useForm();

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset({
				password: "",
			})
		}
	}, [isSubmitSuccessful, reset]);

	const Navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSubmitLogin = (data) => {
		//console.log(data);
		if (data.email === '' || data.password === '') {
			toast.error('please fill the details');
			return;
		}
		dispatch(login(data.email, data.password, Navigate));
	}

	// sign up	


	const handleSubmitSignup = (data) => {
		console.log(data);
		if (data.email === '' || data.firstName === '' || data.lastName === '' ||data.password === '') {
			toast.error('please fill the details');
			return;
		}
		dispatch(signup(data.firstName, data.lastName, data.email, data.password, Navigate))
	}



	return (

		<div className='h-screen'>
			
			<div className='items-center justify-center mx-auto mt-10 lg:w-[40%] md:w-[60%]'>
				<div className='flex flex-row bg-richblack-700 justify-around py-3 text-lg'>
					<button className={`${mode === 'login' ? 'border-b-2 text-richblack-300' : ''}`} onClick={() => setMode('login')}>Login</button>
					<p>|</p>
					<button className={`${mode === 'login' ? '' : 'border-b-2 text-richblack-300'}`} onClick={() => setMode('signup')}>Sign Up</button>
				</div>

				<div className='bg-richblack-800 pb-5'>
					{
						mode === 'login' ?
							(
								<div className='items-center justify-center mx-auto  w-[50%]'>


									<form className='flex flex-col' onSubmit={handleSubmit(handleSubmitLogin)}>
										{/* Email */}
										<div className='mt-10 flex flex-col  justify-around'>
											<label htmlFor='email'>Email : </label>
											<input type='email' id='email' name='email'
												className='bg-richblack-50 text-black p-1 rounded-md text-lg'
												{...register('email',)}>

												{
													errors.email && <p>Email is required</p>
												}
											</input>
										</div>
										<div>
											<h1 className='text-sm'>test@user.com | test1/2/3@user.com</h1>
										</div>
										{/* Password */}
										<div className='mt-5 flex mb-10 flex-col  justify-around'>
											<label htmlFor='password'>password : </label>
											<input type='password' id='password' name='password'
												className='bg-richblack-50 text-black p-1 rounded-md'
												{...register('password',)}>
												{
													errors.password && <p>Password is required</p>
												}
											</input>
											<h1 className='text-sm' >Sample:-  12345</h1>
										</div>

										<button type='submit' className='bg-richblack-600 rounded-md h-10 hover:bg-richblack-700 transition:0.5s'>Login</button>
									</form>
									<div className='bg-richblack-5 h-[2px] mt-10'></div>
									<Link to='/resetPassword' className='mt-10 text-green-50'>Forgot Password</Link>


								</div>
							)
							: 
							(  //signUp
								<div className='items-center justify-start mx-auto w-[60%]'>


									<form className='flex flex-col' onSubmit={handleSubmit(handleSubmitSignup)}>
										{/* first and last Name */}
										<div className='flex gap-5 flex-col  mt-5'>
											<div className='flex flex-col '>
												<label htmlFor='firstName'>First Name :</label>
												<input type='firstName' id='firstName' name='firstName'
													className='bg-richblack-50 text-black p-1 rounded-md text-lg'
													{...register('firstName')}>

													{
														errors.firstName && <p>Name is required</p>
													}
												</input>
											</div>
											<div className=' flex flex-col '>
												<label htmlFor='lastName'>Last Name :</label>
												<input type='lastName' id='lastName' name='lastName'
													className='bg-richblack-50 text-black p-1 rounded-md text-lg'
													{...register('lastName', )}>

													{
														errors.lastName && <p>lastName is required</p>
													}
												</input>
											</div>
										</div>
										{/* Email */}
										<div className='mt-5 flex flex-col'>
											<label htmlFor='email'>Email :</label>
											<input type='email' id='email' name='email'
												className='bg-richblack-50 text-black p-1 rounded-md text-lg'
												{...register('email',)}>

												{
													errors.email && <p>Email is required</p>
												}
											</input>
										</div>
										{/* Password */}
										<div className='mt-5 flex flex-col mb-10'>
											<label htmlFor='password'>password :</label>
											<input type='password' id='password' name='password'
												className='bg-richblack-50 text-black p-1 rounded-md '
												{...register('password')}>
												{
													errors.password && <p>Password is required</p>
												}
											</input>
										</div>

										<button type='submit' className='bg-richblack-600  rounded-md h-10 hover:bg-richblack-700 transition:0.5s'>Sign Up</button>
									</form>

									

								</div>
							)
					}
				</div>

			</div>
		</div>
	)

};

export default GetStarted;