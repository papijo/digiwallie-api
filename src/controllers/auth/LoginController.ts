import User from "../../models/User";
import { Request, Response } from "express";

//CommonJS Imports
const Crypto = require("crypto");

//Helper functions
import {
  generateAccessToken,
  generateRefreshAccessToken,
} from "../../utils/helper/generateJWT";

//Configuration
import config from "../../utils/configuration/config";

//Login Controller
const LoginController = async (req: Request, res: Response) => {
  try {
    //Check for User
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json({ message: "Wrong Credentials, User not found" });
    }

    //Decrypt Password if User is found
    const hashedPassword = Crypto.AES.decrypt(
      user.password,
      config.PASS_SECRET_CRYPTOJS
    );
    const originalPassword = hashedPassword.toString(Crypto.enc.Utf8);

    //Compare Decrypted Password with req.body.password
    if (originalPassword !== req.body.password) {
      res.status(401).json({ message: "Wrong Credentials" });
    }

    //Check if User is verified
    const verifiedUser = user.isVerified;
    if (verifiedUser === false) {
      res.status(403).json({
        message:
          "Unverified Account, Please get verified or contact the DigiWallie Support",
      });
    }
    //Generate AccessTokens
    const accessToken = generateAccessToken(user);
    const refreshAccessToken = generateRefreshAccessToken(user);

    //Add Date to Login Count
    const newDate = new Date();
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    const dateLogin = [day, month, year].join("-");

    const addToLoginCount = async () => {
      if (user.loginCount.includes(dateLogin) !== true) {
        user.loginCount.push(dateLogin);
        user.save();
      }
    };
    addToLoginCount();

    const { password, verificationToken, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken, refreshAccessToken });
  } catch (error) {
    const errorMessage: object = {
      error: error,
      location: "Login Route",
      time: new Date(),
    };
    console.error(errorMessage);
    res.status(500).json(error);
  }
};

export default LoginController;
