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



  // const getWorkingDaysInMonth = (month, year) => {
  //   let workingDays = 0;
  //   const daysInMonth = new Date(year, month, 0).getDate();
    
  //   for (let day = 1; day <= daysInMonth; day++) {
  //     const date = new Date(year, month - 1, day);
  //     const dayOfWeek = date.getDay();
  //     if (dayOfWeek !== 0 && dayOfWeek !== 6) {
  //       workingDays++;
  //     }
  //   }
  //   return workingDays;
  // };
  
  // const calculateEmployeeSalary = (presentDays, halfDays, totalWorkingDays, salaryPerMonth) => {
  //   const fullDaySalary = salaryPerMonth / totalWorkingDays;
  //   const halfDaySalary = fullDaySalary / 2;
  //   const totalSalary = (presentDays * fullDaySalary) + (halfDays * halfDaySalary);
  //   return totalSalary;
  // };
  
  // const calculateSalary = async () => {
  //   const month = 11;
  //   const year = 2024;
  
  //   const employees = await Employee.find();
  //   const workingDaysInMonth = getWorkingDaysInMonth(month - 1, year);
    
  //   const salaryDetails = [];
  
  //   for (let employee of employees) {
  //     const attendance = await Attendance.find({
  //       employee: employee._id,
  //       date: {
  //         $gte: new Date(year, month - 1, 1),
  //         $lt: new Date(year, month, 1),
  //       },
  //     });
  
  //     let presentDays = 0;
  //     let halfDays = 0;
  //     let absentDays = 0;
  
  //     attendance.forEach((entry) => {
  //       if (entry.status === "Full Day") {
  //         presentDays++;
  //       } else if (entry.status === "Half Leave") {
  //         halfDays++;
  //       } else if (entry.status === "Absent") {
  //         absentDays++;
  //       }
  //     });
  
  //     const salary = calculateEmployeeSalary(presentDays, halfDays, workingDaysInMonth, employee.salary);
  
  //     salaryDetails.push({
  //       employeeName: employee.name,
  //       presentDays,
  //       halfDays,
  //       absentDays,
  //       salary,
  //     });
  //   }
  
  //   return salaryDetails;
  // };
  
  // calculateSalary().then((salaryDetails) => {
  //   console.log("bhn ki chut teri ma ki chut ", salaryDetails);
  // });
  

  const getWorkingDaysInMonth = (month, year) => {
    let workingDays = 0;
    const daysInMonth = new Date(year, month, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month - 1, day);
      const dayOfWeek = date.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        workingDays++;
      }
    }
    return workingDays;
  };
  
  const calculateEmployeeSalary = (presentDays, halfDays, totalWorkingDays, salaryPerMonth) => {
    const fullDaySalary = salaryPerMonth / totalWorkingDays;
    const halfDaySalary = fullDaySalary / 2;
    const totalSalary = (presentDays * fullDaySalary) + (halfDays * halfDaySalary);
    return totalSalary;
  };
  
  exports.calculateSalary = async(req,res) => {
    try {
      const { month, year } = req.body;
  console.log(month,year)
      if (!month || !year) {
        return res.status(400).json({ message: 'Month and Year are required.' });
      }
  
      const workingDaysInMonth = getWorkingDaysInMonth(month, year);
      
      const employees = await Employee.find();
  
      const salaryDetails = [];
  
      for (let employee of employees) {
        const attendance = await Attendance.find({
          employee: employee._id,
          date: {
            $gte: new Date(year, month - 1, 1),
            $lt: new Date(year, month, 1),
          },
        });
  
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
  
        const salary = calculateEmployeeSalary(presentDays, halfDays, workingDaysInMonth, employee.salary);
  
        salaryDetails.push({
          employeeId: employee._id,
          employeeName: employee.name,
          presentDays,
          halfDays,
          absentDays,
          salary,
          monthlySalary: employee.salary,
          occupation:employee.occupation
        });
      }
  console.log(salaryDetails)
      return res.status(200).json(salaryDetails);
    } catch (error) {
      console.error("Error calculating salary:", error);
      return res.status(500).json({ message: "Error calculating salary" });
    }
  };
  

  
exports.selerydata =  async (req,res)=>{
console.log(req.body)
res.status(200).send("ok")
}


  

