import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateProfile } from '../Services/operations/apiProfile';
import { CiEdit } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { MdClose, MdEdit, MdDelete, MdOutlineInsertComment } from "react-icons/md";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { formatDate } from '../Services/formatDate';
import { deleteBlog } from '../Services/operations/apiBlog';
import { setUpdateBlog } from '../redux/slices/blogsSlice';

const Dashboard = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [openModal, setOpenModal] = useState(false);

	var { token } = useSelector((s) => s.auth);
	const { profileDetails } = useSelector((state) => state.profile);
	const { UserBlogs } = useSelector((state) => state.profile);

	let { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm();

	const toggleModal = () => {
		setOpenModal(!openModal);
	}

	const handleProfileData = async (data) => {

		if (data.about == '' || data.gender == null || data.contact == '') {
			toast.error('please fill All the details');
			isSubmitSuccessful = false;
		}
		else {
			console.log(data);
			dispatch(updateProfile(data.about, data.gender, data.contact, token));
			toast.success("Request stored successfully !!!");
			reset();
			toggleModal();
		}
	}

	const HandleDeleteBlog = (ID) => {
		const choice = confirm("Blog will be Deleted, are you sure ???");
		if (choice) {
			dispatch(deleteBlog(ID, token));
			toast.success('Blog Deleted Successfully !!!');
		}
	}

	useEffect(() => {
		dispatch(setUpdateBlog(false));
		if (profileDetails == null && UserBlogs == null) {
			dispatch(getProfile(token));
		}
		console.log("profileDetails", profileDetails);
		console.log("UserBlogs", UserBlogs);

	}, []);


	return (
		<div className='min-h-screen relative'>

			{
				openModal ?
					(
						<div className="h-screen w-full flex justify-center items-center  bg-gray-800 absolute bg-richblack-900 overflow-x-hidden z-15">
							<div className="bg-richblack-500 p-5 m-10 rounded-3xl shadow-lg text-black relative">
								<MdClose className='text-3xl top-0 right-0 absolute m-3 hover:cursor-pointer hover:bg-richblack-500' onClick={() => toggleModal()}></MdClose>
								<form onSubmit={handleSubmit(handleProfileData)}>

									<div className="flex justify-center mb-3 mt-5 flex-col">
										<label htmlFor='about'>About </label>
										<textarea rows={'4'} name="about" id="about" className="bg-gray-200 px-3 py-3 rounded-xl" placeholder="About" {...register('about')} defaultValue={profileDetails.additionalDetails.about}></textarea>
									</div>
									<div className="flex flex-col mb-3">
										<label htmlFor='gender'> Gender</label>
										<div className='flex gap-5'>
											Male<input type="radio" name="gender" id="gender" className="bg-gray-200 px-5 py-3 scale-125" value={'Male'} {...register('gender')} defaultChecked={profileDetails.additionalDetails.gender == 'Male' ? true : false}></input>
											Female<input type="radio" name="gender" id="gender" className="bg-gray-200 px-5 py-3 scale-125" value={'Female'} {...register('gender')} defaultChecked={profileDetails.additionalDetails.gender == 'Female' ? true : false}></input>
										</div>
									</div>
									<div className="flex justify-center mb-3">
										<input type="text" name="contact" id="" className="bg-gray-200 px-5 py-3 rounded-xl" placeholder="contact details" {...register('contact')} defaultValue={profileDetails.additionalDetails.contact}></input>
									</div>
									<div className="flex justify-center">
										<button className="bg-blue-600 rounded-xl w-40 py-2 text-white hover:bg-blue-700">Submit</button>
									</div>
								</form>

							</div>
						</div>
					) :
					(<div></div>)
			}

			<h1 className='space-y-2 text-lg font-medium leading-6 text-indigo-300 p-3'>Welcome to Your Profile, </h1>
			{
				profileDetails !== null && openModal == false ? (
					<div className=' w-full flex flex-col gap-10 items-center justify-evenly md:flex-row'>

						<div className='flex bg-richblack-600  p-3 rounded-md hover:bg-richblack-700 cursor-pointer h-fit w-fit space-x-2' onClick={() => navigate(`/createBlog`)}>
							<label className='text-xl'>Create New Blog </label>
							<CiEdit className='text-2xl mt-1'></CiEdit>
						</div>

						<div className=" sm:w-[350px] md:w-[450px] px-6 py-6  text-center bg-gray-800 rounded-lg lg:mt-0 xl:px-10 bg-richblack-600 ">

							<div className='relative hover:cursor-pointer hover:text-richblack-400'>
								<CiEdit className='text-3xl shadow-md absolute top-0 right-0' onClick={() => toggleModal()} />
							</div>
							<div className="space-y-4 xl:space-y-6 md:flex lg:flex">
								<img className="mx-auto rounded-full h-36 w-36" src={`https://api.dicebear.com/5.x/initials/svg?seed=${profileDetails.firstName} ${profileDetails.lastName}`} alt="User avatar"></img>
								<div className="space-y-2">
									<div className="flex justify-center items-center flex-col space-y-2 text-lg font-medium leading-6">
										<h3 className="text-white">{profileDetails.firstName}{" "}{profileDetails.lastName}</h3>
										<p className="text-indigo-300">{profileDetails.additionalDetails?.about}</p>
										<p className="text-indigo-300">{profileDetails.additionalDetails?.gender}</p>
										<p className="text-indigo-300">{profileDetails.email}</p>

										<div className="flex justify-center mt-5 space-x-5">

										</div>
									</div>
								</div>
							</div>
						</div>

					</div>
				) :
					(<div></div>)
			}

			<hr className="border-gray-200 sm:mx-auto dark:border-gray-700 my-5" />
			<h1 className='space-y-2 text-lg font-medium leading-6 text-indigo-300 p-3'>User Blogs</h1>

			{
				UserBlogs?.length > 0 && openModal == false ?
					(
						<div className='mx-auto mt-4 grid max-w-lg gap-10 lg:max-w-none lg:grid-cols-3 md:grid-cols-2  p-5'>

							{
								UserBlogs.map((blog, index) => (

									<div className="flex flex-col overflow-hidden rounded-md shadow-lg shadow-richblack-700 border border-richblack-300" key={index}>

										<div className="flex-shrink-0">
											<img className="h-45 w-full object-cover" src={blog.image} alt="img" loading='lazy'></img>
										</div>
										<div className="flex flex-1 flex-col justify-between p-3 bg-richblack-800">
											<div className="flex-1">

												<a onClick={() => navigate(`/blog/${blog._id}`)} className="mt-1 block hover:cursor-pointer hover:underline">
													<p className="text-xl font-semibold ">{blog.title.substring(0, 70)}<span>{blog.title.length > 70 ? "..." : ""}</span></p>

												</a>

												{/* <p className="mt-2 text-base text-gray-500 text-richblack-400">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta, eum aliquid? Eaque quae sint at minus autem provident et doloremque eius cumque nesciunt tempora saepe quos modi, nostrum, ab quis.</p> */}


											</div>
											<div className="mt-5 flex justify-between">
												<div className='flex flex-row'>
													<MdOutlineInsertComment className='text-2xl m-2' />
													<span className='mt-1 text-1xl'> {blog.comments.length}</span>
												</div>
												<div className='flex'>
													<div className='flex bg-richblack-800 mr-2 p-2 rounded-md hover:bg-richblack-700 cursor-pointer' onClick={() => navigate(`/updateBlog/${blog._id}`)}>
														<label>Edit</label>
														<CiEdit className='text-2xl'></CiEdit>
													</div>
													<div className='flex bg-richblack-800 mr-5 p-2 rounded-md hover:bg-richblack-700 cursor-pointer' onClick={() => HandleDeleteBlog(blog._id)}>
														<MdDelete className='text-2xl'></MdDelete>
													</div>
												</div>

											</div>
										</div>
									</div>

								))
							}


						</div>
					) :
					(<div className='space-y-2 text-md font-medium leading-6 text-richblack-300  p-5'>No Blog Created</div>)
			}

			<hr className="border-gray-200 sm:mx-auto dark:border-gray-700 my-5" />
			<h1 className='space-y-2 text-lg font-medium leading-6 text-indigo-300 p-3'>User Saved Blogs</h1>


			{
				profileDetails?.savedBlogs?.length > 0 && openModal == false ?
					(
						<div className='mx-auto mt-4 grid max-w-lg gap-10 lg:max-w-none lg:grid-cols-3 md:grid-cols-2  p-5'>
							{
								profileDetails.savedBlogs.map((blog, index) => (
									<div className="flex flex-col overflow-hidden rounded-md shadow-lg shadow-richblack-700 border border-richblack-300" key={index}>

										<div className="flex-shrink-0">
											<img className="h-50 w-full object-cover" src={blog.image} alt="img" loading='lazy'></img>
										</div>
										<div className="flex flex-1 flex-col justify-between p-3">
											<div className="flex-1">

												<a onClick={() => navigate(`/blog/${blog._id}`)} className="mt-1 block hover:cursor-pointer hover:underline">
													<p className="text-xl font-semibold text-richblack-10">{blog.title.substring(0, 70)}<span>{blog.title.length > 70 ? "..." : ""}</span></p>

												</a>
												<p className='mt-1 block font-base text-lg text-richblack-50'>{blog.content[0].header.substring(0, 45)}<span>{blog.content[0].header.length > 45 ? "..." : ""}</span></p>
												<p className="mt-2 text-base text-gray-500 text-richblack-200"> {blog.content[0].body.substring(0, 250)}<span>{blog.content[0].body.length > 250 ? "..." : ""}</span>  </p>

												{/* <p className="mt-2 text-base text-gray-500 text-richblack-400">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta, eum aliquid? Eaque quae sint at minus autem provident et doloremque eius cumque nesciunt tempora saepe quos modi, nostrum, ab quis.</p> */}


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