import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const BlogContentForm = ({ name, label, register, setValue, defaultContent }) => {

	const { UpdateBlog } = useSelector((s) => s.blog);
	const [content, setContent] = useState(UpdateBlog ? [] : [
		{ 'header': '', 'body': '' }
	]);

	const HandleTextChange = (text, index, type) => {

		var TempObj = content[index]

		if (type == 0) {
			TempObj.header = text;
		} else {
			TempObj.body = text;
		}

		content.splice(index, 1, TempObj);
		setValue(name, content);


	}

	const initialization = () => {

		register(name);
		if (UpdateBlog) {
			var array = [];
			defaultContent.map((obj, index) => {
				var tempObj = { 'header': obj.header, 'body': obj.body }
				array.push(tempObj);
			});
			setValue(name, array);
			setContent(array);
		}
	}


	useEffect(() => {
		initialization();
	}, []);

	return (
		<div className='mb-4'>
			<label className="mb-2 block text-base font-medium text-white" htmlFor={name}>{label}</label>
			<div className='flex flex-col '>
				{
					content.map((obj, index) => (
						<div key={index} className='flex flex-col'>
							<label className="mb-1 block text-base font-medium text-white" htmlFor={`header_${index}`}>{`Enter Heading and Body ${index + 1}`}</label>
							<input name={`header_${index}`} placeholder={`Heading ${index + 1}`} onChange={(e) => HandleTextChange(e.target.value, index, 0)} defaultValue={obj.header} 
								className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md "
							></input>
							<textarea name={`body_${index}`} placeholder={`Heading ${index + 1} Body`} onChange={(e) => HandleTextChange(e.target.value, index, 1)} defaultValue={obj.body} rows={6}
								className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mt-1 "
							></textarea>


							<div className='flex justify-between mt-2'>

								{
									index != 0 ?
										(
											<button className="hover:bg-pink-500  rounded-md bg-pink-400 py-2 px-4 text-center text-base font-semibold text-white outline-none"
												onClick={(e) => {
													e.preventDefault();
													const updatedcontent = [...content];
													updatedcontent.splice(index, 1);
													setContent(updatedcontent);
													setValue(name, content);
												}}>
												Remove
											</button>
										) : (<div></div>)
								}


								<button className="hover:bg-blue-200  rounded-md bg-blue-400 py-2 px-4 text-center text-base font-semibold text-white outline-none"
									onClick={(e) => {
										e.preventDefault();
										setContent([...content, { 'header': '', 'body': '' }])
										setValue(name, content);
									}}>
									Add More
								</button>
							</div>
						</div>
					))
				}
			</div>
		</div>
	)
}

export default BlogContentForm