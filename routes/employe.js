const express = require("express");
const router = express.Router();
const validateNewEmployee = require("../validator/employevalidator");
const EmployeeController = require("../controllers/employecontroller");
const { upload } = require("../middleware/multer");

router.post("/AddEmployee",upload.none(),EmployeeController.addEmployee);
router.post("/updateAttendance",EmployeeController.dailyAttendance)
router.get("/AllEmploye",EmployeeController.AllEmployee)
module.exports = router;
