"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_1 = require("./utils/db");
const User_routes_1 = __importDefault(require("./routes/User_routes"));
const Admin_routes_1 = __importDefault(require("./routes/Admin_routes"));
const Project_routes_1 = __importDefault(require("./routes/Project_routes"));
const payment_routes_1 = __importDefault(require("./routes/payment_routes"));
const googleroutes_1 = __importDefault(require("./routes/googleroutes"));
const maintenanceCron_1 = require("./cron/maintenanceCron");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
(0, maintenanceCron_1.startMaintenanceCron)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)({
    origin: "http://localhost:3000", // your frontend URL
    credentials: true, // allow cookies/auth headers
    allowedHeaders: ['Content-Type', 'Authorization'], // <--- FIX: This explicitly allows the Authorization header.
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/user", User_routes_1.default);
app.use("/api/admin", Admin_routes_1.default);
app.use("/api/project", Project_routes_1.default);
app.use("/api/payments", payment_routes_1.default);
app.use("/api/auth", googleroutes_1.default);
// app.use("/api/maintenance", maintenanceRoutes);
(0, db_1.connectdb)(() => {
    app.listen(port, () => {
        console.log(`🚀 Server is running at http://localhost:${port}`);
    });
});
