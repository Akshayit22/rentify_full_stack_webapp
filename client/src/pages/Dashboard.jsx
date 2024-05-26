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

const Dashboard = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [openModal, setOpenModal] = useState(false);

	var { token } = useSelector((s) => s.auth);

	const { ownedProperties } = useSelector((state) => state.dashboard);
	const { interestedProperties } = useSelector((state) => state.dashboard);

	let { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm();

	// const toggleModal = () => {
	// 	setOpenModal(!openModal);
	// }

	// const handleProfileData = async (data) => {

	// 	if (data.about == '' || data.gender == null || data.contact == '') {
	// 		toast.error('please fill All the details');
	// 		isSubmitSuccessful = false;
	// 	}
	// 	else {
	// 		console.log(data);
	// 		dispatch(updateProfile(data.about, data.gender, data.contact, token));
	// 		toast.success("Request stored successfully !!!");
	// 		reset();
	// 		toggleModal();
	// 	}
	// }

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
		if (ownedProperties == null && interestedProperties == null) {
			dispatch(dashboard(token));
		}
		console.log("ownedProperties", ownedProperties);
		console.log("interestedProperties", interestedProperties);

	}, []);


	return (
		<div className='min-h-screen relative'>

			<h1 className='space-y-2 text-lg font-medium leading-6 text-indigo-300 p-3'>Welcome to Your Profile,{ }</h1>
			
			<button onClick={()=> navigate('/createProperty')}>Create property</button>

			<hr className="border-gray-200 sm:mx-auto dark:border-gray-700 my-5" />
			<h1 className='space-y-2 text-lg font-medium leading-6 text-indigo-300 p-3'>Your created Properties</h1>

			{
				ownedProperties?.length > 0 ?
					(
						<div className='mx-auto mt-4 grid max-w-lg gap-10 lg:max-w-none lg:grid-cols-3 md:grid-cols-2  p-5'>

							{
								ownedProperties.map((property, index) => (

									<div key={index}>
										<p onClick={() => navigate(`/property/${property._id}`)}>{property.title}</p>
										<p>{property.city}</p>
										<p>{property.area}</p>
										<p>{property.rent}</p>
										<p>{property.NearestHospitalDistance}</p>
										<p>{property.LikesCount}</p>
										<p>{property.constructedIn}</p>
										<p>{property.description}</p>
										<p>{property.image}</p>
										<p>{property.deposite}</p>
										<p>{property.roomType}</p>
										<br></br>
										<p onClick={() => navigate(`/updateProperty/${property._id}`)}>Update Property</p>
										<p onClick={() => handleDelete(property._id)}>Delete Property</p>
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
						<div className='mx-auto mt-4 grid max-w-lg gap-10 lg:max-w-none lg:grid-cols-3 md:grid-cols-2  p-5'>
							{
								interestedProperties.map((property, index) => (
									<div key={index}>
									<p onClick={()=> navigate(`/property/${property._id}`)}>{property.title}</p>
									<p>{property.city}</p>
									<p>{property.area}</p>
									<p>{property.rent}</p>
									<p>{property.NearestHospitalDistance}</p>
									<p>{property.LikesCount}</p>
									<p>{property.constructedIn}</p>
									<p>{property.description}</p>
									<p>{property.image}</p>
									<p>{property.deposite}</p>
									<p>{property.roomType}</p>
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