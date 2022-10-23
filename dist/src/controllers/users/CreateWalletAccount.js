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
const Account_1 = __importDefault(require("../../models/Account"));
const uuid_1 = require("uuid");
const CreateWalletAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }
        if (user.isVerified !== true) {
            return res.status(403).json({
                message: "Your Account has not been verified, please get Verified to use the DigiWallie App.",
            });
        }
        const accountCount = user.accounts.length;
        if (accountCount > 3) {
            res.status(403).json({
                message: "You cannot open another account as you have more than 3 Accounts",
            });
        }
        let newAccountNumber = (0, uuid_1.v4)();
        const newAccount = new Account_1.default({
            accountNumber: newAccountNumber,
            owner: user._id,
            balance: 0,
        });
        const savedAccount = yield newAccount.save();
        yield user.accounts.push(newAccountNumber);
        user.save();
        res.status(200).json({ message: "New Account Created", savedAccount });
    }
    catch (error) {
        const errorMessage = {
            error: error,
            location: "Create Wallet Account Route",
            time: new Date(),
        };
        console.error(errorMessage);
        res.status(500).json(error);
    }
});
exports.default = CreateWalletAccount;
//# sourceMappingURL=CreateWalletAccount.js.map