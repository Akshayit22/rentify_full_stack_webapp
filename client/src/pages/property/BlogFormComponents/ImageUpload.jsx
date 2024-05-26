import { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { uploadImage } from '../../../Services/operations/apiAuth';
import { useDispatch, useSelector } from "react-redux";

function ImageUpload() {
	const [image, setImage] = useState(null);

	const dispatch = useDispatch();

	const {token} = useSelector((s)=> s.auth);

	useEffect(() => {
		
	}, [image]);

	function displayPreview(file) {
		// var reader = new FileReader();
		// reader.readAsDataURL(file);
		// reader.onload = () => {
		// 	setImage(reader.result);
		//      // we use src={image} to display
		// };

		setImage(file);
		// we use src={URL.createObjectURL(image)} to display
	}

	const uploadImageHandler = () =>{
		console.log(image);

		const formData = new FormData();
		formData.append('files', image);
		
		dispatch(uploadImage(formData,token));

	}

	return (
		<div  className=" bg-gray-100 flex justify-center items-center w-fit h-full">

			<div className="w-[300px] relative border-2 border-gray-300 border-dashed rounded-lg p-6 " id="dropzone"
				onDrop={(e) => {
					e.preventDefault();
					var file = e.dataTransfer.files[0];
					displayPreview(file);
				}}
			>
			{
				image ? (
					<div>
						<MdClose className=" h-10 w-10 absolute right-0 top-0 " 
							onClick={()=> {
								setImage(null);
							}}/> 
						{/* <img src={image} height={"300px"} width={"300px"}></img> */}
						<img src={URL.createObjectURL(image)} height={"300px"} width={"300px"}></img>
					</div>
				) : (
					<div>
						<input type="file" className="absolute inset-0 w-full h-full opacity-0 z-50" 
							onChange={(e)=>{
								e.preventDefault();
								var file = e.target.files[0];
								displayPreview(file);
							}}/>
						<div className="text-center">
							<FaCloudUploadAlt className=" mx-auto h-12 w-12" />

							<h3 className="mt-2 text-sm font-medium text-gray-900">
								<label htmlFor="file-upload" className="relative cursor-pointer" 
								onChange={(e) => {
									var file = e.target.files[0];
									displayPreview(file);
								}}>
									<span>Drag and drop</span>
									<span className="text-indigo-600"> or browse</span>
									<span>to upload</span>
									<input id="file-upload" name="file-upload" type="file" className="sr-only"></input>
								</label>
							</h3>
							<p className="mt-1 text-xs text-gray-500">
								PNG, JPG, GIF up to 10MB
							</p>
						</div>

					</div>
						)
					}
					<button className="bg-blue-500 hover:bg-blue-700 transition-all duration-1s text-white font-bold py-3 px-6 rounded-md w-full mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-500 dark:focus:ring-opacity-50"
						onClick={()=> uploadImageHandler()}>Upload</button>

				</div>
				
				

		</div>
	)
}

export default ImageUpload