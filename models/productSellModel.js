const mongoose = require("mongoose");
const sellSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  itemType: {
    type: String,
    required: true,
    enum: ["Cotton", "Wheat", "Rice", "Other"],
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  sellDate: {
    type: Date,
    default: Date.now,
  },
  sellLocation: {
    type: String,
    required: true,
  },
  pricePerUnit: {
    type: Number,
    required: true,
    min: 0,
  },
  totalRevenue: {
    type: Number,
    required: true,
    min: 0,
  },
  buyerName: {
    type: String,
    required: true,
  },
  marketName: {
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

sellSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Sell = mongoose.model("Sell", sellSchema);

module.exports = Sell;
