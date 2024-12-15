
// const mongoose = require("mongoose");
// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/Jkcompany');
// console.log("mongoose responsed sucessfully");

// }
const mongoose = require('mongoose');
require('dotenv').config
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODBATLS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000  });
    console.log('MongoDB connected');

  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

 module.exports = connectDB;

