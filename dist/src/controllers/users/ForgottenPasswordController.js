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
const generateOTP_1 = __importDefault(require("../../utils/helper/generateOTP"));
const ForgottenPasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json("User Not Found");
        }
        if (user.isVerified !== true) {
            res
                .status(403)
                .json("Your Account has not been verified, please Login to use the DigiWallie App.");
        }
        let otp = (0, generateOTP_1.default)(6);
        const passwordChange = () => __awaiter(void 0, void 0, void 0, function* () {
            user.passwordResetToken = otp;
            user.passwordResetTokenExpiryDate = new Date();
            user.save();
        });
        yield passwordChange();
        res.status(200).json(user);
    }
    catch (error) {
        const errorMessage = {
            error: error,
            location: "Forgotten Password Route",
            time: new Date(),
        };
        console.error(errorMessage);
        res.status(500).json(error);
    }
});
exports.default = ForgottenPasswordController;
//# sourceMappingURL=ForgottenPasswordController.js.map