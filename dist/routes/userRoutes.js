"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { registerUser, loginUser } = require("../controllers/userController");
const router = express_1.default.Router();
// Register Route
router.post("/register", registerUser);
// Login Route
router.post("/login", loginUser);
exports.default = router;
