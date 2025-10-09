"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const isAuthicated_1 = require("../middlewares/isAuthicated");
const Payment_controller_1 = require("../controllers/Payment_controller");
const router = express_1.default.Router();
router.post("/create-order", isAuthicated_1.isAunthicated, Payment_controller_1.createOrder);
router.post("/verify", isAuthicated_1.isAunthicated, Payment_controller_1.verifyPayment);
router.get("/all", isAuthicated_1.isAunthicated, isAuthicated_1.isAdmin, Payment_controller_1.getAllPayments);
router.get("/client/:clientId", isAuthicated_1.isAunthicated, isAuthicated_1.isAdmin, Payment_controller_1.getPaymentsByClient);
router.put("/:id/status", isAuthicated_1.isAunthicated, isAuthicated_1.isAdmin, Payment_controller_1.updatePaymentStatus);
exports.default = router;
