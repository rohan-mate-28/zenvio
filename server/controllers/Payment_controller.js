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
exports.updatePaymentStatus = exports.getPaymentsByClient = exports.getAllPayments = exports.verifyPayment = exports.createOrder = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
const crypto_1 = __importDefault(require("crypto"));
const Payment_1 = require("../models/Payment");
const Project_1 = require("../models/Project");
const razorpay = new razorpay_1.default({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});
// 1. Create Razorpay Order
// Create Razorpay Order
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { projectId, amount, type } = req.body;
        const clientId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id; // from isAuthenticated middleware
        if (!projectId || !amount || !type) {
            res.status(400).json({ message: "Project ID, amount and type are required", success: false });
            return;
        }
        // If it's project type, ensure project exists
        if (type === "project") {
            const project = yield Project_1.Project.findById(projectId);
            if (!project) {
                res.status(404).json({ message: "Project not found", success: false });
                return;
            }
        }
        // ✅ Create Razorpay order
        const options = {
            amount: amount * 100, // paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };
        const order = yield razorpay.orders.create(options);
        // ✅ Save payment entry in DB
        yield Payment_1.Payment.create({
            client: clientId,
            project: projectId,
            amount,
            type,
            paymentStatus: "pending",
            razorpayOrderId: order.id,
            paymentDate: new Date()
        });
        res.status(201).json({
            success: true,
            message: "Razorpay order created",
            order,
            key: process.env.RAZORPAY_KEY_ID, // frontend needs public key
        });
    }
    catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ success: false, message: "Failed to create order" });
    }
});
exports.createOrder = createOrder;
// 2. Verify Payment
const verifyPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            res.status(400).json({ success: false, message: "Missing payment details" });
            return;
        }
        // Verify signature
        const hmac = crypto_1.default.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
        hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const generatedSignature = hmac.digest("hex");
        if (generatedSignature !== razorpay_signature) {
            res.status(400).json({ success: false, message: "Payment verification failed" });
            return;
        }
        // Update payment status in DB
        const payment = yield Payment_1.Payment.findOneAndUpdate({ razorpayOrderId: razorpay_order_id }, { razorpayPaymentId: razorpay_payment_id, paymentStatus: "paid" }, { new: true });
        if (!payment) {
            res.status(404).json({ success: false, message: "Payment record not found" });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Payment verified successfully",
            payment,
        });
    }
    catch (err) {
        console.error("Error verifying payment:", err);
        res.status(500).json({ success: false, message: "Error verifying payment" });
    }
});
exports.verifyPayment = verifyPayment;
// 3. Get all payments (Admin)
const getAllPayments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payments = yield Payment_1.Payment.find()
            .populate("client", "name email phone")
            .populate("project", "title price status");
        res.status(200).json({ success: true, payments });
    }
    catch (err) {
        console.error("Error fetching payments:", err);
        res.status(500).json({ message: "Error fetching payments", success: false });
    }
});
exports.getAllPayments = getAllPayments;
// 4. Get payments by client
const getPaymentsByClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clientId } = req.params;
        const payments = yield Payment_1.Payment.find({ client: clientId })
            .populate("client", "name email phone")
            .populate("project", "title price status");
        res.status(200).json({ success: true, payments });
    }
    catch (err) {
        console.error("Error fetching client payments:", err);
        res.status(500).json({ message: "Error fetching client payments", success: false });
    }
});
exports.getPaymentsByClient = getPaymentsByClient;
// 5. Update Payment Status (Admin)
const updatePaymentStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!["paid", "failed", "pending"].includes(status)) {
            res.status(400).json({ message: "Invalid payment status", success: false });
            return;
        }
        const payment = yield Payment_1.Payment.findByIdAndUpdate(id, { paymentStatus: status }, { new: true });
        if (!payment) {
            res.status(404).json({ message: "Payment not found", success: false });
            return;
        }
        res.status(200).json({ success: true, message: "Payment status updated", payment });
    }
    catch (err) {
        console.error("Error updating payment status:", err);
        res.status(500).json({ message: "Error updating payment status", success: false });
    }
});
exports.updatePaymentStatus = updatePaymentStatus;
