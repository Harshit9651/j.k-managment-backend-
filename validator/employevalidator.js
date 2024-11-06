const { body } = require('express-validator');

const validateNewEmployee = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 3, max: 50 }).withMessage('Name must be between 3 and 50 characters.'),
    
    body('panNumber')
        .notEmpty().withMessage('PAN number is required')
        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/).withMessage('Invalid PAN number format.'),
    
    body('panImage')
        .notEmpty().withMessage('PAN image is required')
        .isURL().withMessage('PAN image must be a valid URL string.'),
    
    body('aadharNumber')
        .notEmpty().withMessage('Aadhar number is required')
        .matches(/^\d{12}$/).withMessage('Invalid Aadhar number. It must be a 12-digit number.'),
    
    body('aadharImage')
        .notEmpty().withMessage('Aadhar image is required')
        .isURL().withMessage('Aadhar image must be a valid URL string.'),
    
    body('accountNumber')
        .notEmpty().withMessage('Account number is required')
        .matches(/^\d{9,18}$/).withMessage('Invalid account number. It must be between 9 and 18 digits.'),
    
    body('fullAddress')
        .notEmpty().withMessage('Full address is required')
        .isLength({ min: 10, max: 250 }).withMessage('Invalid address. It should be between 10 and 250 characters.'),
    
    body('familyDetails.contactNumbers')
        .isArray({ min: 2 }).withMessage('At least two family contact numbers are required.')
        .custom(value => {
            if (!value.every(contact => /^\d{10}$/.test(contact))) {
                throw new Error('Each family contact number must be a valid 10-digit number.');
            }
            return true;
        }),
    
    body('employeeContactNumber')
        .notEmpty().withMessage('Employee contact number is required')
        .matches(/^\d{10}$/).withMessage('Invalid employee contact number. It must be a 10-digit number.'),
    
    body('department')
        .notEmpty().withMessage('Department name is required')
        .isLength({ min: 3, max: 50 }).withMessage('Invalid department name. It must be between 3 and 50 characters.'),
    
    body('occupation')
        .notEmpty().withMessage('Occupation is required')
        .isLength({ min: 3, max: 50 }).withMessage('Invalid occupation. It must be between 3 and 50 characters.'),
    
    body('salary')
        .notEmpty().withMessage('Salary is required')
        .isFloat({ gt: 0 }).withMessage('Invalid salary. Salary must be a positive number.'),
    
    body('joiningDate')
        .notEmpty().withMessage('Joining date is required')
        .custom(value => {
            const today = new Date();
            if (new Date(value) > today) {
                throw new Error('Invalid joining date. It cannot be in the future.');
            }
            return true;
        }),
    
    body('gender')
        .notEmpty().withMessage('Gender is required')
        .isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender. Gender must be Male, Female, or Other.')
];

module.exports = validateNewEmployee;
