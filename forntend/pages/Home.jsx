import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/utils/Nav';
//import AllCourses from './AllCourses';

const Home = () => {
   return (
    <>
     <Nav />

    {/* Hero Section with Background Image */}
    <div className="relative bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center" style={{ backgroundImage: `url('./src/assets/bg.jpg')` }}>
       {/* Overlay */}
       <div className="absolute inset-0 bg-black opacity-50"></div>

       {/* Content */}
       <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-semibold mb-6">Small App, Big Dreams: <br /> Elevating Your Education</h1>
          <Link to="/register">
             <button className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition">
                Explore Courses
             </button>
          </Link>
       </div>
    </div>

    {/* Trending Courses Section */}
    <div className="py-16">
       <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Trending Courses</h2>
       <div className="container mx-auto">
          {/* <AllCourses /> */}
       </div>
    </div>
 </>
   );
}

export default Home;
