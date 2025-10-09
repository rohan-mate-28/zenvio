import { Request, Response } from "express";
import { User } from "../models/User";
import { Project } from "../models/Project";
import { Payment } from "../models/Payment";

export const getAlluser=async(req:Request,res:Response):Promise<void>=>{
      try{
            const users=await User.find({"role":"client"}).select("-password");
            res.status(200).json({
                  message:"All User",
                  success:true,
                  users
            })
      }catch(err){
              res.status(401).json({
                  message:"failed to fetch Users",
                  success:false
            });
      }
}
export const updateuserrole=async(req:Request,res:Response):Promise<void>=>{
      try{
           const {id}=req.params;
           const {role}=req.body;
           if(!["client","admin"].includes(role)){
            res.status(400).json({
                  message:"Invalid Role",
                  success:false
            });
      } 
            const user=await User.findByIdAndUpdate(id,{role},{new:true});
            if(!user){
                  res.status(404).json({
                        message:"User not found",
                        success:false
                  })
            }
            res.status(200).json({
                  message:"User Role Updated Successfully",
                  success:true
            });
      }catch(err){
            res.status(500).json({
                  message:"Failed to update user Role",
                  success:false
            })
      }
}

export const deleteuser=async(req:Request,res:Response):Promise<void>=>{
      try{
            const {id}=req.params;
            const user=await User.findByIdAndDelete(id);
            if(!user){
                  res.status(404).json({
                        message:"User not found",
                        success:false
                  });
            }
            res.status(200).json({
                  message:"User Deleted Successfully",
                  success:true
            });
      }catch(err){
            res.status(500).json({
                  message :"Failed to delete User",
                  success:false
            });
      }
} 

export const getDashboard = async (req: Request, res: Response): Promise<void> => {
  try {
    // User Stats
    const totalUsers = await User.countDocuments();
    const totalAdmins = await User.countDocuments({ role: "admin" });
    const totalClients = await User.countDocuments({ role: "client" });

    // Project Stats
    const totalProjects = await Project.countDocuments();
//     const activeMaintenanceProjects = await Project.countDocuments({ isMaintenanceActive: true });

    // Payment Stats
    const totalPayments = await Payment.countDocuments();
    const paidPayments = await Payment.countDocuments({ paymentStatus: "paid" });
    const pendingPayments = await Payment.countDocuments({ paymentStatus: "pending" });
    const failedPayments = await Payment.countDocuments({ paymentStatus: "failed" });

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
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    res.status(500).json({
      message: "Failed to fetch Stats",
      success: false,
    });
  }
};