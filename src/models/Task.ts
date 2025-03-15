import mongoose, { Schema, Document } from "mongoose";

// Define Task Interface
export interface ITask extends Document {
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    dueDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>("Task", TaskSchema);
