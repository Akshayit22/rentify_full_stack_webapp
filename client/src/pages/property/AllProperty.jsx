import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../Services/formatDate';
import { MdOutlineInsertComment } from "react-icons/md";

function AllProperty() {

	const { AllProperty } = useSelector((state) => state.property);
	const navigate = useNavigate();
	const data = AllProperty;
	console.log(AllProperty);

	return (
		<div className='w-full '>

			
			<div className='mx-auto mt-12 grid max-w-lg gap-10 lg:max-w-none lg:grid-cols-3 md:grid-cols-2  p-5'>

				{
					data?.length > 0 ?
						(
							data.map((blog, index) => (
								<div className="flex flex-col overflow-hidden rounded-md shadow-lg shadow-richblack-700 border border-richblack-300 bg-gradient-to-r  from-blue-900 to-blue-800" key={index}>

									<div className="flex-shrink-0">
										<img className="h-60 w-full object-cover" src={blog.image} alt="img" loading='lazy'></img>
									</div>
									<div className="flex flex-1 flex-col justify-between p-3">
										<div className="flex-1">

											<a onClick={() => navigate(`/blog/${blog._id}`)} className="mt-1 block hover:cursor-pointer hover:underline">
												<p className="text-xl font-semibold text-richblack-10">{blog.title.substring(0, 70)}<span>{blog.title.length > 70 ? ". . ." : ""}</span></p>

											</a>

											<p className='mt-1 block font-base text-lg text-richblack-50'>{blog.content[0].header.substring(0, 40)}<span>{blog.content[0].header.length > 45 ? ". . ." : ""}</span></p>
											<p className="mt-2 text-base text-gray-500 text-richblack-200"> {blog.content[0].body.substring(0, 250)}<span>{blog.content[0].body.length > 250 ? "..." : ""}</span>  </p>
											{/* <p className="mt-2 text-base text-gray-500 text-richblack-400"> descreption length less that 730 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta, eum aliquid? Eaque quae sint at minus autem provident et doloremque eius cumque nesciunt tempora saepe quos modi, nostrum, ab quis.</p> */}


										</div>
										<div className="mt-5 flex justify-between">
											<div className=' flex items-center'>
												<div className="flex-shrink-0">
													<img className="h-12 w-12 rounded-full" src={blog.user.image ? blog.user.image : `https://api.dicebear.com/5.x/initials/svg?seed=${blog.user.firstName} ${blog.user.lastName}`} alt="user"></img>
												</div>
												<div className="ml-3">
													<p className="text-sm font-medium text-gray-900">
														<a className="hover:underline hover:cursor-pointer">{blog.user.firstName + " " + blog.user.lastName}</a>
													</p>
													<div className="flex flex-col space-x-1 text-xs text-gray-500">
														<span>{formatDate(blog.createdAt)}</span>
													</div>
												</div>
											</div>
											<div className='flex flex-row'>
												<MdOutlineInsertComment className='text-2xl m-2' />
												<span className='mt-1 text-1xl'> {blog.comments.length}</span>
											</div>
										</div>
									</div>
								</div>
							))

						) :
						(
							<div className="flex justify-center items-center">
								<h1 className='space-y-2 text-2xl font-medium leading-6  p-5 mt-'>Wait for 30 sec, We are Building server for you.</h1>
							</div>
						)
				}
			</div>
		</div>
	)
}

export default AllProperty;
