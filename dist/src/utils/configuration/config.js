"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const PASS_SECRET_CRYPTOJS = process.env.PASS_SECRET_CRYPTOJS;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_RFR_SECRET_KEY = process.env.JWT_RFR_SECRET_KEY;
const NODE_ENV = process.env.NODE_ENV;
const API_AUTH = process.env.API_AUTH;
exports.default = {
    PORT,
    MONGODB_URI,
    PASS_SECRET_CRYPTOJS,
    JWT_SECRET_KEY,
    JWT_RFR_SECRET_KEY,
    NODE_ENV,
    API_AUTH,
};
//# sourceMappingURL=config.js.map