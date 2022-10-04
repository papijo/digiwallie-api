//Controller Imports
import RegisterController from "../controllers/auth/RegisterController";
import AdminRegisterController from "../controllers/auth/AdminRegisterController";
import StaffRegisterController from "../controllers/auth/StaffRegisterController";
import VerifyProfileController from "../controllers/auth/VerifyProfileController";
import RefreshJWTController from "../controllers/auth/RefreshJWTController";
import LoginController from "../controllers/auth/LoginController";

/* 
Add Validation and Sanitation Code
Add Rate Limiting Code
*/

//Express Router Import
import { Router } from "express";
const router: Router = Router();

//User Register Route
router.post("/user/register", RegisterController);

//Staff Register Route
router.post("/staff/register", StaffRegisterController);

//Admin Register Route
router.post("/admin/register", AdminRegisterController);

//Login Route
router.post("/login", LoginController);

//Verify Profile Route
router.post("/verifyprofile", VerifyProfileController);

//Refresh JWT
router.post("/jwt/refresh", RefreshJWTController);
