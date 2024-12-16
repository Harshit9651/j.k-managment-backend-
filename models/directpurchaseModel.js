const mongoose = require("mongoose");

const directPurchaseSchema = new mongoose.Schema({
  dealerName: {
    type: String,
    required: true,
  },
  itemType: {
    type: String,
    required: true,
    enum: ["Cotton", "Mustard Oil",  "Other"],
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  weight: {
    type: Number,
    required: true,
    min: 0,
  },
  add: {
    type: Number,
    default: 0,
  },
  less: {
    type: Number,
    default: 0,
  },
  pricePerUnit: {
    type: Number,
    required: true,
    min: 0,
  },
  ttlprice: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  amountPaid: {
    type: Number,
    default: 0,
    min: 0,
  },
  DAmount: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  billNumber: {
    type: String,
    required: true,
    unique: true,
  },
  pststus:{
    type: String,
    enum: ["Paid", "Unpaid", "Partially Paid"],
    default: "Unpaid",
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
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

// Pre-save middleware to calculate total amount, due amount, and set payment status
directPurchaseSchema.pre("save", function (next) {
  this.updatedAt = Date.now();

  // Calculate net quantity after adjustments
  const netQuantity = this.quantity + this.add - this.less;
  this.totalAmount = this.pricePerUnit * netQuantity;

  // Calculate due amount
  this.dueAmount = this.totalAmount - this.amountPaid;

  // Set payment status
  if (this.amountPaid >= this.totalAmount) {
    this.paymentStatus = "Paid";
  } else if (this.amountPaid > 0 && this.amountPaid < this.totalAmount) {
    this.paymentStatus = "Partially Paid";
  } else {
    this.paymentStatus = "Unpaid";
  }

  next();
});

const DirectPurchase = mongoose.model("DirectPurchase", directPurchaseSchema);

module.exports = DirectPurchase;
