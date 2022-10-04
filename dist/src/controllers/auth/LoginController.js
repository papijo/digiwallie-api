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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../models/User"));
const config_1 = __importDefault(require("../../utils/configuration/config"));
const Crypto = require("crypto");
const generateJWT_1 = require("../../utils/helper/generateJWT");
const LoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ email: req.body.email });
        if (!user) {
            res.status(404).json({ message: "Wrong Credentials, User not found" });
        }
        const hashedPassword = Crypto.AES.decrypt(user.password, config_1.default.PASS_SECRET_CRYPTOJS);
        const originalPassword = hashedPassword.toString(Crypto.enc.Utf8);
        if (originalPassword !== req.body.password) {
            res.status(401).json({ message: "Wrong Credentials" });
        }
        const verifiedUser = user.isVerified;
        if (verifiedUser === false) {
            res.status(403).json({
                message: "Unverified Account, Please get verified or contact the DigiWallie Support",
            });
        }
        const accessToken = (0, generateJWT_1.generateAccessToken)(user);
        const refreshAccessToken = (0, generateJWT_1.generateRefreshAccessToken)(user);
        const newDate = new Date();
        const year = newDate.getFullYear();
        const month = newDate.getMonth() + 1;
        const day = newDate.getDate();
        const dateLogin = [day, month, year].join("-");
        const addToLoginCount = () => __awaiter(void 0, void 0, void 0, function* () {
            if (user.loginCount.includes(dateLogin) !== true) {
                user.loginCount.push(dateLogin);
                user.save();
            }
        });
        addToLoginCount();
        const _a = user._doc, { password, verificationToken } = _a, others = __rest(_a, ["password", "verificationToken"]);
        res.status(200).json(Object.assign(Object.assign({}, others), { accessToken, refreshAccessToken }));
    }
    catch (error) {
        const errorMessage = {
            error: error,
            location: "Login Route",
            time: new Date(),
        };
        console.error(errorMessage);
        res.status(500).json(error);
    }
});
exports.default = LoginController;
//# sourceMappingURL=LoginController.js.map