import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getAllBlogs } from '../Services/operations/apiBlog';
import Spinner from '../Component/Commen/Spinner';
import AllBlogs from './blog/AllBlogs';
import { toast } from 'react-toastify';

const Home = () => {

	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		dispatch(getAllBlogs());
		setLoading(false);
	}, []);

	return (
		<div className='min-h-screen'>
			{

				loading ? <Spinner></Spinner> : <AllBlogs></AllBlogs>
					
			}
			

		</div>
	)
}

export default Home;