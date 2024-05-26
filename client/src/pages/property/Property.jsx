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

const Property = () => {

	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const { OneProperty } = useSelector((state) => state.property);
	var { user } = useSelector((state) => state.dashboard);
	const { token } = useSelector((state) => state.auth);
	const ID = location.pathname.split("/").at(-1);
	var user = user ? JSON.parse(user) : null;

	
	// like 
	// interested


	useEffect(() => {
		setLoading(true);
		dispatch(getProperty(ID));
		setLoading(false);

		console.log("single Property", OneProperty);
	}, []);

	return (
		<div className='min-h-screen'>

			{
				loading ?
					<Spinner></Spinner> :
					OneProperty !== null ?
						(
							


							<div>
									<p>{OneProperty.title}</p>
									<p>{OneProperty.city}</p>
									<p>{OneProperty.area}</p>
									<p>{OneProperty.rent}</p>
									<p>{OneProperty.NearestHospitalDistance}</p>
									<p>{OneProperty.LikesCount}</p>
									<p>{OneProperty.constructedIn}</p>
									<p>{OneProperty.description}</p>
									<p>{OneProperty.image}</p>
									<p>{OneProperty.deposite}</p>
									<p>{OneProperty.roomType}</p>

									<br></br><br></br><br></br>

									<p>{OneProperty.owner?.firstName + " " +OneProperty.owner?.lastName}</p>
									<p>{OneProperty.owner?.email}</p>
									<p>{OneProperty.owner?.contact}</p>


							</div>


						) :
						(
							<h1 className='space-y-2 text-lg font-medium leading-6 text-indigo-300 p-5'>Blog Not Found</h1>
						)
			}
		</div >

	);
}

export default Property;