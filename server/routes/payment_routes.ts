import express from "express";
import { isAunthicated, isAdmin } from "../middlewares/isAuthicated";
import {
  createOrder,
  verifyPayment,
  getAllPayments,
  getPaymentsByClient,
  updatePaymentStatus,
} from "../controllers/Payment_controller";

const router = express.Router();

router.post("/create-order", isAunthicated, createOrder);

router.post("/verify", isAunthicated, verifyPayment);

router.get("/all", isAunthicated, isAdmin, getAllPayments);

router.get("/client/:clientId", isAunthicated, isAdmin, getPaymentsByClient);

router.put("/:id/status", isAunthicated, isAdmin, updatePaymentStatus);

export default router;
 
