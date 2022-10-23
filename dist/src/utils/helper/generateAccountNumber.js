"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = generateAccount;
//# sourceMappingURL=generateAccountNumber.js.map