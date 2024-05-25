import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getBlog } from '../../Services/operations/apiBlog';
import Spinner from '../../Component/Commen/Spinner';
import { formatDate } from '../../Services/formatDate';
import { CiEdit } from "react-icons/ci";
import { MdKeyboardBackspace, MdSave } from "react-icons/md";
import Comment from '../comment/Comment';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { saveBlog, getUpdatedUser, getProfile } from '../../Services/operations/apiProfile';;

const Blog = () => {

	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const { OneBlog } = useSelector((state) => state.blog);
	var { user } = useSelector((state) => state.profile);
	const { token } = useSelector((state) => state.auth);
	const ID = location.pathname.split("/").at(-1);
	const SingleBlog = OneBlog.length > 0 ? OneBlog[0] : null;
	var user = user ? JSON.parse(user) : null;

	const HandleSaveBlog = (mode) => {
		if (user == null) {
			toast.error("Login first to Save Blog !!!")
		} else {
			dispatch(saveBlog(SingleBlog._id, mode, token));
			dispatch(getBlog(ID));
			dispatch(getUpdatedUser(token));
			dispatch(getProfile(token));
		}

	}

	useEffect(() => {
		setLoading(true);
		dispatch(getBlog(ID));
		setLoading(false);

		console.log("single blog", SingleBlog);
		console.log("user", user);

	}, []);

	return (
		<div className='min-h-screen'>

			{
				loading ?
					<Spinner></Spinner> :
					SingleBlog !== null ?
						(
							<div className='mt-2'>

								<div className='h-[5vh] flex justify-between items-center'>
									<div className='flex bg-richblack-800 ml-5 p-3 rounded-md hover:bg-richblack-700 cursor-pointer' onClick={() => navigate('/home')}>
										<MdKeyboardBackspace className='text-2xl' />
										<label>Back</label>
									</div>

									<div className='flex '>


										{

											user?.savedBlogs?.includes(SingleBlog._id) ?
												(
													<div className='flex bg-richblack-800 mr-5 p-3 rounded-md hover:bg-richblack-700 cursor-pointer' onClick={() => HandleSaveBlog('Unsave')}>
														<label>UnSave</label>
														<MdSave className='text-2xl' />
													</div>
												) :
												(
													<div className='flex bg-richblack-800 mr-5 p-3 rounded-md hover:bg-richblack-700 cursor-pointer' onClick={() => HandleSaveBlog('Save')}>
														<label>Save</label>
														<MdSave className='text-2xl' />
													</div>
												)

										}

										{
											SingleBlog?.user?._id == user?._id ?
												(

													<div className='flex bg-richblack-800 mr-5 p-3 rounded-md hover:bg-richblack-700 cursor-pointer' onClick={() => navigate(`/updateBlog/${SingleBlog._id}`)}>
														<label>Edit</label>
														<CiEdit className='text-2xl'></CiEdit>
													</div>
												) :
												(
													<p className='flex bg-richblack-800 mr-5 p-3 rounded-md hover:bg-richblack-700 cursor-pointer' onClick={() => navigate('/dashboard')}>Create Blog</p>
												)
										}



									</div>


								</div>
								<hr className="border-gray-200 sm:mx-auto dark:border-gray-700 mt-3" />

								<div className="max-w-7xl mb-10 mx-auto px-4 sm:px-6 lg:px-8">
									<div className="max-w-3xl mx-auto">
										<div className="py-8">
											<h1 className="text-3xl font-bold mb-2">{SingleBlog?.title}</h1>
											<div className="flex flex-wrap justify-between text-gray-500 text-md ">
												<p>{"Published on " + formatDate(SingleBlog?.createdAt)}</p>
												<p>{"Created By " + SingleBlog?.user?.firstName + " " + SingleBlog?.user?.lastName}</p>
											</div>
										</div>

										<img src={SingleBlog.image} alt="Featured image" className="w-full h-auto mb-8"></img>

										<div className='flex flex-wrap lg:flex-row lg:flex-wrap gap-1 mb-5'>
											<p className='text-md mt-1 font-bold text-richblack-200'>{"category "}</p>
											{SingleBlog?.category?.length > 0 &&
												SingleBlog.category.map((c, i) => (
													<p key={i} className='text-md font-bold bg-richblack-600 p-1 rounded-md w-fit'>{c}</p>
												))
											}
										</div>

										<hr className="border-gray-200 sm:mx-auto dark:border-gray-700 my-3" />

										<div>
											{
												SingleBlog?.content?.length > 0 && SingleBlog?.content?.map((content, index) => (
													<div key={index}>
														<h1 className="text-xl font-semibold mb-3 mt-5">{content?.header}</h1>
														<p className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto mb-2">
															{content?.body}
														</p>
													</div>
												))


											}
										</div>


										<hr className="border-gray-200 sm:mx-auto dark:border-gray-700 my-3" />

										<div className='flex flex-wrap lg:flex-row lg:flex-wrap gap-1 mb-5'>
											<p className='text-md mt-1 font-bold text-richblack-200'>{"References "}</p>
											{
												SingleBlog?.referenceLinks?.length > 0 && SingleBlog.referenceLinks?.map((link, index) => (
													<a key={index} href={link.includes('https://') ? link : 'https://' + link} target='_blank'
														className='text-md font-bold bg-richblack-600 p-1 rounded-md w-fit'>
														{link}
													</a>

												))
											}
										</div>

										<hr className="border-gray-200 sm:mx-auto dark:border-gray-700 my-3" />

										<Comment SingleBlog={SingleBlog}></Comment>


									</div>
								</div>
							</div>
						) :
						(
							<h1 className='space-y-2 text-lg font-medium leading-6 text-indigo-300 p-5'>Blog Not Found</h1>
						)
			}
		</div >

	);
}

export default Blog;