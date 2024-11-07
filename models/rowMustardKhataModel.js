const mongoose = require("mongoose");

const RawMustardKhataSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    orderDate: { type: Date, default: Date.now, required: true },
    name: { type: String, default: "Raw Mustard", required: true },
    weight: { type: String, required: true },
    quantity: { type: Number, required: true },
    pricePerUnit: { type: Number, required: true },
    ttlprice: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Unpaid"],
      required: true,
    },
  },
  { timestamps: true }
);

const RawMustardKhata = mongoose.model("rawMustardKhataBook", RawMustardKhataSchema);

module.exports = RawMustardKhata;


