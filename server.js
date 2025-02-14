const express = require("express");
const app = express();
const db = require("./config/db");

require("dotenv").config();
const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

//Middleware Function
const logRequest = (req, res, next) => {
  console.log(
    `${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`
  );
  next(); // Move on to the next phase
};
app.use(logRequest);

app.get("/", function (req, res) {
  res.send("Welcome to TODO App");
});

//Import the router files
const taskRoutes = require("./routes/taskRoutes");

//Use the routers
app.use("/task", taskRoutes);

app.listen(5000, () => {
  console.log("listening on port 5000");
});
