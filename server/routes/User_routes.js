"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth_controller");
const isAuthicated_1 = require("../middlewares/isAuthicated");
const router = express_1.default.Router();
router.post("/register", auth_controller_1.register);
router.post("/login", auth_controller_1.login);
router.post("/logout", isAuthicated_1.isAunthicated, auth_controller_1.logout);
router.put("/update", isAuthicated_1.isAunthicated, auth_controller_1.updateprofile);
router.get("/me", auth_controller_1.getCurrentUser);
exports.default = router;
