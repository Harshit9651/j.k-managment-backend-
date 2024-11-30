const Employee = require("../models/employeeModel");
const Attendance = require("../models/attendanceModel");
const Salary = require("../models/seleryModel");
const { cloudinary, upload } = require("../middleware/multer");

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
  console.log("data sets allow");
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
      aadharNumber,
    } = req.body;
    console.log(
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
    );

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
    const data = await newEmployee.save();
    console.log(data);
    res
      .status(201)
      .json({ message: "Employee added successfully", data: newEmployee });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ message: "Failed to add employee" });
  }
};


exports.AllEmployee = async (req, res) => {
  const { name } = req.query;
  console.log("The name of department is:", name);

  try {
    const query = name ? { department: name } : {}; 
    const employees = await Employee.find(query);
    res.status(200).send(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.dailyAttendance = async (req, res) => {
  const { id, status, date } = req.body;
  console.log("employe id is:", id);
  if (!id || !status || !date) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  if (status === "other") {
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
      const data = await existingAttendance.save();
      console.log(data);
      return res.status(200).json({
        message: `Attendance for ${
          employee.name
        } updated to ${status} on ${formattedDate.toLocaleDateString()}`,
        data: existingAttendance,
      });
    } else {
      // Create new attendance entry if none exists for that day
      const newAttendance = new Attendance({
        employee: id,
        date: formattedDate,
        status: status,
      });

      const newdata = await newAttendance.save();
      console.log(newdata);
      return res.status(201).json({
        message: `Attendance for ${
          employee.name
        } on ${formattedDate.toLocaleDateString()} has been recorded.`,
        data: newAttendance,
      });
    }
  } catch (error) {
    console.error("Error saving attendance:", error);
    res.status(500).json({ message: "Failed to save attendance" });
  }
 };

const getTotalDaysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};

const calculateEmployeeSalary = (
  presentDays,
  halfDays,
  totalDaysInMonth,
  salaryPerMonth
) => {
  console.log("Total days in month:", totalDaysInMonth);
  console.log("Employee's monthly salary:", salaryPerMonth);
  const fullDaySalary = salaryPerMonth / totalDaysInMonth;
  console.log("Full day salary:", fullDaySalary);
  const halfDaySalary = fullDaySalary / 2;
  console.log("Half day salary:", halfDaySalary);
  
  const totalSalary = presentDays * fullDaySalary + halfDays * halfDaySalary;
  console.log("Total salary calculated:", totalSalary);
  return totalSalary;
};

exports.calculateSalary = async (req, res) => {
  try {
    const { month, year } = req.body;
    console.log(month, year);
    if (!month || !year) {
      return res.status(400).json({ message: "Month and Year are required." });
    }

    const totalDaysInMonth = getTotalDaysInMonth(month, year);

    const employees = await Employee.find();

    const salaryDetails = [];

    for (let employee of employees) {
      const startOfMonth = new Date(Date.UTC(year, month - 1, 1)); // UTC start of month
      const endOfMonth = new Date(Date.UTC(year, month, 0)); // UTC end of month
      endOfMonth.setUTCHours(23, 59, 59, 999); // End of day in UTC

      const attendance = await Attendance.find({
        employee: employee._id,
        date: {
          $gte: startOfMonth,
          $lt: endOfMonth,
        },
      });
      console.log("Employee ID:", employee._id);

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
      console.log("Present days:", presentDays);
      console.log("Half days:", halfDays);
      console.log("Absent days:", absentDays);

      const salary = calculateEmployeeSalary(
        presentDays,
        halfDays,
        totalDaysInMonth,
        employee.salary
      );

      salaryDetails.push({
        employeeId: employee._id,
        employeeName: employee.name,
        presentDays,
        halfDays,
        absentDays,
        salary,
        monthlySalary: employee.salary,
        occupation: employee.occupation,
      });
    }
    console.log(salaryDetails);
    return res.status(200).json(salaryDetails);
  } catch (error) {
    console.error("Error calculating salary:", error);
    return res.status(500).json({ message: "Error calculating salary" });
  }
};


exports.saveSalaryDetails = async (req, res) => {
  try {
    let {
      month,
      year,
      EmployeId,
      paymentStatus,
      creditedAmount,
      remainingAmount,
      totalPresentDays,
      totalHalfDays,
      calculatedSalary,
    } = req.body;

    if (!month || !year || !EmployeId) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const employee = await Employee.findById(EmployeId);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found." });
    }

    let salaryRecord = await Salary.findOne({
      employee_id: EmployeId,
      month,
      year,
    });

    if (salaryRecord) {
      if (paymentStatus === "Unpaid") {
        creditedAmount = 0; // Set creditedAmount to 0 if payment status is "Unpaid"
      }

      salaryRecord.paymentStatus = paymentStatus || salaryRecord.paymentStatus;
      salaryRecord.creditedAmount =
        creditedAmount || salaryRecord.creditedAmount;
      salaryRecord.remainingAmount =
        remainingAmount || salaryRecord.remainingAmount;
      salaryRecord.totalPresentDays =
        totalPresentDays || salaryRecord.totalPresentDays;
      salaryRecord.totalHalfDays = totalHalfDays || salaryRecord.totalHalfDays;
      salaryRecord.calculatedSalary =
        calculatedSalary || salaryRecord.calculatedSalary;

      const updatedSelery = await salaryRecord.save();
      console.log(updatedSelery);
    } else {
      if (paymentStatus === "Unpaid") {
        creditedAmount = 0; // Set creditedAmount to 0 if payment status is "Unpaid"
      }

      salaryRecord = new Salary({
        employee_id: EmployeId,
        month,
        year,
        totalWorkingDays: 30,
        totalPresentDays,
        totalHalfDays,
        calculatedSalary,
        paymentStatus: paymentStatus || "Unpaid",
        creditedAmount: creditedAmount || 0,
        remainingAmount: remainingAmount || calculatedSalary,
      });

      const newSelerydata = await salaryRecord.save();
      console.log(newSelerydata);
    }

    return res
      .status(201)
      .json({
        message: "Salary details saved successfully.",
        data: salaryRecord,
      });
  } catch (error) {
    console.error("Error saving salary details:", error);
    return res.status(500).json({ error: "Failed to save salary details." });
  }
};

// abhi thodi der bad karnge

exports.SeleryRecord = async (req, res) => {
  const selery = await Salary.find({});
  console.log(selery);
  res.send(selery);
};

exports.RenderEmploye = async (req, res) => {
  const { department } = req.query;
  console.log(department);

  if (!department) {
    return res.status(400).json({ error: "Department is required" });
  }

  try {
    // const allEmploye = await Employee.find({});
    // console.log(allEmploye)

    const employees = await Employee.find({ department });
    console.log(employees);
    res.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ error: "Failed to fetch employees" });
  }
};

exports.EmployeSeleryData = async (req, res) => {
  console.log("hello");
  const { employeId } = req.query;
  const EmployeSeleryData = await Salary.find({ employee_id: employeId });
  res.send(EmployeSeleryData);
  console.log("hy the employe selery data is :", EmployeSeleryData);
};
