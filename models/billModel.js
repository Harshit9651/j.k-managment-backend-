const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const billSchema = new mongoose.Schema({
    buyerName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
    },
    product: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
        min: 0,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    totalRate: {
        type: Number,
        required: true,
        min: 0,
    },
    discount: {
        type: Number,
        required: true,
        min: 0,
    },
    billDate: {
        type: Date,
        default: Date.now,
    },
    billNumber: {
        type: Number,
        required: true,
        unique: true,
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




billSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;
