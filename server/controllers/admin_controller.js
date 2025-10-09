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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboard = exports.deleteuser = exports.updateuserrole = exports.getAlluser = void 0;
const User_1 = require("../models/User");
const Project_1 = require("../models/Project");
const Payment_1 = require("../models/Payment");
const getAlluser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.find({ "role": "client" }).select("-password");
        res.status(200).json({
            message: "All User",
            success: true,
            users
        });
    }
    catch (err) {
        res.status(401).json({
            message: "failed to fetch Users",
            success: false
        });
    }
});
exports.getAlluser = getAlluser;
const updateuserrole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { role } = req.body;
        if (!["client", "admin"].includes(role)) {
            res.status(400).json({
                message: "Invalid Role",
                success: false
            });
        }
        const user = yield User_1.User.findByIdAndUpdate(id, { role }, { new: true });
        if (!user) {
            res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        res.status(200).json({
            message: "User Role Updated Successfully",
            success: true
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Failed to update user Role",
            success: false
        });
    }
});
exports.updateuserrole = updateuserrole;
const deleteuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield User_1.User.findByIdAndDelete(id);
        if (!user) {
            res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        res.status(200).json({
            message: "User Deleted Successfully",
            success: true
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Failed to delete User",
            success: false
        });
    }
});
exports.deleteuser = deleteuser;
const getDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // User Stats
        const totalUsers = yield User_1.User.countDocuments();
        const totalAdmins = yield User_1.User.countDocuments({ role: "admin" });
        const totalClients = yield User_1.User.countDocuments({ role: "client" });
        // Project Stats
        const totalProjects = yield Project_1.Project.countDocuments();
        //     const activeMaintenanceProjects = await Project.countDocuments({ isMaintenanceActive: true });
        // Payment Stats
        const totalPayments = yield Payment_1.Payment.countDocuments();
        const paidPayments = yield Payment_1.Payment.countDocuments({ paymentStatus: "paid" });
        const pendingPayments = yield Payment_1.Payment.countDocuments({ paymentStatus: "pending" });
        const failedPayments = yield Payment_1.Payment.countDocuments({ paymentStatus: "failed" });
        res.status(200).json({
            message: "Dashboard Stats",
            success: true,
            stats: {
                totalUsers,
                totalAdmins,
                totalClients,
                totalProjects,
                payments: {
                    total: totalPayments,
                    paid: paidPayments,
                    pending: pendingPayments,
                    failed: failedPayments,
                },
            },
        });
    }
    catch (err) {
        console.error("Error fetching dashboard stats:", err);
        res.status(500).json({
            message: "Failed to fetch Stats",
            success: false,
        });
    }
});
exports.getDashboard = getDashboard;
