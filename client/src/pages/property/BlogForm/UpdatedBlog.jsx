import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getBlog } from '../../../Services/operations/apiBlog';
import { updateBlog } from '../../../Services/operations/apiBlog';
import { toast } from 'react-toastify';
import ChipInput from '../BlogFormComponents/ChipInput';
import BlogContentForm from '../BlogFormComponents/BlogContentForm';
import Spinner from '../../../Component/Commen/Spinner';
import { useForm } from 'react-hook-form';
import { setUpdateBlog } from '../../../redux/slices/blogsSlice';
import Upload from '../BlogFormComponents/Upload';

const UpdatedBlog = () => {
	/*
		updateBlog(blogId, title, content, referenceLinks, category,image,token)
		{
		    "blogId":"65c9b452091462a32e429e43",
		    "title":"First Blog.",
		    "content":[{"header":"First Blog.","body":"This is First updated Blog"}],
		    "referenceLinks":["http://www.github.com"],
		    "category":["updated"],
		    "image":"https://res.cloudinary.com/dwvnhmzvu/image/upload/v1707656948/setup/zisqss984okudza6nxtt.jpg"
		}

	*/

	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { OneBlog } = useSelector((state) => state.blog);
	var { user } = useSelector((state) => state.profile);
	const { token } = useSelector((state) => state.auth);

	const [loading, setLoading] = useState(false);
	const ID = location.pathname.split("/").at(-1);
	const SingleBlog = OneBlog.length > 0 ? OneBlog[0] : null;
	var user = user?JSON.parse(user):null;

	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		console.log(data);
		if (data.BlogTitle == '' || data.Category?.length == 0 || data.BlogContent[0].header == '' || data.BlogContent[0].body == '' ||
			data.ReferenceLinks?.length == 0) {

			toast.error("Please Fill all the details required");
		}
		else {
			const content = JSON.stringify(data.BlogContent);
			const formData = new FormData();

			formData.append('blogId', ID);
			formData.append('title', data.BlogTitle);
			formData.append('content', content);
			formData.append('category', JSON.stringify(data.Category));
			formData.append('referenceLinks', JSON.stringify(data.ReferenceLinks));
			formData.append('token', token);
			

			if(data.thumbnailImage){
				formData.append('Image', data.thumbnailImage);
			}else{
				formData.append('image', SingleBlog.image);
			}

			console.log("PRINTING FORMDATA", [...formData]);
			dispatch(updateBlog(formData, token, navigate));
		}
	}

	const getData = async () => {
		setLoading(true);
		dispatch(setUpdateBlog(true));
		await dispatch(getBlog(ID));
		setLoading(false);

		console.log("single blog", SingleBlog);
		console.log("user", user);
	}

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className='min-h-screen'>

			{
				loading ?
					<Spinner></Spinner> :
					SingleBlog !== null ?
						(
							<div className='min-h-screen bg-gradient-to-r from-richblack-700 to-blue-800'>
								<div className="flex items-center justify-center p-12">
									<div className="mx-auto w-full max-w-[550px] ">
										<form onSubmit={handleSubmit(onSubmit)}>
											<div className='mb-4'>
												<label htmlFor="name" className="mb-3 block text-base font-medium text-white">
													Blog Title
												</label>
												<textarea name="BlogTitle" id="BlogTitle" placeholder="Enter Blog Title" {...register("BlogTitle")} defaultValue={SingleBlog.title}
													className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md " />
											</div>

											{/* {
												SingleBlog?.image ? (
													<div className="flex flex-col space-y-2">
														<label className="mb-3 block text-base font-medium text-white" >Blog Image</label>
														<img src={SingleBlog.image} alt="Image not Found" className="h-[200px] md:h-[250px w-full rounded-md object-cover" />
													</div>
												) :
													(<div></div>)
											} */}

											<Upload
												name={"thumbnailImage"}
												label={"Blog Image"}
												register={register}
												errors={errors}
												setValue={setValue}
												defaultContent={SingleBlog?.image}
											/>

											<BlogContentForm
												label="Blog Content"
												name="BlogContent"
												placeholder="Enter Blog Content"
												register={register}
												setValue={setValue}
												getValues={getValues}
												defaultContent={SingleBlog?.content}
											/>


											<ChipInput
												label="Category"
												name="Category"
												placeholder="Enter category and press enter"
												register={register}
												setValue={setValue}
												getValues={getValues}
												defaultContent={SingleBlog?.category}
											/>

											<ChipInput
												label="Reference Links"
												name="ReferenceLinks"
												placeholder="Enter Reference Links and press enter"
												register={register}
												setValue={setValue}
												getValues={getValues}
												defaultContent={SingleBlog?.referenceLinks}
											/>

											<div>
												<button type="submit"
													className="hover:bg-blue-200 w-full rounded-md bg-blue-400 py-3 px-8 text-center text-base font-semibold text-white outline-none">
													Update Blog
												</button>
											</div>
										</form>
									</div>
								</div>
							</div>
						) :
						(
							<h1 className='space-y-2 text-lg font-medium leading-6 text-indigo-300 p-5'>Blog Data Not Found</h1>
						)
			}
		</div >
	)
}

export default UpdatedBlog;