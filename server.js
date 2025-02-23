const express = require("express");
const app = express();
const db = require("./config/db");
require("dotenv").config();
const cors = require("cors");

// Middleware
app.use(cors());
app.use(express.json()); // Using built-in Express JSON parser

const PORT = process.env.PORT || 5000;

// Middleware for Logging Requests
const logRequest = (req, res, next) => {
  console.log(
    `${new Date().toLocaleString()} - Request to: ${req.originalUrl}`
  );
  next();
};
app.use(logRequest);

// Import Routes
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes"); // FIXED: Import user routes

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to TODO App");
});

// Use Routes
app.use("/task", taskRoutes);
app.use("/user", userRoutes); 

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
