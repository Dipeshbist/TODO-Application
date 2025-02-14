const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// Create and export the model
const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;
