import React, { useContext } from 'react';
import { UserContext } from '../../App';
import TeacherHome from '../teacher/TeacherHome.jsx';
import AdminHome from '../admin/AdminHome';
import StudentHome from '../users/StudentHome.jsx';

const UserHome = () => {
   const user = useContext(UserContext);
   let content;

   switch (user.userData.type) {
      case "Teacher":
         content = <TeacherHome />;
         break;
      case "Admin":
         content = <AdminHome />;
         break;
      case "Student":
         content = <StudentHome />;
         break;
      default:
         content = <p>User type not recognized</p>;
         break;
   }

   return (
      <div className="container mx-auto p-6">
         {content}
      </div>
   );
};

export default UserHome;
