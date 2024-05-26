import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../Services/formatDate';
import { MdOutlineInsertComment } from "react-icons/md";
import { FcLike } from 'react-icons/fc';
function AllProperty() {

	const { AllProperty } = useSelector((state) => state.property);
	const navigate = useNavigate();
	const data = AllProperty;
	console.log(AllProperty);

	return (
		<div className='w-full '>


			<div className='my-8 mx-2 md:mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>

				{
					data?.length > 0 ?
						(
							data.map((property, index) => (
								<div key={index} className=' p-6 border-2 border-dashed border-gray-400 text-black bg-richblack-400'>
									<p onClick={() => navigate(`/property/${property._id}`)} className='hover:underline text-3xl hover:cursor-pointer'>{property.title}</p>

									<div className='flex flex-wrap justify-between text-xl'>
										<p>{'Room: ' + property.roomType}</p>
										<p>{'Construction: ' + property.constructedIn}</p>
									</div>

									<div className='flex flex-wrap justify-between text-xl'>
										<p>{'Area: ' + property.area}</p>
										<p>{'City :' + property.city}</p>
									</div>
									<div className='flex flex-wrap justify-between text-xl'>
										<p>{'Rent: ' + property.rent}</p>
										<p>{'Deposite:' + property.deposite}</p>
									</div>

									<p>{'Nearest Hospital: ' + property.NearestHospitalDistance}</p>
									<p>{property.description}</p>
									<div className='flex flex-wrap justify-between'>
										<div className='flex text-2xl text-balance' >
											<FcLike className='mt-1'></FcLike>
											<p>{property.LikesCount}</p>
										</div>

										<a onClick={() => navigate(`/property/${property._id}`)} className="flex items-center text-indigo-700 border border-indigo-600 py-2 px-6 gap-2 rounded inline-flex items-center hover:bg-richblack-600">
											<span>
												Interested
											</span>
											
										</a>
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
