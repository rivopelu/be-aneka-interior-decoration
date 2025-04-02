"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.AppConfig = {
    port: Number(process.env.PORT) || 9090,
    nodeEnv: process.env.NODE_ENV || 'DEVELOPMENT',
};
