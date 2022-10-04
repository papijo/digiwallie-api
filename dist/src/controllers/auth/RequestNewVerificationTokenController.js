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
const generateOTP_1 = __importDefault(require("./../../utils/helper/generateOTP"));
const RequestNewVerificationOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkUser = yield User_1.default.findOne({ email: req.body.email });
        if (checkUser.isVerified === true) {
            return res.status(403).json({
                message: "Your Account has already been verified, please Login to use the Risigner App.",
            });
        }
        let otp = (0, generateOTP_1.default)(6);
        const filter = { email: req.body.email };
        const update = {
            verificationToken: otp,
            verificationTokenDateTime: new Date(),
        };
        const user = yield User_1.default.findOneAndUpdate(filter, update, { new: true });
        res.status(200).json(user);
    }
    catch (error) {
        const errorMessage = {
            error: error,
            location: "Request New Verification Token Route",
            time: new Date(),
        };
        console.error(errorMessage);
        res.status(500).json(error);
    }
});
exports.default = RequestNewVerificationOTP;
//# sourceMappingURL=RequestNewVerificationTokenController.js.map