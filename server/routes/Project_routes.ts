import express from "express";
import { isAdmin, isAunthicated } from "../middlewares/isAuthicated";
import { createProject, deleteProject, getALlProjects, getMyproject, updateproject } from "../controllers/project_controller";
const router=express.Router();
router.post("/create",isAunthicated,isAdmin,createProject);
router.get("/allProjects",isAunthicated,isAdmin,getALlProjects);
router.put("/update/:id",isAunthicated,isAdmin,updateproject);
router.delete("/delete/:id",isAunthicated,isAdmin,deleteProject);
router.get("/getMyorder",isAunthicated,getMyproject);

export default router;