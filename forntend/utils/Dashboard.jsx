import React, { useContext, useState } from 'react';
import NavBar from './NavBar';
import UserHome from "./UserHome.jsx"
import AddCourse from '../teacher/AddCourse.jsx';
import UserContext  from '../../App.jsx';
import EnrolledCourses from '../users/EnrolledCourses.jsx';
import CourseContent from '../users/CourseContent.jsx';
import AllCourses from '../admin/AllCourses.jsx';

//import StudentHome from '../user/student/StudentHome';
//import AdminHome from '../admin/AdminHome';

const Dashboard = () => {
   const user = useContext(UserContext)
   const [selectedComponent, setSelectedComponent] = useState('home');

   const renderSelectedComponent = () => {
      switch (selectedComponent) {
         case 'home':
            return <UserHome />
         case 'addcourse':
            return <AddCourse />
         case 'enrolledcourese':
            return <EnrolledCourses />
         case 'cousreSection':
            return <CourseContent />
         case 'cousres':
            return <AllCourses />
         default:
            return <UserHome />

      }
   };
   return (
      <>
         <NavBar className='bg-gray-800 text-white' setSelectedComponent={setSelectedComponent} />
         <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
            {renderSelectedComponent()}
         </div>
      </>
   );
};

export default Dashboard;
