const mongoose = require("mongoose");

const RawCottonKhataSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    orderDate: { type: Date, default: Date.now, required: true },
    name: { type: String, default: "Raw Cotton", required: true },
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

const RawCottonKhata = mongoose.model("rawCottonKhataBook", RawCottonKhataSchema);

module.exports = RawCottonKhata;
