import express from "express";
const { registerUser, loginUser } = require("../controllers/userController");

const router = express.Router();

// Register Route
router.post("/register", registerUser);

// Login Route
router.post("/login", loginUser);

export default router;
