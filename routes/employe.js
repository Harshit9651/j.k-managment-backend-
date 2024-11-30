const express = require("express");
const router = express.Router();
const validateNewEmployee = require("../validator/employevalidator");
const EmployeeController = require("../controllers/employecontroller");
const { upload } = require("../middleware/multer");


router.get("/AllEmploye",EmployeeController.AllEmployee)
router.get("/seleryData",EmployeeController.SeleryRecord);
router.get("/RenderEmploye",EmployeeController.RenderEmploye)
router.get("/EmployeseleryData",EmployeeController.EmployeSeleryData)


router.post("/AddEmployee",upload.none(),EmployeeController.addEmployee);
router.post("/updateAttendance",EmployeeController.dailyAttendance)
router.post("/EmployeSeleries",EmployeeController.calculateSalary)
router.post("/selery",EmployeeController.saveSalaryDetails)

module.exports = router;
