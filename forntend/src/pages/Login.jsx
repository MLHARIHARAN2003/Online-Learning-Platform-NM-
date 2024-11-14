import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../components/utils/AxiosInstance';

const Login = () => {
   const navigate = useNavigate();
   const [data, setData] = useState({
      email: "",
      password: "",
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      if (!data.email || !data.password) {
         return alert("Please fill all fields");
      } else {
         axiosInstance.post('/api/user/login', data)
            .then((res) => {
               if (res.data.success) {
                  alert(res.data.message);
                  localStorage.setItem("token", res.data.token);
                  localStorage.setItem("user", JSON.stringify(res.data.userData));
                  navigate('/dashboard');
                  setTimeout(() => {
                     window.location.reload();
                  }, 1000);
               } else {
                  alert(res.data.message);
               }
            })
            .catch((err) => {
               if (err.response && err.response.status === 401) {
                  alert("User doesn't exist");
               }
               navigate("/login");
            });
      }
   };

   return (
      <>
         <nav className="bg-gray-800 text-white py-4">
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
            <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
               <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
                     {/* Optionally add an icon here */}
                  </div>
               </div>
               <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
               <form onSubmit={handleSubmit} className="space-y-4">
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
                  <button
                     type="submit"
                     className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
                  >
                     Sign In
                  </button>
                  <div className="text-center mt-4 text-sm">
                     Don’t have an account?{" "}
                     <Link to="/register" className="text-blue-600 hover:underline">Sign Up</Link>
                  </div>
               </form>
            </div>
         </div>
      </>
   );
};

export default Login;
