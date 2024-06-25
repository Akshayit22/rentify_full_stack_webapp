import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProperty } from '../../Services/operations/apiProperty';
import Spinner from '../../Component/Commen/Spinner';
import { formatDate } from '../../Services/formatDate';
import { CiEdit } from "react-icons/ci";
import { MdKeyboardBackspace, MdSave } from "react-icons/md";
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { dashboard, likeOrDislike, interested } from '../../Services/operations/apiDashboard';;
import { FcLike } from 'react-icons/fc';

const Property = () =>
{

	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const [ loading, setLoading ] = useState( false );
	const { OneProperty } = useSelector( ( state ) => state.property );
	var { user } = useSelector( ( state ) => state.dashboard );
	const { token } = useSelector( ( state ) => state.auth );

	const ID = location.pathname.split( "/" ).at( -1 );
	var user = user ? JSON.parse( user ) : null;
	const property = OneProperty;
	const [ toggle, setToggle ] = useState( true );

	// like 
	// interested

	const handleInterested = () =>
	{
		dispatch( interested( ID, token ) );
	}
	const handleLikes = () =>
	{
		if ( toggle )
		{
			const mode = 'Like';
			dispatch( likeOrDislike( ID, mode, token ) );
			setToggle( false );
		} else
		{
			const mode = 'Dislike';
			dispatch( likeOrDislike( ID, mode, token ) )
			setToggle( true );
		}
	}

	useEffect( () =>
	{
		setLoading( true );
		dispatch( getProperty( ID ) );
		setLoading( false );

		console.log( "single Property", property );
	}, [] );

	return (
		<div className='min-h-screen'>

			{
				loading ?
					<Spinner></Spinner> :
					property !== null ?
						(

							<div>

								<div className=' p-6 border-2 border-dashed border-gray-400 text-black bg-richblack-400'>
									<p onClick={ () => navigate( `/property/${ property._id }` ) } className='hover:underline text-3xl hover:cursor-pointer'>{ property.title }</p>

									<div className='flex flex-wrap justify-between text-xl'>
										<p>{ 'Room: ' + property.roomType }</p>
										<p>{ 'Construction: ' + property.constructedIn }</p>
									</div>

									<div className='flex flex-wrap justify-between text-xl'>
										<p>{ 'Area: ' + property.area }</p>
										<p>{ 'City :' + property.city }</p>
									</div>
									<div className='flex flex-wrap justify-between text-xl'>
										<p>{ 'Rent: ' + property.rent }</p>
										<p>{ 'Deposite:' + property.deposite }</p>
									</div>

									<p>{ 'Nearest Hospital: ' + property.NearestHospitalDistance }</p>
									<p>{ property.description }</p>
									<div className='flex flex-wrap justify-between'>
										<div className='flex text-2xl text-balance hover:cursor-pointer'
											onClick={ () => handleLikes() } >
											<FcLike className='mt-1'></FcLike>
											<p>{ property.LikesCount }</p>

										</div>

										<button onClick={ () => handleInterested() } className="flex items-center text-indigo-700 border border-indigo-600 py-2 px-6 gap-2 rounded inline-flex items-center hover:bg-richblack-600">
											<span>
												Interested
											</span>

										</button>
									</div>
								</div>

								<div className=' p-6 border-2 border-dashed border-gray-400 text-black bg-richblack-400'>
									<p className='text-3xl'>Owner</p>
									<div className='flex flex-wrap text-xl'>
										<p>{ property.owner?.firstName + " " + property.owner?.lastName }</p>
									</div>

									<div className='flex flex-wrap justify-between text-xl'>
										<p>{ 'Email: ' + property.owner?.email }</p>
										<p>{ 'Contact :' + property.owner?.contact }</p>
									</div>



								</div>

							</div>



						) :
						(
							<h1 className='space-y-2 text-lg font-medium leading-6 text-indigo-300 p-5'>Property Not Found</h1>
						)
			}
		</div >

	);
}

export default Property;