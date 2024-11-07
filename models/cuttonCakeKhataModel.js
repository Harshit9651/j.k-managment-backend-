const mongoose = require("mongoose");

const CuttonCakekhataSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    orderDate: { type: Date, default: Date.now, required: true },
    name: { type: String, default: "CuttonCake", required: true },
    weight: { type: String, required: true },
    quantity: { type: Number, required: true },
    pricePerUnit: { type: Number, required: true },
    ttlprice: {
      type: Number,
      require: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Unpaid"],
      required: true,
    },
  },
  { timestamps: true }
);

const CuttonCakeKhata = mongoose.model("cuttonCakeKhataBook", CuttonCakekhataSchema);

module.exports = CuttonCakeKhata;
