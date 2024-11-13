import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from './AxiosInstance';
import { UserContext } from '../../App';
import { Link, useNavigate } from 'react-router-dom';

const AllCourses = () => {
   const navigate = useNavigate();
   const user = useContext(UserContext);
   const [allCourses, setAllCourses] = useState([]);
   const [filterTitle, setFilterTitle] = useState('');
   const [filterType, setFilterType] = useState('');
   const [showModal, setShowModal] = useState(Array(allCourses.length).fill(false));
   const [cardDetails, setCardDetails] = useState({
      cardholdername: '',
      cardnumber: '',
      cvvcode: '',
      expmonthyear: '',
   });

   const handleChange = (e) => {
      setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
   };

   const handleShow = (courseIndex, coursePrice, courseId, courseTitle) => {
      if (coursePrice === 'free') {
         handleSubmit(courseId);
         return navigate(`/courseSection/${courseId}/${courseTitle}`);
      } else {
         const updatedShowModal = [...showModal];
         updatedShowModal[courseIndex] = true;
         setShowModal(updatedShowModal);
      }
   };

   const handleClose = (courseIndex) => {
      const updatedShowModal = [...showModal];
      updatedShowModal[courseIndex] = false;
      setShowModal(updatedShowModal);
   };

   const getAllCoursesUser = async () => {
      try {
         const res = await axiosInstance.get(`api/user/getallcourses`, {
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

   const isPaidCourse = (course) => /\d/.test(course.C_price);

   const handleSubmit = async (courseId) => {
      try {
         const res = await axiosInstance.post(`api/user/enrolledcourse/${courseId}`, cardDetails, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
         });
         if (res.data.success) {
            alert(res.data.message);
            navigate(`/courseSection/${res.data.course.id}/${res.data.course.Title}`);
         } else {
            alert(res.data.message);
            navigate(`/courseSection/${res.data.course.id}/${res.data.course.Title}`);
         }
      } catch (error) {
         console.log('An error occurred:', error);
      }
   };

   return (
      <>
         {/* Filter Section */}
         <div className="mt-4 text-center">
            <p className="mt-3">Search By:</p>
            <input
               type="text"
               placeholder="Title"
               value={filterTitle}
               onChange={(e) => setFilterTitle(e.target.value)}
               className="border border-gray-300 p-2 rounded-md mb-2"
            />
            <select
               value={filterType}
               onChange={(e) => setFilterType(e.target.value)}
               className="border border-gray-300 p-2 rounded-md ml-2"
            >
               <option value="">All Courses</option>
               <option value="Paid">Paid</option>
               <option value="Free">Free</option>
            </select>
         </div>

         {/* Course List */}
         <div className="p-4 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {allCourses.length > 0 ? (
               allCourses
                  .filter((course) =>
                     filterTitle === '' ||
                     course.C_title?.toLowerCase().includes(filterTitle.toLowerCase())
                  )
                  .filter((course) => {
                     if (filterType === 'Free') {
                        return !isPaidCourse(course);
                     } else if (filterType === 'Paid') {
                        return isPaidCourse(course);
                     } else {
                        return true;
                     }
                  })
                  .map((course, index) => (
                     <div key={course._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="p-4">
                           <h3 className="text-xl font-bold mb-2">Modules</h3>
                           {course.sections.length > 0 ? (
                              course.sections.slice(0, 2).map((section, i) => (
                                 <div key={i} className="mb-4">
                                    <p className="font-semibold">Title: {section.S_title}</p>
                                    <p className="text-gray-600">Description: {section.S_description}</p>
                                    <hr className="my-2" />
                                 </div>
                              ))
                           ) : (
                              <p>No Modules</p>
                           )}
                           <p className="font-semibold text-gray-700">...and more to watch</p>
                        </div>
                        <div className="p-4 bg-gray-100">
                           <h1 className="text-2xl font-semibold">{course.C_title}</h1>
                           <p className="text-gray-500">Category: {course.C_categories}</p>
                           <p className="text-gray-500">Educator: {course.C_educator}</p>
                           <p>Sections: {course.sections.length}</p>
                           <p>Price (Rs.): {course.C_price}</p>
                           <p>Enrolled students: {course.enrolled}</p>
                           {user.userLoggedIn ? (
                              <>
                                 <button
                                    onClick={() => handleShow(index, course.C_price, course._id, course.C_title)}
                                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                 >
                                    Start Course
                                 </button>

                                 {/* Modal */}
                                 {showModal[index] && (
                                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                       <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                                          <h2 className="text-xl font-semibold mb-4">
                                             Payment for {course.C_title} Course
                                          </h2>
                                          <p className="mb-2">Educator: {course.C_educator}</p>
                                          <p className="mb-4">Price: {course.C_price}</p>

                                          <form
                                             onSubmit={(e) => {
                                                e.preventDefault();
                                                handleSubmit(course._id);
                                             }}
                                             className="space-y-4"
                                          >
                                             <input
                                                type="text"
                                                name="cardholdername"
                                                value={cardDetails.cardholdername}
                                                onChange={handleChange}
                                                placeholder="Cardholder's Name"
                                                className="w-full border border-gray-300 p-2 rounded"
                                                required
                                             />
                                             <input
                                                type="text"
                                                name="cardnumber"
                                                value={cardDetails.cardnumber}
                                                onChange={handleChange}
                                                placeholder="1234 5678 9012 3457"
                                                className="w-full border border-gray-300 p-2 rounded"
                                                required
                                             />
                                             <div className="flex space-x-4">
                                                <input
                                                   type="text"
                                                   name="expmonthyear"
                                                   value={cardDetails.expmonthyear}
                                                   onChange={handleChange}
                                                   placeholder="MM/YYYY"
                                                   className="w-full border border-gray-300 p-2 rounded"
                                                   required
                                                />
                                                <input
                                                   type="text"
                                                   name="cvvcode"
                                                   value={cardDetails.cvvcode}
                                                   onChange={handleChange}
                                                   placeholder="CVV"
                                                   className="w-full border border-gray-300 p-2 rounded"
                                                   required
                                                />
                                             </div>
                                             <div className="flex justify-end space-x-2 mt-4">
                                                <button
                                                   onClick={() => handleClose(index)}
                                                   className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                                >
                                                   Close
                                                </button>
                                                <button
                                                   type="submit"
                                                   className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                                >
                                                   Pay Now
                                                </button>
                                             </div>
                                          </form>
                                       </div>
                                    </div>
                                 )}
                              </>
                           ) : (
                              <Link to="/login">
                                 <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                                    Start Course
                                 </button>
                              </Link>
                           )}
                        </div>
                     </div>
                  ))
            ) : (
               <p className="text-center">No courses at the moment</p>
            )}
         </div>
      </>
   );
};

export default AllCourses;
