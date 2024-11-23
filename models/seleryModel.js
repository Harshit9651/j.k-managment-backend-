const mongoose = require("mongoose");
const { Schema } = mongoose;

const salarySchema = new Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    totalWorkingDays: {
      type: Number,
      required: true,
    },
    totalPresentDays: {
      type: Number,
      required: true,
    },
    totalHalfDays: {
      type: Number,
      default: 0,
    },
    calculatedSalary: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Unpaid", "Partially Paid"],
      default: "Unpaid",
    },
    creditedAmount: {
      type: Number,
      default: 0,
    },
    remainingAmount: {
      type: Number,
      default: function () {
        return this.calculatedSalary - this.creditedAmount;
      },
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Salary", salarySchema);
