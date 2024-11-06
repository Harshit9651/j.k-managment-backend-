const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  DelarName: {
    type: String,
    required: true,
  },
  itemType: {
    type: String,
    required: true,
    enum: ["Cotton", "Mustard Oil", "Other"],
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
  add: {
    type: Number,
    default: 0,
  },
  less: {
    type: Number,
    default: 0,
  },
  Dhami: {
    type: Number,
    default: 2.5,
  },
  pal: {
    type: Number,
    default: 4,
  },
  pricePerUnit: {
    type: Number,
    required: true,
    min: 0,
  },

  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  dueamount: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  ttlprice: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  receiptNumber: {
    type: String,
    required: true,
    unique: true, // Ensure each receipt number is unique
  },
  paymentStatus: {
    type: String,
    enum: ["Paid", "Unpaid", "Partially Paid"],
    default: "Unpaid",
  },
  amountPaid: {
    type: Number,
    default: 0,
    min: 0, // Amount paid should be non-negative
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

// Middleware to calculate totalPrice, amountDue, and set paymentStatus based on amountPaid
purchaseSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  const netQuantity = this.quantity + this.add - this.less;
  this.totalPrice = this.pricePerUnit * netQuantity;

  // Calculate the amount due based on the total price and amount paid
  this.amountDue = this.totalPrice - this.amountPaid;

  // Set the payment status
  if (this.amountPaid >= this.totalPrice) {
    this.paymentStatus = "Paid";
  } else if (this.amountPaid > 0 && this.amountPaid < this.totalPrice) {
    this.paymentStatus = "Partially Paid";
  } else {
    this.paymentStatus = "Unpaid";
  }

  next();
});

const Purchase = mongoose.model("Purchase", purchaseSchema);

module.exports = Purchase;
