"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshAccessToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../configuration/config"));
const generateAccessToken = (user) => {
    const signature = jsonwebtoken_1.default.sign({
        id: user._id,
        isUser: user.isUser,
        isStaff: user.isStaff,
        isAdmin: user.isAdmin,
        isVerified: user.isVerified,
    }, config_1.default.JWT_SECRET_KEY, { expiresIn: "24h" });
    return signature;
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshAccessToken = (user) => {
    const signature = jsonwebtoken_1.default.sign({
        id: user._id,
        isUser: user.isUser,
        isStaff: user.isStaff,
        isAdmin: user.isAdmin,
        isVerified: user.isVerified,
    }, config_1.default.JWT_RFR_SECRET_KEY, { expiresIn: "24h" });
    return signature;
};
exports.generateRefreshAccessToken = generateRefreshAccessToken;
//# sourceMappingURL=generateJWT.js.map