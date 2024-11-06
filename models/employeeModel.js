const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Employee name is required'],
        trim: true,
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    panNumber: {
        type: String,
        required: [true, 'PAN number is required'],
        unique: true,
        match: [/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number format']
    },
    panImage: {
        type: String,
        required: [true, 'PAN card image is required'],
        validate: {
            validator: (value) => typeof value === 'string',
            message: 'PAN card image must be a valid string URL'
        }
    },
    aadharNumber: {
        type: String,
        required: [true, 'Aadhar number is required'],
        unique: true,
        match: [/^\d{12}$/, 'Aadhar number must be a 12-digit number']
    },
    aadharImage: {
        type: String,
        required: [true, 'Aadhar card image is required'],
        validate: {
            validator: (value) => typeof value === 'string',
            message: 'Aadhar card image must be a valid string URL'
        }
    },
    accountNumber: {
        type: String,
        required: [true, 'Account number is required'],
        match: [/^\d{9,18}$/, 'Account number must be between 9 and 18 digits']
    },
    fullAddress: {
        type: String,
        required: [true, 'Full address is required'],
        minlength: [10, 'Address should have at least 10 characters'],
        maxlength: [250, 'Address cannot exceed 250 characters']
    },
    familyDetails: {
        contactNumbers: {
            type: [String],
            validate: {
                validator: (value) => value.length >= 2,
                message: 'At least two family contact numbers are required'
            },
            match: [/^\d{10}$/, 'Each contact number must be a valid 10-digit number']
        }
    },
    employeeContactNumber: {
        type: String,
        required: [true, 'Employee contact number is required'],
        match: [/^\d{10}$/, 'Employee contact number must be a valid 10-digit number']
    },
    department: {
        type: String,
        required: [true, 'Department is required'],
        trim: true,
        minlength: [3, 'Department name must be at least 3 characters long'],
        maxlength: [50, 'Department name cannot exceed 50 characters']
    },
    occupation: {
        type: String,
        required: [true, 'Occupation is required'],
        trim: true,
        minlength: [3, 'Occupation must be at least 3 characters long'],
        maxlength: [50, 'Occupation cannot exceed 50 characters']
    },
    salary: {
        type: Number,
        required: [true, 'Salary is required'],
        min: [0, 'Salary must be a positive number']
    },
    joiningDate: {
        type: Date,
        required: [true, 'Joining date is required'],
        validate: {
            validator: (date) => date <= new Date(),
            message: 'Joining date cannot be in the future'
        }
    },
    gender: {
        type: String,
        required: [true, 'Gender is required'],
        enum: ['Male', 'Female', 'Other']
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Employee', employeeSchema);
