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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../utils/configuration/config"));
const generateJWT_1 = require("../../utils/helper/generateJWT");
const RefreshJWTController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshAccessToken = req.headers.refreshtoken;
        if (!refreshAccessToken) {
            return res.status(401).json({ message: "You are not authenticated!!!!" });
        }
        jsonwebtoken_1.default.verify(refreshAccessToken, config_1.default.JWT_RFR_SECRET_KEY, (error, user) => {
            error && console.log(error);
            const newAccessToken = (0, generateJWT_1.generateAccessToken)(user);
            const newRefreshAccessToken = (0, generateJWT_1.generateRefreshAccessToken)(user);
            res.status(200).json({
                accessToken: newAccessToken,
                refreshAccessToken: newRefreshAccessToken,
            });
        });
    }
    catch (error) {
        const errorMessage = {
            error: error,
            location: "Refresh Token Route",
            time: new Date(),
        };
        console.error(errorMessage);
        res.status(500).json(error);
    }
});
exports.default = RefreshJWTController;
//# sourceMappingURL=RefreshJWTController.js.map