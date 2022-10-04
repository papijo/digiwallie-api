"use strict";
const generateOTP = (length) => {
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
module.exports = generateOTP;
//# sourceMappingURL=generateOTP.js.map