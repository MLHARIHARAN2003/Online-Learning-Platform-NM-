import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/AxiosInstance';

const TeacherHome = () => {
   const [allCourses, setAllCourses] = useState([]);

   const getAllCoursesUser = async () => {
      try {
         const res = await axiosInstance.get(`api/user/getallcoursesteacher`, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
         });
         if (res.data.success) {
            setAllCourses(res.data.data);
         }
      } catch (error) {
         console.log('An error occurred:', error);
      }
   };

   useEffect(() => {
      getAllCoursesUser();
   }, []);

   const toggleDescription = (courseId) => {
      setAllCourses((prevCourses) =>
         prevCourses.map((course) =>
            course._id === courseId
               ? { ...course, showFullDescription: !course.showFullDescription }
               : course
         )
      );
   };

   const deleteCourse = async (courseId) => {
      const confirmation = confirm('Are you sure you want to delete')
      if (!confirmation) {
         return;
      }
      try {
         const res = await axiosInstance.delete(`api/user/deletecourse/${courseId}`, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
         })
         if (res.data.success) {
            alert(res.data.message)
            getAllCoursesUser()
         } else {
            alert("Failed to delete the course")
         }
      } catch (error) {
         console.log('An error occurred:', error);
      }
   }

   return (
      <div className="container mx-auto p-4">
         {allCourses?.length > 0 ? (
            allCourses.map((course) => (
               <div key={course._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                  <h2 className="text-xl font-semibold">{course.C_title}</h2>
                  <p className="text-gray-600">
                     <span className="font-semibold">Description: </span>
                     {course.showFullDescription
                        ? course.C_description
                        : course.C_description.slice(0, 10)}{' '}
                     {course.C_description.length > 10 && (
                        <span
                           className="text-blue-500 cursor-pointer"
                           onClick={() => toggleDescription(course._id)}
                        >
                           {course.showFullDescription ? 'Read Less' : 'Read More'}
                        </span>
                     )}
                  </p>
                  <p className="text-gray-600">
                     <span className="font-semibold">Category: </span>
                     {course.C_categories}
                  </p>
                  <p className="text-gray-600">
                     <span className="font-semibold">Sections: </span> {course.sections.length}
                  </p>
                  <p className="text-gray-600" style={{color: '#c3b9b9'}}>
                     <span className="font-semibold">Enrolled students: </span> {course.enrolled}
                  </p>
                  <div className="flex justify-end">
                     <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => deleteCourse(course._id)}
                     >
                        Delete
                     </button>
                  </div>
               </div>
            ))
         ) : (
            <p className="text-center text-gray-600">No courses found!!</p>
         )}
      </div>
   );
};

export default TeacherHome;

