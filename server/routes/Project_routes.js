"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const isAuthicated_1 = require("../middlewares/isAuthicated");
const project_controller_1 = require("../controllers/project_controller");
const router = express_1.default.Router();
router.post("/create", isAuthicated_1.isAunthicated, isAuthicated_1.isAdmin, project_controller_1.createProject);
router.get("/allProjects", isAuthicated_1.isAunthicated, isAuthicated_1.isAdmin, project_controller_1.getALlProjects);
router.put("/update/:id", isAuthicated_1.isAunthicated, isAuthicated_1.isAdmin, project_controller_1.updateproject);
router.delete("/delete/:id", isAuthicated_1.isAunthicated, isAuthicated_1.isAdmin, project_controller_1.deleteProject);
router.get("/getMyorder", isAuthicated_1.isAunthicated, project_controller_1.getMyproject);
exports.default = router;
