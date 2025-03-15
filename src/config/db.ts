import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURL: string | undefined =
  process.env.MONGO_URL ?? process.env.MONGO_URL_LOCAL;

if (!mongoURL) {
  throw new Error(
    "MongoDB connection URL is missing. Set MONGO_URL or MONGO_URL_LOCAL in the .env file."
  );
}

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoURL);
    console.log("Connected to MongoDB server");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDB();

const db = mongoose.connection;
db.on("disconnected", () => console.log("MongoDB disconnected"));

export default db;
