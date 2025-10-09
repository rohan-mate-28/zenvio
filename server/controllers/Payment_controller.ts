import { Request, Response } from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import { Payment } from "../models/Payment";
import { Project } from "../models/Project";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

// 1. Create Razorpay Order
 // Create Razorpay Order
export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { projectId, amount, type } = req.body;
    const clientId = req.user?._id; // from isAuthenticated middleware

    if (!projectId || !amount || !type) {
      res.status(400).json({ message: "Project ID, amount and type are required", success: false });
      return;
    }

    // If it's project type, ensure project exists
    if (type === "project") {
      const project = await Project.findById(projectId);
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

    const order = await razorpay.orders.create(options);

    // ✅ Save payment entry in DB
    await Payment.create({
      client: clientId,
      project: projectId,
      amount,
      type,  
      paymentStatus: "pending",
      razorpayOrderId: order.id,
      paymentDate:new Date()
    });

    res.status(201).json({
      success: true,
      message: "Razorpay order created",
      order,
      key: process.env.RAZORPAY_KEY_ID, // frontend needs public key
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Failed to create order" });
  }
};


// 2. Verify Payment
export const verifyPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      res.status(400).json({ success: false, message: "Missing payment details" });
      return;
    }

    // Verify signature
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature !== razorpay_signature) {
      res.status(400).json({ success: false, message: "Payment verification failed" });
      return;
    }

    // Update payment status in DB
    const payment = await Payment.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      { razorpayPaymentId: razorpay_payment_id, paymentStatus: "paid" },
      { new: true }
    );

    if (!payment) {
      res.status(404).json({ success: false, message: "Payment record not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      payment,
    });

  } catch (err) {
    console.error("Error verifying payment:", err);
    res.status(500).json({ success: false, message: "Error verifying payment" });
  }
};
// 3. Get all payments (Admin)
export const getAllPayments = async (req: Request, res: Response): Promise<void> => {
  try {
    const payments = await Payment.find()
      .populate("client", "name email phone")
      .populate("project", "title price status");

    res.status(200).json({ success: true, payments });
  } catch (err) {
    console.error("Error fetching payments:", err);
    res.status(500).json({ message: "Error fetching payments", success: false });
  }
};

// 4. Get payments by client
export const getPaymentsByClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { clientId } = req.params;

    const payments = await Payment.find({ client: clientId })
      .populate("client", "name email phone")
      .populate("project", "title price status");

    res.status(200).json({ success: true, payments });
  } catch (err) {
    console.error("Error fetching client payments:", err);
    res.status(500).json({ message: "Error fetching client payments", success: false });
  }
};

// 5. Update Payment Status (Admin)
export const updatePaymentStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["paid", "failed", "pending"].includes(status)) {
      res.status(400).json({ message: "Invalid payment status", success: false });
      return;
    }

    const payment = await Payment.findByIdAndUpdate(
      id,
      { paymentStatus: status },
      { new: true }
    );

    if (!payment) {
      res.status(404).json({ message: "Payment not found", success: false });
      return;
    }

    res.status(200).json({ success: true, message: "Payment status updated", payment });
  } catch (err) {
    console.error("Error updating payment status:", err);
    res.status(500).json({ message: "Error updating payment status", success: false });
  }
};
