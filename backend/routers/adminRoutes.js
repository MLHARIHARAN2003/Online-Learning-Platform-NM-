const express = require("express");
const { adminLoginController, getAllUsersController, getAllCoursesController, deleteCourseController, deleteUserController } = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/login", adminLoginController);
router.use(authMiddleware);
router.get("/getallusers", getAllUsersController);
router.get("/getallcourses", getAllCoursesController);
router.delete("/deletecourse/:courseid", deleteCourseController);
router.delete("/deleteuser/:cuserid", deleteUserController);

module.exports = router;

