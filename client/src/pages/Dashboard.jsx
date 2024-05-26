import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CiEdit } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { MdClose, MdEdit, MdDelete, MdOutlineInsertComment } from "react-icons/md";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { formatDate } from '../Services/formatDate';
import { deleteProperty } from '../Services/operations/apiProperty';
import { dashboard } from '../Services/operations/apiDashboard';
import { setUpdateProperty } from '../redux/slices/propertySlice';
import { FcLike } from 'react-icons/fc';
const Dashboard = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [openModal, setOpenModal] = useState(false);

	var { token } = useSelector((s) => s.auth);

	const { ownedProperties } = useSelector((state) => state.dashboard);
	const { interestedProperties } = useSelector((state) => state.dashboard);

	let { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm();

	

	const handleDelete = (ID) => {
		const choice = confirm("Property will be Deleted, are you sure ???");
		if (choice) {
			dispatch(deleteProperty(ID, token));
			toast.success('Blog Deleted Successfully !!!');
		}
	}

	console.log("ownedProperties", ownedProperties);
	console.log("interestedProperties", interestedProperties);

	useEffect(() => {
		dispatch(setUpdateProperty(false));
		
			dispatch(dashboard(token));
		
		console.log("ownedProperties", ownedProperties);
		console.log("interestedProperties", interestedProperties);

	}, []);


	return (
		<div className='min-h-screen relative'>
			<div className='flex flex-wrap justify-between'>
				<h1 className='space-y-2 text-lg font-medium leading-6 text-indigo-300 p-3'>Welcome to Your Profile,{ }</h1>

				<button onClick={() => navigate('/createProperty')} className='flex items-center text-indigo-700 border border-indigo-600 py-2 px-6 gap-2 rounded inline-flex items-center hover:bg-richblack-600 mr-5'>Create property</button>

			</div>

			<hr className="border-gray-200 sm:mx-auto dark:border-gray-700 my-5" />
			<h1 className='space-y-2 text-lg font-medium leading-6 text-indigo-300 p-3'>Your created Properties</h1>

			{
				ownedProperties?.length > 0 ?
					(
						<div className='my-8 mx-2 md:mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>

							{
								ownedProperties.map((property, index) => (

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

											<a href="" className="flex items-center text-indigo-700 border border-indigo-600 py-2 px-6 gap-2 rounded inline-flex items-center hover:bg-richblack-600">
												<span>
													Interested
												</span>

											</a>
										</div>
										<div className='flex flex-wrap justify-between mt-4'>
											<button onClick={() => navigate(`/updateProperty/${property._id}`)} className='flex items-center text-indigo-700 border border-indigo-600 py-2 px-6 gap-2 rounded inline-flex items-center hover:bg-richblack-600'>Update Property</button>
											<button onClick={() => handleDelete(property._id)} className='flex items-center text-indigo-700 border border-indigo-600 py-2 px-6 gap-2 rounded inline-flex items-center hover:bg-richblack-600'>Delete Property</button>

										</div>
									</div>


								))
							}


						</div>
					) :
					(<div className='space-y-2 text-md font-medium leading-6 text-richblack-300  p-5'>No Property Created</div>)
			}

			<hr className="border-gray-200 sm:mx-auto dark:border-gray-700 my-5" />
			<h1 className='space-y-2 text-lg font-medium leading-6 text-indigo-300 p-3'>Interested properties</h1>


			{
				interestedProperties?.length > 0 && openModal == false ?
					(
						<div className='my-8 mx-2 md:mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
							{
								interestedProperties.map((property, index) => (
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

											<a href="" className="flex items-center text-indigo-700 border border-indigo-600 py-2 px-6 gap-2 rounded inline-flex items-center hover:bg-richblack-600">
												<span>
													Interested
												</span>

											</a>
										</div>
									</div>

								))
							}
						</div>

					) :
					(
						<div className='space-y-2 text-md font-medium leading-6 text-richblack-300 p-5'>Nothing saved here</div>
					)
			}


		</div>
	)
}

export default Dashboard;