const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;
