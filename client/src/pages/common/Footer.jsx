import React from 'react'
import { TfiEmail } from "react-icons/tfi";
import { SiMinutemailer } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram,FaGithub } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


function Footer() {
	const navigate = useNavigate();
	return (
		<div className='bg-richblack-700 h-[30vh]'>
			
			<footer className=" rounded-lg shadow dark:bg-gray-900 m-4">
				<div className=" max-w-screen-xl mx-auto p-4 md:py-8">
					<div className="sm:flex sm:items-center sm:justify-between">
						<div className='font-bold text-2xl cursor-pointer flex items-center gap-1' onClick={() => navigate('/home')}>

							<span>Rentify</span>
						</div>
						<ul className="flex flex-wrap items-center mb-6 mt-6 lg:mt-0 text-sm font-medium text-gray-500 dark:text-gray-400">
							
							<li className='text-[1rem]'>
								<p className="hover:underline hover:cursor-pointer me-4 md:me-6">About</p>
							</li>
							<li className='text-[1rem]'>
								<p  className="hover:underline hover:cursor-pointer">Contact</p>
							</li>
						</ul>
					</div>
					<hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
					<span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 Rentify. All Rights Reserved.</span>
				</div>
			</footer>


		</div >
	)
}

export default Footer