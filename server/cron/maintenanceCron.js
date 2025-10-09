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
exports.startMaintenanceCron = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const Project_1 = require("../models/Project");
const Payment_1 = require("../models/Payment");
const startMaintenanceCron = () => __awaiter(void 0, void 0, void 0, function* () {
    node_cron_1.default.schedule("*/10 * 60* * * *", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("🔁 Running Monthly Maintenance Payment Cron Job...");
        const activeProjects = yield Project_1.Project.find({ isMaintenanceActive: true }).populate("client");
        console.log(`📊 Total active maintenance projects: ${activeProjects.length}`);
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        for (const project of activeProjects) {
            const existingPayment = yield Payment_1.Payment.findOne({
                project: project._id,
                type: "maintenance",
                paymentDate: {
                    $gte: new Date(currentYear, currentMonth, 1),
                    $lt: new Date(currentYear, currentMonth + 1, 1),
                },
            });
            if (existingPayment) {
                console.log(`✅ Maintenance already exists for '${project.title}' this month (Status: '${project.status}')`);
                continue; // Do not create again
            }
            const newPayment = new Payment_1.Payment({
                client: project.client._id,
                project: project._id,
                amount: project.maintenanceAmount || 0,
                type: "maintenance",
                status: "pending", // always starts pending
                paymentDate: new Date(),
            });
            yield newPayment.save();
            console.log(`💸 Maintenance payment created for '${project.title}' (Amount: ₹${project.maintenanceAmount})`);
        }
    }));
});
exports.startMaintenanceCron = startMaintenanceCron;
