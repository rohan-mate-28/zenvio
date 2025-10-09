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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyproject = exports.deleteProject = exports.updateproject = exports.getALlProjects = exports.createProject = void 0;
const User_1 = require("../models/User");
const Project_1 = require("../models/Project");
const Payment_1 = require("../models/Payment");
////Create a new Project
// This function creates a new project and associates it with a client.
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clientId, title, description, techStack, liveUrl, githubUrl, price, status, startDate, endDate } = req.body;
        const client = yield User_1.User.findById(clientId);
        if (!client) {
            res.status(404).json({ message: "Client not fountd", success: false });
        }
        const newProject = yield Project_1.Project.create({
            client: clientId,
            title,
            description,
            techStack,
            liveUrl,
            githubUrl,
            price,
            status,
            startDate,
            endDate,
        });
        yield newProject.populate("client", "name email phone role");
        yield Payment_1.Payment.create({
            client: clientId,
            project: newProject._id,
            amount: price,
            type: 'project',
            paymentStatus: 'pending',
        });
        res.status(201).json({
            message: "Project Created Successfully",
            success: true,
            project: newProject
        });
    }
    catch (err) {
        console.error("Error creting project:", err);
        res.status(500).json({ message: "Error to create project" });
    }
});
exports.createProject = createProject;
//Get all projects
const getALlProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield Project_1.Project.find().populate('client', 'name email phone role');
        res.status(200).json({
            message: "All Projects",
            success: true,
            projects
        });
    }
    catch (err) {
        console.log("Error getting all project:", err);
        res.status(500).json({ message: "Error to get all Proejcts", success: false });
    }
});
exports.getALlProjects = getALlProjects;
//Update a Project
const updateproject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updates = req.body;
        const project = yield Project_1.Project.findByIdAndUpdate(id, updates, { new: true });
        if (!project) {
            res.status(404).json({
                message: "Project Not FOund",
                success: false
            });
        }
        res.status(200).json({
            message: "Project Updated Successfully",
            success: true,
            project
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Falied to update Project",
            success: false
        });
    }
});
exports.updateproject = updateproject;
//Delete A project
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const project = yield Project_1.Project.findByIdAndDelete(id);
        if (!project) {
            res.status(404).json({
                message: "Project not found",
                success: false
            });
            return;
        }
        yield Payment_1.Payment.deleteMany({ project: id });
        res.status(200).json({
            message: "Project Deleted Successfuly",
            success: true
        });
    }
    catch (e) {
        console.error("Error deleting project:", e);
        res.status(500).json({
            messsage: "Error to delete project",
            success: false
        });
    }
});
exports.deleteProject = deleteProject;
///this for client side get my project controller thay can see
const getMyproject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const clientid = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!clientid) {
            res.status(400).json({
                message: "User not Found",
                success: false,
            });
            return;
        }
        const projects = yield Project_1.Project.find({ client: clientid }).populate('client', 'name email phone role');
        res.status(200).json({
            message: "Your Projects",
            success: true,
            projects
        });
    }
    catch (err) {
        console.error("Error getiing my Project", err);
        res.status(500).json({
            message: "Error to get my project",
            success: false
        });
    }
});
exports.getMyproject = getMyproject;
