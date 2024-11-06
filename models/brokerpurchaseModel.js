const mongoose = require("mongoose");

const brokerPurchaseSchema = new mongoose.Schema({
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
  brokerName: {
    type: String,
    required: true,
    ref: "Broker",
  },
  brokerCommission: {
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
  paymentStatus: {
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

brokerPurchaseSchema.pre("save", function (next) {
  this.updatedAt = Date.now();

  // Calculate net quantity after adjustments
  const netQuantity = this.quantity + this.add - this.less;
  this.totalPrice = this.pricePerUnit * netQuantity;

  // Calculate broker commission based on the percentage
  this.commissionAmount = (this.brokerCommission / 100) * this.totalPrice;

  // Calculate the due amount
  this.dueAmount = this.totalPrice - this.amountPaid;

  // Set payment status
  if (this.amountPaid >= this.totalPrice) {
    this.paymentStatus = "Paid";
  } else if (this.amountPaid > 0 && this.amountPaid < this.totalPrice) {
    this.paymentStatus = "Partially Paid";
  } else {
    this.paymentStatus = "Unpaid";
  }

  next();
});

const BrokerPurchase = mongoose.model("BrokerPurchase", brokerPurchaseSchema);

module.exports = BrokerPurchase;
