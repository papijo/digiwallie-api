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
const config_1 = __importDefault(require("../../utils/configuration/config"));
const generateOTP_1 = __importDefault(require("./../../utils/helper/generateOTP"));
const Crypto = require("crypto");
const StaffRegisterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userEmailExist = yield User_1.default.findOne({ email: req.body.email });
        if (userEmailExist) {
            console.log("User Already Exists");
            return res
                .status(400)
                .json({ error: true, message: "User Already Exists" });
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
//# sourceMappingURL=StaffRegController.js.map