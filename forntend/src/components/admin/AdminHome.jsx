import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/AxiosInstance';
import { Link } from 'react-router-dom';

const AdminHome = () => {
   const [allUsers, setAllUsers] = useState([]);

   const allUsersList = async () => {
      try {
         const res = await axiosInstance.get('api/admin/getallusers', {
            headers: {
               "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
         });
         if (res.data.success) {
            setAllUsers(res.data.data);
         } else {
            alert(res.data.message);
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      allUsersList();
   }, []);

   const deleteUser = async (userId) => {
      const confirmation = confirm('Are you sure you want to delete');
      if (!confirmation) {
         return;
      }
      try {
         const res = await axiosInstance.delete(`api/user/deleteuser/${userId}`, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
         });
         if (res.data.success) {
            alert(res.data.message);
            allUsersList();
         } else {
            alert("Failed to delete the user");
         }
      } catch (error) {
         console.log('An error occurred:', error);
      }
   };

   return (
      <div className="p-6 bg-white shadow-md rounded-md">
         <nav className="bg-gray-800 text-white px-4 py-3">
            <div className="container mx-auto flex items-center justify-between">
               <h3 className="text-xl font-bold">Scholarly Odyssey</h3>
               <div className="flex items-center space-x-4">
                  <Link
                     to="/admin"
                     className="hover:underline"
                  >
                     Dashboard
                  </Link>
                  <Link
                     to="/admin/allcourses"
                     className="hover:underline"
                  >
                     All Courses
                  </Link>
                  <button
                     onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        window.location.href = "/";
                     }}
                     className="bg-red-500 px-2 py-2 hover:bg-red-600 rounded-md"
                  >
                     Logout
                  </button>
               </div>
            </div>
         </nav>
         <h2 className="text-xl font-semibold text-gray-800 mb-4">All Users</h2>
         <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
               <thead className="bg-gray-800">
                  <tr>
                     <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">User ID</th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">User Name</th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Email</th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Type</th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Action</th>
                  </tr>
               </thead>
               <tbody className="bg-white divide-y divide-gray-200">
                  {allUsers.length > 0 ? (
                     allUsers.map((user) => (
                        <tr key={user._id} className="hover:bg-gray-100 transition duration-150">
                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user._id}</td>
                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.name}</td>
                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.type}</td>
                           <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                 onClick={() => deleteUser(user._id)}
                                 className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                              >
                                 Delete
                              </button>
                              {/* <button className="px-4 py-2 ml-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Update</button> */}
                           </td>
                        </tr>
                     ))
                  ) : (
                     <tr>
                        <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                           No users found
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default AdminHome;
