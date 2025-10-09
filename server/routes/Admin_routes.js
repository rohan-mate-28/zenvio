"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const isAuthicated_1 = require("../middlewares/isAuthicated");
const admin_controller_1 = require("../controllers/admin_controller");
const router = express_1.default.Router();
router.get("/alluser", isAuthicated_1.isAunthicated, isAuthicated_1.isAdmin, admin_controller_1.getAlluser);
router.put("/user/:id/role", isAuthicated_1.isAunthicated, isAuthicated_1.isAdmin, admin_controller_1.updateuserrole);
router.delete("/delete/:id", isAuthicated_1.isAunthicated, isAuthicated_1.isAdmin, admin_controller_1.deleteuser);
router.get("/getdashboardstats", isAuthicated_1.isAunthicated, isAuthicated_1.isAdmin, admin_controller_1.getDashboard);
exports.default = router;
