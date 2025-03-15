"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasks = void 0;
const Task_1 = __importDefault(require("../models/Task"));
// Get all tasks with filtering and sorting
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = {};
        if (req.query.completed) {
            query.completed = req.query.completed === "true";
        }
        if (req.query.priority) {
            query.priority = req.query.priority;
        }
        if (req.query.dueDate) {
            query.dueDate = { $lte: new Date(req.query.dueDate) };
        }
        let sortOption = {};
        if (req.query.sortBy) {
            const order = req.query.order === "desc" ? -1 : 1;
            sortOption[req.query.sortBy] = order;
        }
        const tasks = yield Task_1.default.find(query).sort(sortOption);
        res.status(200).json(tasks);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getTasks = getTasks;
// Create a new task
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, completed, priority, dueDate } = req.body;
        const newTask = new Task_1.default({ title, completed, priority, dueDate });
        const savedTask = yield newTask.save();
        res.status(201).json(savedTask);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.createTask = createTask;
// Update a task
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedTask = yield Task_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedTask) {
            res.status(404).json({ error: "Task not found" });
            return;
        }
        res.status(200).json(updatedTask);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.updateTask = updateTask;
// Delete a task
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTask = yield Task_1.default.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            res.status(404).json({ error: "Task not found" });
            return;
        }
        res.status(200).json({ message: "Task deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.deleteTask = deleteTask;
