const mongoose = require("mongoose");

const RawCottonKhataSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    orderDate: { type: Date, default: Date.now, required: true },
    products: [
      {
        name: { type: String, required: true },
        weight: { type: String, required: true },
        quantity: { type: Number, required: true },
        pricePerUnit: { type: Number, required: true },
        ttlprice: { type: Number, required: true },
        billNumber: {
          type: String,
          required: true,
          unique: true,
        },
        paymentStatus: {
          type: String,
          enum: ["Paid", "Unpaid", "Partially Paid"],
          required: true,
          default: "Paid",
        },
        creditPaid: { type: Number, default: 0 }, 
        remainingAmount: { type: Number, default: 0 },
        orderDate: { type: Date, default: Date.now, required: true },
      },
    ],
  },
  { timestamps: true }
);

const RawCottonKhata = mongoose.model(
  "rawCottonKhataBook",
  RawCottonKhataSchema
);

module.exports = RawCottonKhata;
