import { Request, Response } from "express";
import Task, { ITask } from "../models/Task";
import { FilterQuery } from "mongoose";

// Get all tasks with filtering and sorting
export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    let query: FilterQuery<ITask> = {};

    if (req.query.completed) {
      query.completed = req.query.completed === "true";
    }
    if (req.query.priority) {
      query.priority = req.query.priority as "low" | "medium" | "high";
    }
    if (req.query.dueDate) {
      query.dueDate = { $lte: new Date(req.query.dueDate as string) };
    }

    let sortOption: { [key: string]: 1 | -1 } = {};
    if (req.query.sortBy) {
      const order = req.query.order === "desc" ? -1 : 1;
      sortOption[req.query.sortBy as string] = order;
    }

    const tasks = await Task.find(query).sort(sortOption);
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new task
export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, completed, priority, dueDate } = req.body;
    const newTask = new Task({ title, completed, priority, dueDate });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a task
export const updateTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTask) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a task
export const deleteTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
