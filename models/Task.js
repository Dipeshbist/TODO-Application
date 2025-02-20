const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    }, // Added priority field
    dueDate: { type: Date }, // Added due date field
  },
  { timestamps: true } // Adds createdAt & updatedAt fields automatically
);

module.exports = mongoose.model("Task", TaskSchema);
