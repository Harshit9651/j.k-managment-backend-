const mongoose = require("mongoose");
const Employee = require("./employeeModel")
const { Schema } = mongoose;

const attendanceSchema = new Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: [true, "Employee reference is required"],
    },
    date: {
      type: Date,
      required: [true, "Attendance date is required"],
      default: Date.now,
      validate: {
        validator: function (value) {
          return value <= new Date();
        },
        message: "Attendance date cannot be in the future",
      },
    },
    status: {
      type: String,
      enum: ["Full Day", "Half Leave", "Absent"],
      required: [true, "Attendance status is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Attendance", attendanceSchema);
