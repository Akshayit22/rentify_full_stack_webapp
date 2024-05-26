import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {createBlog} from '../../../Services/operations/apiBlog';
import ChipInput from '../BlogFormComponents/ChipInput';
import BlogContentForm from '../BlogFormComponents/BlogContentForm';
import Upload from '../BlogFormComponents/Upload';
import { setUpdateBlog } from '../../../redux/slices/blogsSlice';
import { useNavigate } from 'react-router-dom';
const NewBlog = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { token } = useSelector((s) => s.auth);

	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors },
	} = useForm();


	useEffect(() => {
		dispatch(setUpdateBlog(false));
	}, []);

	const onSubmit = async (data) => {

		//validate
		if(data.BlogTitle == '' || data.Category?.length == 0 || data.BlogContent[0].header == '' || data.BlogContent[0].body == '' ||
			data.ReferenceLinks?.length == 0){
				
				toast.error("Please Fill all the details required");
		}
		else{
			const content = JSON.stringify(data.BlogContent);
			const formData = new FormData();

			formData.append('title', data.BlogTitle);
			formData.append('content', content);
			formData.append('category',JSON.stringify( data.Category));
			formData.append('referenceLinks', JSON.stringify(data.ReferenceLinks));
			formData.append('token',token);

			if(data.thumbnailImage){
				formData.append('Image', data.thumbnailImage);
			}

			//console.log("AFTER add course API call");
			console.log("PRINTING FORMDATA" , [...formData]);
			dispatch(createBlog(formData,token,navigate));
		}
	}


	return (
		
		<div className='min-h-screen bg-gradient-to-r from-richblack-700 to-blue-800'>
			<div className="flex items-center justify-center p-12">
				<div className="mx-auto w-full max-w-[550px] ">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className='mb-4'>
							<label htmlFor="name" className="mb-3 block text-base font-medium text-white">
								Blog Title
							</label>
							<textarea name="BlogTitle" id="BlogTitle" placeholder="Enter Blog Title" {...register("BlogTitle")}
								className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md " />
						</div>

						<Upload
							name={"thumbnailImage"}
							label={"Blog Image"}
							register={register}
							errors={errors}
							setValue={setValue}
						/>

						<BlogContentForm
							label="Blog Content"
							name="BlogContent"
							placeholder="Enter Blog Content"
							register={register}
							setValue={setValue}
							getValues={getValues}
						/>


						<ChipInput
							label="Category"
							name="Category"
							placeholder="Enter category and press enter"
							register={register}
							setValue={setValue}
							getValues={getValues}
						/>

						<ChipInput
							label="Reference Links"
							name="ReferenceLinks"
							placeholder="Enter Reference Links and press enter"
							register={register}
							setValue={setValue}
							getValues={getValues}
						/>

						<div>
							<button type="submit"
								className="hover:bg-blue-200 w-full rounded-md bg-blue-400 py-3 px-8 text-center text-base font-semibold text-white outline-none">
								Create Blog
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default NewBlog;