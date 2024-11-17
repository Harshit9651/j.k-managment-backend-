const Employee = require("../models/employeeModel");
const Attendance = require("../models/attendanceModel")
const { cloudinary, upload } = require('../middleware/multer');


// const uploadToCloudinary = async (filePath) => {
//   try {
//       if (filePath) {
//           console.log("Uploading file from path:", filePath);
//           const result = await cloudinary.uploader.upload(filePath);
//           return result.secure_url;
//       } else {
//           console.warn("No file path provided, returning default image.");
//           return "/images/img.jpeg";
//       }
//   } catch (error) {
//       console.error("Cloudinary upload error:", error.message);
//       throw error;
//   }
// };

  exports.addEmployee = async (req, res) => {
    console.log('data sets allow')
    console.log(req.body); 

    try {
      const {
        name,
        employeeContactNumber,
        familyMemberNumber,
        accountNumber,
        gender,
        occupation,
        department,
        salary,
        joiningDate,
        fullAddress,
        panNumber,
        aadharNumber
         } = req.body;
  console.log(   name,
    employeeContactNumber,
    familyMemberNumber,
    accountNumber,
    gender,
    occupation,
    department,
    salary,
    joiningDate,
    fullAddress,
    panNumber,
    aadharNumber,)


      // Create a new employee object
      const newEmployee = new Employee({
        name,
        employeeContactNumber,
        familyMemberNumber,
        accountNumber,
        gender,
        occupation,
        department,
        salary,
        joiningDate,
        fullAddress,
        panNumber,
        aadharNumber,
 
      });
  
      // Save the employee in the database
    const data =  await newEmployee.save();
  console.log(data)
      res.status(201).json({ message: 'Employee added successfully', data: newEmployee });
    } catch (error) {
      console.error('Error adding employee:', error);
      res.status(500).json({ message: 'Failed to add employee' });
    }
  };

  exports.AllEmployee = async(req,res)=>{
    const AllEmployeData = await Employee.find({});
    res.send(AllEmployeData)
  }
  exports.dailyAttendance = async (req, res) => {
    const { id, status, date } = req.body;
    if (!id || !status || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if(status === 'other'){
      return res.status(400).json({ message: "Missing required fields" });
   
    }

    try {
      const employee = await Employee.findById(id);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      const formattedDate = new Date(date);
      const existingAttendance = await Attendance.findOne({
        employee: id,
        date: formattedDate,
      });

      if (existingAttendance) {
        // Update the existing attendance record
        existingAttendance.status = status;
       const data =  await existingAttendance.save();
       console.log(data)
        return res.status(200).json({
          message: `Attendance for ${employee.name} updated to ${status} on ${formattedDate.toLocaleDateString()}`,
          data: existingAttendance,
        });
      } else {
        // Create new attendance entry if none exists for that day
        const newAttendance = new Attendance({
          employee: id,
          date: formattedDate,
          status: status,
        });

      const newdata =   await newAttendance.save();
      console.log(newdata)
        return res.status(201).json({
          message: `Attendance for ${employee.name} on ${formattedDate.toLocaleDateString()} has been recorded.`,
          data: newAttendance,
        });
      }
    } catch (error) {
      console.error("Error saving attendance:", error);
      res.status(500).json({ message: "Failed to save attendance" });
    }
  };






// Helper function to get the number of working days in a month
const getWorkingDaysInMonth = (month, year) => {
  let workingDays = 0;
  // November has 30 days, but this can be adjusted for any month
  for (let day = 1; day <= 30; day++) {
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      workingDays++;
    }
  }
  return workingDays;
};

// Calculate salary for each employee based on their attendance in November 2024
const calculateSalary = async () => {
  const month = 11; // November
  const year = 2024;
  const salaryPerMonth = 30000;
  const workingDaysInMonth = getWorkingDaysInMonth(month, year); // Assuming weekdays are working days

  // Get all employees
  const employees = await Employee.find();

  const salaryDetails = [];

  for (let employee of employees) {
    // Fetch attendance for the employee in November 2024
    const attendance = await Attendance.find({
      employee: employee._id,
      date: {
        $gte: new Date(year, month - 1, 1), // Start date: November 1st
        $lt: new Date(year, month, 1), // End date: December 1st
      },
    });

    // Calculate present days and half-days
    let presentDays = 0;
    let halfDays = 0;
    let absentDays = 0;

    attendance.forEach((entry) => {
      if (entry.status === "Full Day") {
        presentDays++;
      } else if (entry.status === "Half Leave") {
        halfDays++;
      } else if (entry.status === "Absent") {
        absentDays++;
      }
    });

    // Calculate the salary for the employee
    const salary = calculateEmployeeSalary(presentDays, halfDays, workingDaysInMonth, salaryPerMonth);

    salaryDetails.push({
      employeeName: employee.name,
      presentDays,
      halfDays,
      absentDays,
      salary,
    });
  }

  return salaryDetails;
};

// Helper function to calculate employee salary based on their attendance
const calculateEmployeeSalary = (presentDays, halfDays, workingDays, salaryPerMonth) => {
  const fullDaySalary = salaryPerMonth / workingDays; // Daily salary for full days
  const halfDaySalary = fullDaySalary / 2; // Salary for half days

  const totalSalary = (presentDays * fullDaySalary) + (halfDays * halfDaySalary);

  return totalSalary;
};

// Example usage
calculateSalary().then((salaryDetails) => {
  console.log(salaryDetails);
});





















//   const Attendance = require("./attendanceModel");
// const Employee = require("./employeeModel");
// const Salary = require("./salaryModel");

// const calculateMonthlySalary = async (employeeId, month, year) => {
//     try {
//         // 1. कर्मचारी की मासिक उपस्थिति डेटा निकालें
//         const startDate = new Date(year, month - 1, 1);
//         const endDate = new Date(year, month, 0);

//         const attendanceRecords = await Attendance.find({
//             employee: employeeId,
//             date: { $gte: startDate, $lte: endDate },
//         });

//         const employee = await Employee.findById(employeeId);

//         if (!employee) {
//             throw new Error("Employee not found");
//         }

//         const totalWorkingDays = endDate.getDate(); // पूरे महीने के कुल दिन
//         const fullDays = attendanceRecords.filter(
//             (record) => record.status === "Full Day"
//         ).length;
//         const halfDays = attendanceRecords.filter(
//             (record) => record.status === "Half Day"
//         ).length;

//         // 2. सैलरी की गणना करें
//         const dailySalary = employee.salary / totalWorkingDays;
//         const calculatedSalary =
//             dailySalary * fullDays + dailySalary * 0.5 * halfDays;

//         // 3. सैलरी डेटा को स्टोर करें
//         const salaryRecord = await Salary.create({
//             employee: employeeId,
//             month: `${startDate.toLocaleString("default", { month: "long" })}-${year}`,
//             totalWorkingDays,
//             totalPresentDays: fullDays,
//             totalHalfDays: halfDays,
//             calculatedSalary,
//         });

//         return salaryRecord;
//     } catch (error) {
//         console.error(error.message);
//         throw new Error("Salary calculation failed");
//     }
// };



// const express = require("express");
// const router = express.Router();

// router.post("/calculate-salary/:employeeId", async (req, res) => {
//     const { employeeId } = req.params;
//     const { month, year } = req.body;

//     try {
//         const salaryRecord = await calculateMonthlySalary(employeeId, month, year);
//         res.status(200).json({
//             success: true,
//             message: "Salary calculated successfully",
//             data: salaryRecord,
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// module.exports = router;
