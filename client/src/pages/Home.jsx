import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getAllProperty } from '../Services/operations/apiProperty';
import Spinner from '../Component/Commen/Spinner';
import AllProperty from './property/AllProperty';

const Home = () => {

	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		dispatch(getAllProperty());
		setLoading(false);
	}, []);

	return (
		<div className='min-h-screen'>
			{

				loading ? <Spinner></Spinner> : <AllProperty></AllProperty>
					
			}
			

		</div>
	)
}

export default Home;