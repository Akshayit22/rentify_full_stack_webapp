import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProperty, updateProperty } from '../../../Services/operations/apiProperty';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { setUpdateProperty } from '../../../redux/slices/propertySlice';
import Spinner from '../../../Component/Commen/Spinner';

const UpdatedProperty = () =>
{

	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { OneProperty } = useSelector( ( state ) => state.property );
	var { user } = useSelector( ( state ) => state.dashboard );
	const { token } = useSelector( ( state ) => state.auth );

	const [ loading, setLoading ] = useState( false );
	const ID = location.pathname.split( "/" ).at( -1 );
	const SingleProperty = OneProperty;
	var user = user ? JSON.parse( user ) : null;

	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors },
	} = useForm();

	const onSubmit = async ( data ) =>
	{
		const { title, description, rent, deposite, roomType, area, city, constructedIn, NearestHospitalDistance } = data;
		if ( !title || !description || !rent || !deposite || !roomType || !area || !city || !constructedIn || !NearestHospitalDistance )
		{
			console.log( description );
			toast.error( "Please Fill all the details required" );
		}
		else
		{

			//console.log("AFTER add course API call");
			console.log( "PRINTING FORMDATA", data );
			dispatch( updateProperty( ID, title, description, rent, deposite, roomType, area, city, constructedIn, NearestHospitalDistance, token, navigate ) );
		}

	}

	const getData = async () =>
	{
		setLoading( true );
		dispatch( setUpdateProperty( true ) );
		await dispatch( getProperty( ID ) );
		setLoading( false );

		console.log( "single SingleProperty", OneProperty );
		console.log( "user", user );
	}

	useEffect( () =>
	{
		getData();
	}, [] );

	return (
		<div className='min-h-screen'>

			{
				loading ?
					<Spinner></Spinner> :
					SingleProperty !== null ?
						(
							<div className='min-h-screen bg-gradient-to-r from-richblack-700 to-blue-800'>
								<div className="flex items-center justify-center p-12">
									<div className="mx-auto w-full max-w-[550px] ">
										<form onSubmit={ handleSubmit( onSubmit ) }>

											<div className='mb-4'>
												<label htmlFor="title" className="mb-3 block text-base font-medium text-white">
													Property Title
												</label>
												<input name="title" id="title" placeholder="Enter Property Title" { ...register( "title" ) } defaultValue={ SingleProperty.title }
													className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md " />
											</div>

											<div className='mb-4'>
												<label htmlFor="description" className="mb-3 block text-base font-medium text-white">
													Property Description
												</label>
												<textarea name="description" id="description" placeholder="Enter Property description" { ...register( "description" ) } defaultValue={ SingleProperty.description }
													className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md " />
											</div>


											<div className='mb-4'>
												<label htmlFor="area" className="mb-3 block text-base font-medium text-white">
													Property Area
												</label>
												<input name="area" id="area" placeholder="Enter Property area" { ...register( "area" ) } defaultValue={ SingleProperty.area }
													className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md " />
											</div>
											<div className='mb-4'>
												<label htmlFor="city" className="mb-3 block text-base font-medium text-white">
													Property City
												</label>
												<input name="city" id="city" placeholder="Enter Property city" { ...register( "city" ) } defaultValue={ SingleProperty.city }
													className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md " />
											</div>
											<div className='mb-4'>
												<label htmlFor="rent" className="mb-3 block text-base font-medium text-white">
													Property rent
												</label>
												<input name="rent" id="rent" placeholder="Enter Property rent" { ...register( "rent" ) } defaultValue={ SingleProperty.rent }
													className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md " />
											</div>


											<div className='mb-4'>
												<label htmlFor="roomType" className="mb-3 block text-base font-medium text-white">
													Property Room Type
												</label>
												<input name="roomType" id="roomType" placeholder="Enter Property roomType" { ...register( "roomType" ) } defaultValue={ SingleProperty.roomType }
													className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md " />
											</div>

											<div className='mb-4'>
												<label htmlFor="deposite" className="mb-3 block text-base font-medium text-white">
													Property deposite
												</label>
												<input name="deposite" id="deposite" placeholder="Enter Property deposite" { ...register( "deposite" ) } defaultValue={ SingleProperty.deposite }
													className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md " />
											</div>
											<div className='mb-4'>
												<label htmlFor="NearestHospitalDistance" className="mb-3 block text-base font-medium text-white">
													Property distance from nearest hospital
												</label>
												<input name="NearestHospitalDistance" id="NearestHospitalDistance" placeholder="Enter Property distance from nearest hospital" { ...register( "NearestHospitalDistance" ) } defaultValue={ SingleProperty.NearestHospitalDistance }
													className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md " />
											</div>

											<div className='mb-4'>
												<label htmlFor="constructedIn" className="mb-3 block text-base font-medium text-white">
													Property construction year
												</label>
												<input name="constructedIn" id="constructedIn" placeholder="Enter Property constructedIn" { ...register( "constructedIn" ) } defaultValue={ SingleProperty.constructedIn }
													className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md " />
											</div>

											<div>
												<button type="submit"
													className="hover:bg-blue-200 w-full rounded-md bg-blue-400 py-3 px-8 text-center text-base font-semibold text-white outline-none">
													Update Property
												</button>
											</div>
										</form>
									</div>
								</div>
							</div>
						) :
						(
							<h1 className='space-y-2 text-lg font-medium leading-6 text-indigo-300 p-5'>Property Data Not Found</h1>
						)
			}
		</div >
	)
}

export default UpdatedProperty;