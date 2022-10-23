import CreateWalletAccount from "../controllers/users/CreateWalletAccount";
import DeleteUserController from "../controllers/users/DeleteUserController";
import EditUserController from "../controllers/users/EditUserController";
import ForgottenPasswordController from "../controllers/users/ForgottenPasswordController";
import GetAllUsersControllers from "../controllers/users/GetAllUsersController";
import GetUnVerifiedUsersControllers from "../controllers/users/GetUnverifiedUsers";
import GetUserController from "../controllers/users/GetUserController";
import GetUserStatistics from "../controllers/users/UserStatisticsController";
import GetVerifiedUsersControllers from "../controllers/users/GetVerifiedUsers";
import VerifyChangedPasswordController from "../controllers/users/VerifyChangedPassword";

//Express Router Import
import { Router } from "express";
const router: Router = Router();

//Create User Wallet Account
router.post("/user/create/account", CreateWalletAccount);

//Delete User Controller
router.delete("/:id", DeleteUserController);

//Edit User Controller
router.put("/:id", EditUserController);

//Forgotten Password Controller
router.put("/change/password", ForgottenPasswordController);

//Get All Users Controller
router.get("/", GetAllUsersControllers);

//Get Unverified Users Controller
router.get("/unverified", GetUnVerifiedUsersControllers);

//Get Specific User
router.get("/find/:id", GetUserController);

//Get User Statistics
router.get("/getstats/:date", GetUserStatistics);

//Get Verified Users  Controller
router.get("/verified", GetVerifiedUsersControllers);

//Verify Changed Password Controller
router.put("/verify/changedpassword", VerifyChangedPasswordController);

export = router;
