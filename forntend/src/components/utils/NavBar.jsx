import React, { useContext } from 'react';
import { UserContext } from '../../App';
import { NavLink } from 'react-router-dom';

const NavBar = ({ setSelectedComponent }) => {
   const user = useContext(UserContext);

   if (!user) {
      return null;
   }

   const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
   };

   const handleOptionClick = (component) => {
      setSelectedComponent(component);
   };

   return (
      <nav className="bg-gray-800 text-white px-4 py-3">
         <div className="container mx-auto flex items-center justify-between">
            {/* Brand */}
            <div className="flex items-center">
               <h3 className="text-xl font-bold">Scholarly Odyssey</h3>
            </div>

            {/* Links */}
            <div className="flex items-center space-x-4">
               <NavLink
                  to="/"
                  onClick={() => handleOptionClick('home')}
                  className="hover:underline"
               >
                  Home
               </NavLink>

               {user.userData.type === 'Teacher' && (
                  <>
                  <NavLink
                  to="/dashboard"
                  onClick={() => handleOptionClick('dashboard')}
                  className="hover:underline"
               >
                  Dashboard
               </NavLink>
                  <NavLink
                     to="#"
                     onClick={() => handleOptionClick('addcourse')}
                     className="hover:underline"
                  >
                     Add Course
                  </NavLink></>
               )}

               {user.userData.type === 'Admin' && (
                  <NavLink
                     to="#"
                     onClick={() => handleOptionClick('courses')}
                     className="hover:underline"
                  >
                     Courses
                  </NavLink>
               )}

               {user.userData.type === 'Student' && (
                  <>
                    <NavLink
                  to="/dashboard"
                  onClick={() => handleOptionClick('dashboard')}
                  className="hover:underline"
               >
                  Dashboard
               </NavLink>
                  <NavLink
                     to="/enrolled"
                     onClick={() => handleOptionClick('enrolledcourses')}
                     className="hover:underline"
                  >
                     Enrolled Courses
                  </NavLink></>
               )}
            </div>

            {/* User Info and Logout Button */}
            <div className="flex items-center space-x-4">
               <span className="text-sm">Hi, {user.userData.name}</span>
               <button
                  onClick={handleLogout}
                  className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-150"
               >
                  Log Out
               </button>
            </div>
         </div>
      </nav>
   );
};

export default NavBar;
