"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const CreateWalletAccount_1 = __importDefault(require("../controllers/users/CreateWalletAccount"));
const DeleteUserController_1 = __importDefault(require("../controllers/users/DeleteUserController"));
const EditUserController_1 = __importDefault(require("../controllers/users/EditUserController"));
const ForgottenPasswordController_1 = __importDefault(require("../controllers/users/ForgottenPasswordController"));
const GetAllUsersController_1 = __importDefault(require("../controllers/users/GetAllUsersController"));
const GetUnverifiedUsers_1 = __importDefault(require("../controllers/users/GetUnverifiedUsers"));
const GetUserController_1 = __importDefault(require("../controllers/users/GetUserController"));
const UserStatisticsController_1 = __importDefault(require("../controllers/users/UserStatisticsController"));
const GetVerifiedUsers_1 = __importDefault(require("../controllers/users/GetVerifiedUsers"));
const VerifyChangedPassword_1 = __importDefault(require("../controllers/users/VerifyChangedPassword"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/user/create/account", CreateWalletAccount_1.default);
router.delete("/:id", DeleteUserController_1.default);
router.put("/:id", EditUserController_1.default);
router.put("/change/password", ForgottenPasswordController_1.default);
router.get("/", GetAllUsersController_1.default);
router.get("/unverified", GetUnverifiedUsers_1.default);
router.get("/find/:id", GetUserController_1.default);
router.get("/getstats/:date", UserStatisticsController_1.default);
router.get("/verified", GetVerifiedUsers_1.default);
router.put("/verify/changedpassword", VerifyChangedPassword_1.default);
module.exports = router;
//# sourceMappingURL=UserRoute.js.map