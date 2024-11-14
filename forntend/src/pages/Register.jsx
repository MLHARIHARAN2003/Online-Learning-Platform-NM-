import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../components/utils/AxiosInstance';

const Register = () => {
   const navigate = useNavigate();
   const [selectedOption, setSelectedOption] = useState('Select User');
   const [data, setData] = useState({
      name: "",
      email: "",
      password: "",
      type: "",
   });

   const handleSelect = (eventKey) => {
      setSelectedOption(eventKey);
      setData({ ...data, type: eventKey });
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!data.name || !data.email || !data.password || !data.type) {
         return alert("Please fill all fields");
      }
      axiosInstance.post('/api/user/register', data)
         .then((response) => {
            if (response.data.success) {
               alert(response.data.message);
               navigate('/login');
            } else {
               console.log(response.data.message);
            }
         })
         .catch((error) => {
            console.log("Error", error);
         });
   };

   return (
      <>
         <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
               <h2 className="text-2xl font-bold">Scholarly Odyssey</h2>
               <div className="space-x-4">
                  <Link to="/" className="hover:underline">Home</Link>
                  <Link to="/login" className="hover:underline">Login</Link>
                  <Link to="/register" className="hover:underline">Register</Link>
               </div>
            </div>
         </nav>

         <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
               <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
                     {/* Add an icon here if desired */}
                  </div>
               </div>
               <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
               <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                     <label className="block text-sm font-medium text-gray-700">Full Name</label>
                     <input
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700">Email Address</label>
                     <input
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700">Password</label>
                     <input
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                     />
                  </div>
                  <div className="relative">
                     <button
                        type="button"
                        className="w-full text-left px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
                        onClick={() => setSelectedOption((prev) => (prev === 'Select User' ? 'Student' : 'Select User'))}
                     >
                        {selectedOption}
                     </button>
                     <div className="absolute mt-1 w-full bg-white shadow-lg z-10 rounded-md border border-gray-300">
                        <button
                           type="button"
                           className="w-full text-left px-4  text-sm text-gray-700 py-4 hover:bg-gray-100"
                           onClick={() => handleSelect("Student")}
                        >
                           Student
                        </button>
                        <button
                           type="button"
                           className="w-full text-left px-4  mt-4text-sm text-gray-700 py-4 hover:bg-gray-100"
                           onClick={() => handleSelect("Teacher")}
                        >
                           Teacher
                        </button>
                     </div>
                  </div>
                  <div className='block h-28'></div>
                  <button
                     type="submit"
                     className="w-full bg-blue-600 text-white py-4 block rounded-md  font-semibold hover:bg-blue-700 transition"
                  >
                     Sign Up
                  </button>
                  <div className="text-center mt-4 text-sm">
                     Have an account?{" "}
                     <Link to="/login" className="text-blue-600 hover:underline">Sign In</Link>
                  </div>
               </form>
            </div>
         </div>
      </>
   );
}

export default Register;
