import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectdb } from "./utils/db";
import User_routes from "./routes/User_routes";
import Admin_routes from "./routes/Admin_routes";
import Project_routes from "./routes/Project_routes";
import payment_routes from "./routes/payment_routes";
import googleroutes from "./routes/googleroutes";
import { startMaintenanceCron } from "./cron/maintenanceCron";

const app = express();
const port = Number(process.env.PORT) || 5000;
// ✅ Start cron job
startMaintenanceCron();

// ✅ Parse comma-separated FRONTEND_URLS into an array
const allowedOrigins = process.env.FRONTEND_URLS
  ? process.env.FRONTEND_URLS.split(",").map((url) => url.trim())
  : [];

console.log("✅ Allowed CORS origins:", allowedOrigins);

// ✅ Dynamic CORS setup
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use("/api/user", User_routes);
app.use("/api/admin", Admin_routes);
app.use("/api/project", Project_routes);
app.use("/api/payments", payment_routes);
app.use("/api/auth", googleroutes);

// ✅ Connect DB and start server
 
connectdb(() => {
  app.listen(port, "0.0.0.0", () => {
    console.log(`🚀 Server running on http://0.0.0.0:${port}`);
    console.log(`🌐 Accessible externally via http://72.60.206.115:${port}`);
  });
});
