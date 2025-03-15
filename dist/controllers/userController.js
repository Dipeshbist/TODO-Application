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
exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
// REGISTER
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields.",
            });
        }
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists. Please login instead.",
            });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new User_1.default({ username, email, password: hashedPassword });
        yield newUser.save();
        res
            .status(201)
            .json({ success: true, message: "User registered successfully." });
    }
    catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({
            success: false,
            message: "Error occurred during registration.",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.registerUser = registerUser;
// LOGIN
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid email or password." });
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials. Please try again.",
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
        res.status(200).json({
            success: true,
            message: "Login successful.",
            token,
            user: { id: user._id, email: user.email, username: user.username },
        });
    }
    catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({
            success: false,
            message: "Error occurred during login.",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.loginUser = loginUser;
