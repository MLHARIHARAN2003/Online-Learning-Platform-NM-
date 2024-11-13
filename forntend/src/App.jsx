import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
//components
import Home from "./pages/Home.jsx";
import Register from "./pages/Register";
import Dashboard from "./components/utils/Dashboard";
import CourseContent from "./components/users/CourseContent.jsx";
import Login from "./pages/Login";
import AdminHome from "./components/admin/AdminHome";
import AllCourses from "./components/admin/AllCourses";
import AdminLogin from "./components/admin/AdminLogin";
import EnrolledCourses from "./components/users/EnrolledCourses.jsx";

export const UserContext = createContext();

function App() {
  const date = new Date().getFullYear();
  const [userData, setUserData] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  // Fetch user data from localStorage
  const getData = async () => {
    try {
      const user = await JSON.parse(localStorage.getItem("user"));
      if (user) {
        setUserData(user);
        setUserLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, userLoggedIn }}>
      <div className="App">
        <Router>
          <div className="content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/admin/allcourses" element={<AllCourses />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminHome />} />

              {/* Private Routes - only accessible when user is logged in */}
              {userLoggedIn ? (
                <>
                  <Route path="/enrolled" element={<EnrolledCourses />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/courseSection/:courseId/:courseTitle" element={<CourseContent />} />
                </>
              ) : (
                // Only show login if not logged in
                <Route path="*" element={<Login />} />  // This will redirect any invalid route to login
              )}
            </Routes>
          </div>
        </Router>

        {/* Footer */}
        <footer className="bg-light text-center text-lg-start fixed bottom-0 w-full">
          <div className="text-center p-3">
            © {date} Copyright: Scholarly Odyssey
          </div>
        </footer>
      </div>
    </UserContext.Provider>
  );
}

export default App;
