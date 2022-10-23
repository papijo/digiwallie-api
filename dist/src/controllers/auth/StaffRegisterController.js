"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const Crypto = __importStar(require("crypto-js"));
const generateOTP_1 = __importDefault(require("../../utils/helper/generateOTP"));
const config_1 = __importDefault(require("../../utils/configuration/config"));
const StaffRegisterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userEmailExist = yield User_1.default.findOne({ email: req.body.email });
        if (userEmailExist) {
            console.log("User Already Exists");
            return res
                .status(400)
                .json({ error: true, message: "User Already Exists" });
        }
        if (!req.body.password) {
            return res
                .status(400)
                .json({ error: true, message: "Empty Password Field" });
        }
        let otp = (0, generateOTP_1.default)(6);
        const newUser = new User_1.default({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: Crypto.AES.encrypt(req.body.password, config_1.default.PASS_SECRET_CRYPTOJS).toString(),
            isUser: true,
            isStaff: true,
            verificationToken: otp,
            verificationTokenDateTime: new Date(),
        });
        console.log(otp);
        const savedUser = yield newUser.save();
        res.status(200).json(savedUser);
    }
    catch (error) {
        const errorMessage = {
            error: error,
            location: "Register Route",
            time: new Date(),
        };
        console.error(errorMessage);
        return res.status(500).json(error);
    }
});
exports.default = StaffRegisterController;
//# sourceMappingURL=StaffRegisterController.js.map