const Employee = require('../models/employeeModel')

    exports.addEmployee = async (req, res) => {
        try {
            
            const {
                name,
                panNumber,
                panImage,
                aadharNumber,
                aadharImage,
                accountNumber,
                fullAddress,
                familyDetails,
                employeeContactNumber,
                department,
                occupation,
                salary,
                joiningDate,
                gender
            } = req.body;
    
          
            const employeeData = {
                name,
                panNumber,
                panImage,
                aadharNumber,
                aadharImage,
                accountNumber,
                fullAddress,
                familyDetails,
                employeeContactNumber,
                department,
                occupation,
                salary,
                joiningDate,
                gender
            };
    
            // Create new employee and save to database
            const newEmployee = new Employee(employeeData);
            await newEmployee.save();
    
            res.status(201).json({
                message: 'Employee added successfully',
                employee: newEmployee
            });
    
        } catch (error) {
            res.status(400).json({ message: 'Error adding employee', error: error.message });
        }
    };
