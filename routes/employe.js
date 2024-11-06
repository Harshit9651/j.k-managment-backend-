const express = require('express');
const router = express.Router();
const validateNewEmployee = require('../validator/employevalidator');
const EmployeeController = require('../controllers/employecontroller')

router.post('/AddEmployee',validateNewEmployee,EmployeeController.addEmployee);
module.exports = router

