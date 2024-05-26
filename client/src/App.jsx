import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './Component/Auth/PrivateRoute';
import OpenRoute from './Component/Auth/OpenRoute';
import ResetPassword from './pages/ResetPassword';
import GetStarted from './pages/GetStarted';
import Navbar from './pages/common/Navbar';
import Footer from './pages/common/Footer';
import Property from './pages/property/Property';
// import Blog from './pages/blog/blog';
// import NewBlog from './pages/blog/BlogForm/NewBlog';
// import UpdatedBlog from './pages/blog/BlogForm/UpdatedBlog';

function App() {

  return (
    <div className=' lg:w-[98.9vw]  min-h-screen bg-gradient-to-r from-richblack-700 to-blue-900 flex flex-col text-white'>

      <div className='pb-[70px]'>
          <Navbar></Navbar>
      </div>

      <Routes>

        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/user-auth' element={<GetStarted ></GetStarted>}></Route>

        <Route path='/home' element={<Home></Home>}></Route>

        <Route path='/resetPassword' element={<OpenRoute><ResetPassword /></OpenRoute>} />

        <Route path='/property/:id' element={<PrivateRoute><Property></Property></PrivateRoute>} />

        <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
{/* 
        <Route path='/createProperty' element={<PrivateRoute><NewBlog></NewBlog></PrivateRoute>}></Route>

        <Route path='/updateProperty/:id' element={<PrivateRoute> <UpdatedBlog></UpdatedBlog> </PrivateRoute>} />
         */}
        <Route path='*' element={<h1>Page Not Found 404</h1>}></Route>
      </Routes>


      <Footer></Footer>
    </div>
  )
}

export default App;
