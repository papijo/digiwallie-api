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
const VerifyProfileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }
        if (user.isVerified === true) {
            res.status(403).json({
                message: "Your Account has already been verified, please Login to use the DigiWallie App.",
            });
        }
        if (user.verificationToken !== req.body.verificationToken ||
            !req.body.verificationToken) {
            res.status(403).json({ message: "Wrong Verification Token" });
        }
        let now = (0, moment_1.default)(new Date());
        let end = (0, moment_1.default)(new Date(user.verificationTokenDateTime));
        let duration = moment_1.default.duration(now.diff(end));
        let hours = duration.asHours();
        const otpTimeIsExpired = hours > 24;
        if (otpTimeIsExpired) {
            res.status(403).json("Verification Token no Longer Valid");
        }
        if (user.verificationToken === req.body.verificationToken) {
            const changeVerified = () => __awaiter(void 0, void 0, void 0, function* () {
                user.isVerified = true;
                user.verificationToken = "";
                user.save();
            });
            changeVerified();
        }
        res.status(200).json(user);
    }
    catch (error) {
        const errorMessage = {
            error: error,
            location: "Verify Profile Route",
            time: new Date(),
        };
        console.error(errorMessage);
        res.status(500).json(error);
    }
});
exports.default = VerifyProfileController;
//# sourceMappingURL=VerifyProfileController.js.map