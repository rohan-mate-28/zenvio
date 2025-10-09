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
exports.getCurrentUser = exports.updateprofile = exports.logout = exports.login = exports.register = void 0;
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Utility: Set token cookie
const generateTokenAndSetCookie = (userId, res, message, user // Use IUser type for better safety
) => {
    const token = jsonwebtoken_1.default.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    // Ensure user object is prepared for client response (remove password)
    const userForResponse = user.toObject({ getters: true });
    delete userForResponse.password;
    res
        .status(200)
        .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
        .json({ success: true, message, token, user: userForResponse }); // Return user object excluding password
};
// Register
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, password } = req.body;
        const userexist = yield User_1.User.findOne({ email });
        if (userexist) {
            res.status(400).json({ message: "User already exists", success: false });
            return;
        }
        // Mongoose pre-save hook handles password hashing
        const user = yield User_1.User.create({ name, email, phone, password });
        generateTokenAndSetCookie(user._id.toString(), res, "Registered successfully", user);
    }
    catch (err) {
        res.status(500).json({ message: "Registration failed", success: false });
    }
});
exports.register = register;
// Login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Must select password explicitly since it's hidden in the schema
        const user = yield User_1.User.findOne({ email }).select("+password");
        if (!user) {
            res.status(401).json({ message: "Incorrect email", success: false });
            return;
        }
        const isMatch = yield user.comparePassword(password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid password", success: false });
            return;
        }
        generateTokenAndSetCookie(user._id.toString(), res, "Logged in successfully", user);
    }
    catch (err) {
        res.status(500).json({ message: "Login failed", success: false });
    }
});
exports.login = login;
// Logout
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res
            .status(200)
            .cookie("token", "", {
            httpOnly: true,
            expires: new Date(0),
        })
            .json({ success: true, message: "Logged out successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Logout failed", success: false });
    }
});
exports.logout = logout;
// Update profile
const updateprofile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const { name, email, phone, password } = req.body;
        if (name)
            user.name = name;
        if (email)
            user.email = email;
        if (phone)
            user.phone = phone;
        if (password)
            user.password = password;
        yield user.save();
        res.status(200).json({ message: "Profile updated", success: true });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to update profile", success: false });
    }
});
exports.updateprofile = updateprofile;
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Check query parameter, Authorization header, or cookie
        const token = req.query.token || ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || req.cookies.token;
        if (!token || typeof token !== "string") {
            res.status(401).json({ message: "No token provided" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Find user, but exclude the password field
        const user = yield User_1.User.findById(decoded.id).select("-password");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // If token was passed via query/header, we need to ensure the client gets the user object
        res.status(200).json({ user });
    }
    catch (err) {
        console.error(err);
        res.status(401).json({ message: "Invalid token" });
    }
});
exports.getCurrentUser = getCurrentUser;
