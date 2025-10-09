import express from "express";
import { isAdmin, isAunthicated } from "../middlewares/isAuthicated";
import { deleteuser, getAlluser, getDashboard, updateuserrole } from "../controllers/admin_controller";
const router=express.Router();
router.get("/alluser",isAunthicated,isAdmin,getAlluser);
router.put("/user/:id/role",isAunthicated,isAdmin,updateuserrole);
router.delete("/delete/:id",isAunthicated,isAdmin,deleteuser);
router.get("/getdashboardstats",isAunthicated,isAdmin,getDashboard);

export default router;