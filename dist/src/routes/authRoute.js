"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const RegisterController_1 = __importDefault(require("../controllers/auth/RegisterController"));
const AdminRegisterController_1 = __importDefault(require("../controllers/auth/AdminRegisterController"));
const StaffRegisterController_1 = __importDefault(require("../controllers/auth/StaffRegisterController"));
const VerifyProfileController_1 = __importDefault(require("../controllers/auth/VerifyProfileController"));
const RefreshJWTController_1 = __importDefault(require("../controllers/auth/RefreshJWTController"));
const LoginController_1 = __importDefault(require("../controllers/auth/LoginController"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/user/register", RegisterController_1.default);
router.post("/staff/register", StaffRegisterController_1.default);
router.post("/admin/register", AdminRegisterController_1.default);
router.post("/login", LoginController_1.default);
router.post("/verifyprofile", VerifyProfileController_1.default);
router.post("/jwt/refresh", RefreshJWTController_1.default);
module.exports = router;
//# sourceMappingURL=AuthRoute.js.map