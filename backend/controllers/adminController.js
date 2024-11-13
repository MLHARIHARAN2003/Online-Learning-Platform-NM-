const userSchema = require("../schemas/userModel");
const courseSchema = require("../schemas/courseModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminLoginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await userSchema.findOne({ email, type: "Admin" },);
    if (!admin) {
      return res.status(401).send({ message: "Invalid email" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_KEY, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login success", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send({ message: "Server error" });
  }
};
const getAllUsersController = async (req, res) => {
  try {
    const allUsers = await userSchema.find();
    if (!allUsers || allUsers.length === 0) {
      return res.status(404).send({ message: "No users found" });
    }
    res.status(200).send({ success: true, data: allUsers });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ success: false, message: "Server error" });
  }
};

const getAllCoursesController = async (req, res) => {
  try {
    const allCourses = await courseSchema.find();
    if (!allCourses || allCourses.length === 0) {
      return res.status(404).send({ message: "No courses found" });
    }
    res.status(200).send({ success: true, data: allCourses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).send({ success: false, message: "Server error" });
  }
};

const deleteCourseController = async (req, res) => {
  try {
    const course = await courseSchema.findByIdAndDelete(req.params.courseid);
    if (course) {
      res.status(200).send({ success: true, message: "Course deleted successfully" });
    } else {
      res.status(404).send({ success: false, message: "Course not found" });
    }
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).send({ success: false, message: "Server error" });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const user = await userSchema.findByIdAndDelete(req.params.userid);
    if (user) {
      res.status(200).send({ success: true, message: "User deleted successfully" });
    } else {
      res.status(404).send({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send({ success: false, message: "Server error" });
  }
};

module.exports = {
  adminLoginController,
  getAllUsersController,
  getAllCoursesController,
  deleteCourseController,
  deleteUserController,
};


