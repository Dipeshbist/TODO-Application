const Task = require("../models/Task");

// Get all tasks with filtering and sorting
const getTasks = async (req, res) => {
  try {
    let query = {}; // Initialize an empty query object

    // Filtering
    if (req.query.completed) {
      query.completed = req.query.completed === "true"; // Convert string to boolean
    }
    if (req.query.priority) {
      query.priority = req.query.priority; // Filter by priority
    }
    if (req.query.dueDate) {
      query.dueDate = { $lte: new Date(req.query.dueDate) }; // Tasks due before a certain date
    }

    // Sorting
    let sortOption = {};
    if (req.query.sortBy) {
      const order = req.query.order === "desc" ? -1 : 1; // Ascending or Descending order
      sortOption[req.query.sortBy] = order;
    }

    const data = await Task.find(query).sort(sortOption); // Apply filters & sorting
    console.log("Tasks fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Add a new task
const createTask = async (req, res) => {
  try {
    const { title, completed, priority, dueDate } = req.body;
    const newTask = new Task({ title, completed, priority, dueDate });
    const response = await newTask.save();
    console.log("Task saved successfully");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedTaskData = req.body;
    const response = await Task.findByIdAndUpdate(taskId, updatedTaskData, {
      new: true, // Return updated document
      runValidators: true, // Ensure validation rules are applied
    });
    if (!response) {
      return res.status(404).json({ error: "Task not found" });
    }
    console.log("Task updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const response = await Task.findByIdAndRemove(taskId);
    if (!response) {
      return res.status(404).json({ error: "Task not found" });
    }
    console.log("Task deleted");
    res.status(200).json({ message: "Task Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
