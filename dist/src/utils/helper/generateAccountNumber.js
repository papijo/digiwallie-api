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
const Account_1 = __importDefault(require("../../models/Account"));
const generateAccount = (length) => {
    const chars = "1234567890";
    if (!length) {
        length = Math.floor(Math.random() * chars.length);
    }
    let str = "";
    for (let i = 0; i < length; i += 1) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
};
const setAccountNumber = (accountNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const account = yield Account_1.default.findOne({ accountNumber });
    if (!account) {
        return accountNumber;
    }
    else {
        const accountNumber = generateAccount(10);
        setAccountNumber(accountNumber);
    }
});
const accountNumber = generateAccount(10);
const testAccountNumber = setAccountNumber(accountNumber);
exports.default = testAccountNumber;
//# sourceMappingURL=generateAccountNumber.js.map