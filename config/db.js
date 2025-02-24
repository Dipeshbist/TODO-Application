const mongoose = require("mongoose");
require("dotenv").config();

const mongoURL = process.env.MONGO_URL || process.env.MONGO_URL_LOCAL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("Connected to MongoDB server");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process on failure
  }
};

// Call the function to connect
connectDB();

const db = mongoose.connection;

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

module.exports = db;
