import cron from "node-cron";
import { Project } from "../models/Project";
import { Payment } from "../models/Payment";

export const startMaintenanceCron = async () => {
  cron.schedule("*/10 * 60* * * *", async () => {
    console.log("🔁 Running Monthly Maintenance Payment Cron Job...");

    const activeProjects = await Project.find({ isMaintenanceActive: true }).populate("client");

    console.log(`📊 Total active maintenance projects: ${activeProjects.length}`);

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    for (const project of activeProjects) {
      const existingPayment = await Payment.findOne({
        project: project._id,
        type: "maintenance",
        paymentDate: {
          $gte: new Date(currentYear, currentMonth, 1),
          $lt: new Date(currentYear, currentMonth + 1, 1),
        },
      });

      if (existingPayment) {
        console.log(
          `✅ Maintenance already exists for '${project.title}' this month (Status: '${project.status}')`
        );
        continue; // Do not create again
      }
 
      const newPayment = new Payment({
        client: project.client._id,
        project: project._id,
        amount: project.maintenanceAmount || 0,
        type: "maintenance",
        status: "pending", // always starts pending
        paymentDate: new Date(),
      });

      await newPayment.save();
      console.log(`💸 Maintenance payment created for '${project.title}' (Amount: ₹${project.maintenanceAmount})`);
    }
  });
};
