const mongoose = require("mongoose");

const MustardOilKhataSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    orderDate: { type: Date, default: Date.now, required: true },
    name: { type: String, default: "Mustard Oil", required: true },
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

const MustardOilKhata = mongoose.model("mustardOilKhataBook", MustardOilKhataSchema);

module.exports = MustardOilKhata;
