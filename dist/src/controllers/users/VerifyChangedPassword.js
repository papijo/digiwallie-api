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
const User_1 = __importDefault(require("../../models/User"));
const moment_1 = __importDefault(require("moment"));
const Crypto = require("crypto");
const config_1 = __importDefault(require("../../utils/configuration/config"));
const VerifyChangedPasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }
        if (user.isVerified !== true) {
            return res.status(403).json({
                message: "Your Account has not been verified, please Login to use the Risigner App.",
            });
        }
        if (req.body.passwordResetToken === "" || !req.body.passwordResetToken) {
            return res
                .status(402)
                .json({ message: "Password Token cannot be Empty" });
        }
        if (user.passwordResetToken !== req.body.passwordResetToken) {
            return res.status(403).json({ message: "Wrong Verification Token" });
        }
        let now = (0, moment_1.default)(new Date());
        let end = (0, moment_1.default)(new Date(user.passwordResetTokenExpiryDate));
        let duration = moment_1.default.duration(now.diff(end));
        let hours = duration.asHours();
        const otpTimeIsExpired = hours > 1;
        if (otpTimeIsExpired) {
            return res
                .status(403)
                .json({ message: "Verification Token no Longer Valid" });
        }
        if (user.passwordResetToken === req.body.passwordResetToken) {
            const changePasswordAction = () => __awaiter(void 0, void 0, void 0, function* () {
                user.password = Crypto.AES.encrypt(req.body.password, config_1.default.PASS_SECRET_CRYPTOJS).toString();
                user.passwordResetToken = "";
                user.save();
            });
            yield changePasswordAction();
        }
        res.status(200).json({ message: "Password Changed" });
    }
    catch (error) {
        const errorMessage = {
            error: error,
            location: "Verify Changed Password Route",
            time: new Date(),
        };
        console.error(errorMessage);
        res.status(500).json(error);
    }
});
exports.default = VerifyChangedPasswordController;
//# sourceMappingURL=VerifyChangedPassword.js.map