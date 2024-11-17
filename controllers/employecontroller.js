const Employee = require("../models/employeeModel");
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