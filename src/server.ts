import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import mongoose from "mongoose";
import taskRoutes from "./routes/taskRoutes";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 5000;

// Ensuring MONGO_URI is properly defined
const MONGO_URI = process.env.MONGO_URL ?? process.env.MONGO_URL_LOCAL;
if (!MONGO_URI) {
  console.error(
    "MONGO_URI is not defined. Please set MONGO_URL or MONGO_URL_LOCAL in the .env file."
  );
  process.exit(1);
}

// Connect to MongoDB
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Middleware for logging requests
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use("/task", taskRoutes);
app.use("/user", userRoutes);

// Default route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to TODO App API" });
});

// Global error handler (for catching errors in request handling)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(" Unexpected Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
