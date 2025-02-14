const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const data = await Task.find(); // Fetch all tasks from MongoDB
    console.log("task fetched");
    res.status(200).json(data); // Send tasks as JSON response
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a new task
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newTask = new Task(data);
    const response = await newTask.save();
    console.log("task saved successfully");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a task
router.put("/:id", async (req, res) => {
  try {
    const taskId = req.params.id; // Get task ID from URL
    const updatedTaskData = req.body;
    const response = await Task.findByIdAndUpdate(taskId, updatedTaskData, {
      new: true, //Return the updated document
      runValidators: true, //Run Mongoose validation
    });
    if (!response) {
      return res.status(404).json({ error: "Task not found" });
    }
    console.log("task updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a task
router.delete("/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const response = await Task.findByIdAndRemove(taskId);
    if (!response) {
      return res.status(404).json({ error: "Task not found" });
    }
    console.log("task deleted");
    res.status(200).json({ message: "Task Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
