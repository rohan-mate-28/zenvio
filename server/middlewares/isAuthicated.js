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
exports.isAdmin = exports.isAunthicated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const isAunthicated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. Find the token in one of three locations: Header, Query, or Cookie.
    let token;
    // Priority A: Check Authorization Header (Bearer token from frontend OAuth validation)
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    }
    // Priority B: Check Query Parameter (Used by direct redirects/Postman tests)
    if (!token && req.query.token) {
        token = req.query.token;
    }
    // Priority C: Check HTTP-only Cookie (Standard login flow)
    if (!token && req.cookies.token) {
        token = req.cookies.token;
    }
    if (!token) {
        res.status(401).json({ message: "Authentication required (No token found)", success: false });
        return;
    }
    try {
        // Verify the token payload to get the user ID
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Look up the user in the database
        const user = yield User_1.User.findById(decoded.id).select("+role");
        if (!user) {
            res.status(401).json({ message: "User not found or token invalid", success: false });
            return;
        }
        req.user = user;
        next();
    }
    catch (err) {
        res.status(401).json({ message: "Invalid or expired token", success: false });
    }
});
exports.isAunthicated = isAunthicated;
const isAdmin = (req, res, next) => {
    const user = req.user;
    if (user.role !== "admin") {
        res.status(403).json({
            message: "Admin access only",
            success: false,
        });
    }
    console.log("Current user role:", user.role);
    next();
};
exports.isAdmin = isAdmin;
