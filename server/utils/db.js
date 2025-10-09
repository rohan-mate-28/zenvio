"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectdb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectdb = (onconnected) => {
    const connectwithretry = () => {
        mongoose_1.default.connect(process.env.MONGO_DB, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 50000
        }).then(() => {
            console.log("database connected");
            if (onconnected)
                onconnected();
        }).catch((err) => {
            console.log("Error occuer databse concetion", err);
            setTimeout(connectwithretry, 5000);
        });
    };
    connectwithretry();
};
exports.connectdb = connectdb;
