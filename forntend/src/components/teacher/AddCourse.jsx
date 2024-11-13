import React, { useState, useContext } from 'react';
import { UserContext } from '../../App.jsx';
import axiosInstance from '../utils/AxiosInstance.jsx';

const AddCourse = () => {
   const user = useContext(UserContext);
   const [addCourse, setAddCourse] = useState({
      userId: user.userData._id,
      C_educator: '',
      C_title: '',
      C_categories: '',
      C_price: '',
      C_description: '',
      sections: [],
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setAddCourse({ ...addCourse, [name]: value });
   };

   const handleCourseTypeChange = (e) => {
      setAddCourse({ ...addCourse, C_categories: e.target.value });
   };

   const addInputGroup = () => {
      setAddCourse({
         ...addCourse,
         sections: [
            ...addCourse.sections,
            { S_title: '', S_description: '', S_content: null },
         ],
      });
   };

   const handleChangeSection = (index, e) => {
      const updatedSections = [...addCourse.sections];
      const sectionToUpdate = updatedSections[index];
      if (e.target.name === 'S_content') {
         sectionToUpdate.S_content = e.target.files[0];
      } else {
         sectionToUpdate[e.target.name] = e.target.value;
      }
      setAddCourse({ ...addCourse, sections: updatedSections });
   };

   const removeInputGroup = (index) => {
      const updatedSections = [...addCourse.sections];
      updatedSections.splice(index, 1);
      setAddCourse({ ...addCourse, sections: updatedSections });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      Object.keys(addCourse).forEach((key) => {
         if (key === 'sections') {
            addCourse[key].forEach((section) => {
               if (section.S_content instanceof File) {
                  formData.append(`S_content`, section.S_content);
               }
               formData.append(`S_title`, section.S_title);
               formData.append(`S_description`, section.S_description);
            });
         } else {
            formData.append(key, addCourse[key]);
         }
      });

      try {
         const res = await axiosInstance.post('/api/user/addcourse', formData, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`,
               'Content-Type': 'multipart/form-data',
            },
         });
         alert(res.data.success ? res.data.message : 'Failed to create course');
      } catch (error) {
         console.error('An error occurred:', error);
         alert('An error occurred while creating the course');
      }
   };

   return (
      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
         <form onSubmit={handleSubmit} className="space-y-6">
            {/* Course Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium text-gray-700">Course Type</label>
                  <select
                     value={addCourse.C_categories}
                     onChange={handleCourseTypeChange}
                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                     required
                  >
                     <option value="">Select categories</option>
                     <option value="IT & Software">IT & Software</option>
                     <option value="Finance & Accounting">Finance & Accounting</option>
                     <option value="Personal Development">Personal Development</option>
                  </select>
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700">Course Title</label>
                  <input
                     type="text"
                     name="C_title"
                     value={addCourse.C_title}
                     onChange={handleChange}
                     placeholder="Enter Course Title"
                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                     required
                  />
               </div>
            </div>

            {/* Educator, Price, and Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium text-gray-700">Course Educator</label>
                  <input
                     type="text"
                     name="C_educator"
                     value={addCourse.C_educator}
                     onChange={handleChange}
                     placeholder="Enter Course Educator"
                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                     required
                  />
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700">Course Price (Rs.)</label>
                  <input
                     type="text"
                     name="C_price"
                     value={addCourse.C_price}
                     onChange={handleChange}
                     placeholder="For free course, enter 0"
                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                     required
                  />
               </div>
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700">Course Description</label>
               <textarea
                  name="C_description"
                  value={addCourse.C_description}
                  onChange={handleChange}
                  placeholder="Enter Course description"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
               />
            </div>

            {/* Section Inputs */}
            <hr className="my-6" />
            {addCourse.sections.map((section, index) => (
               <div key={index} className="relative p-4 border rounded-lg bg-gray-50 mb-4">
                  <button
                     type="button"
                     onClick={() => removeInputGroup(index)}
                     className="absolute top-2 right-2 text-red-500"
                  >
                     ❌
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Section Title</label>
                        <input
                           type="text"
                           name="S_title"
                           value={section.S_title}
                           onChange={(e) => handleChangeSection(index, e)}
                           placeholder="Enter Section Title"
                           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                           required
                        />
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Section Content (Video or Image)</label>
                        <input
                           type="file"
                           name="S_content"
                           onChange={(e) => handleChangeSection(index, e)}
                           accept="video/*,image/*"
                           className="mt-1 block w-full text-gray-700 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                           required
                        />
                     </div>
                  </div>
                  <div className="mt-4">
                     <label className="block text-sm font-medium text-gray-700">Section Description</label>
                     <textarea
                        name="S_description"
                        value={section.S_description}
                        onChange={(e) => handleChangeSection(index, e)}
                        placeholder="Enter Section Description"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                     />
                  </div>
               </div>
            ))}
            <button
               type="button"
               onClick={addInputGroup}
               className="mt-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
            >
               ➕ Add Section
            </button>

            <button
               type="submit"
               className="mt-6 w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
            >
               Submit
            </button>
         </form>
      </div>
   );
};

export default AddCourse;
