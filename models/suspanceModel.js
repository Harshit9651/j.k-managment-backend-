const mongoose = require('mongoose');

const machineExpenseSchema = new mongoose.Schema({
    // adminId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'User',
    // },
    expenseType: {
        type: String,
        required: true,
        enum: [
            'Repair',
            'Maintenance',
            'Replacement',
            'Utility',
            'Other'
        ],
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    expenseDate: {
        type: Date,
        default: Date.now,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

machineExpenseSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const MachineExpense = mongoose.model('MachineExpense', machineExpenseSchema);

module.exports = MachineExpense;
