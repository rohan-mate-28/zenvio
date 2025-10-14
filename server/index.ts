import dotenv from "dotenv";
dotenv.config()
import express from "express";
import cookieParser from "cookie-parser";
import { connectdb } from "./utils/db";
import User_routes from "./routes/User_routes";
import Admin_routes from "./routes/Admin_routes";
import Project_routes from "./routes/Project_routes";
import payment_routes from "./routes/payment_routes";
import googleroutes from "./routes/googleroutes";
import { startMaintenanceCron } from "./cron/maintenanceCron";
import cors from "cors";
const app=express();
startMaintenanceCron();
const port=process.env.PORT||5000;
app.use(cors({
  origin: process.env.FRONTEND_URL, // your frontend URL
  credentials: true,               // allow cookies/auth headers
  allowedHeaders: ['Content-Type', 'Authorization'], // <--- FIX: This explicitly allows the Authorization header.
}));

app.use(express.json());
app.use(cookieParser());
app.use("/api/user",User_routes);
app.use("/api/admin",Admin_routes);
app.use("/api/project",Project_routes);
app.use("/api/payments",payment_routes);
app.use("/api/auth",googleroutes);
// app.use("/api/maintenance", maintenanceRoutes);
connectdb(() => {
  app.listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}`);
  });
});
