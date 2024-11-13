import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/AxiosInstance';
import { Link } from 'react-router-dom';

const EnrolledCourses = () => {
   const [allEnrolledCourses, setAllEnrolledCourses] = useState([]);

   const allCourses = async () => {
      try {
         const res = await axiosInstance.get('api/user/getallcoursesuser', {
            headers: {
               "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
         });
         if (res.data.success) {
            setAllEnrolledCourses(res.data.data);
         } else {
            alert(res.data.message);
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      allCourses();
   }, []);

   return (
      <div className="overflow-x-auto">
         <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
               <tr className="bg-gray-800 text-white">
                  <th className="py-2 px-4 text-left">Course ID</th>
                  <th className="py-2 px-4 text-left">Course Name</th>
                  <th className="py-2 px-4 text-left">Course Educator</th>
                  <th className="py-2 px-4 text-left">Course Category</th>
                  <th className="py-2 px-4 text-left">Action</th>
               </tr>
            </thead>
            <tbody>
               {allEnrolledCourses?.length > 0 ? (
                  allEnrolledCourses.map((course) => (
                     <tr key={course._id} className="border-b hover:bg-gray-100">
                        <td className="py-2 px-4">{course._id}</td>
                        <td className="py-2 px-4">{course.C_title}</td>
                        <td className="py-2 px-4">{course.C_educator}</td>
                        <td className="py-2 px-4">{course.C_categories}</td>
                        <td className="py-2 px-4">
                           <Link to={`/courseSection/${course._id}/${course.C_title}`}>
                              <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition">
                                 Go To
                              </button>
                           </Link>
                        </td>
                     </tr>
                  ))
               ) : (
                  <tr>
                     <td colSpan="5" className="text-center py-4 text-gray-500">Yet to be enrolled in courses</td>
                  </tr>
               )}
            </tbody>
         </table>
      </div>
   );
};

export default EnrolledCourses;
