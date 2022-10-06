import User from "../../models/User";
import { Request, Response } from "express";
import moment from "moment";

//CommonJs Imports
const Crypto = require("crypto");

//Configuration
import config from "../../utils/configuration/config";

//Verify Changed Password Controller
const VerifyChangedPasswordController = async (req: Request, res: Response) => {
  try {
    //Check for User
    const user = await User.findOne({ email: req.body.email });

    //Check if User Exists
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    //Checks if User is Verified
    if (user.isVerified !== true) {
      return res.status(403).json({
        message:
          "Your Account has not been verified, please Login to use the Risigner App.",
      });
    }

    //Check to see if Password Token is Empty
    if (req.body.passwordResetToken === "" || !req.body.passwordResetToken) {
      return res
        .status(402)
        .json({ message: "Password Token cannot be Empty" });
    }

    //Checks to see if the Password token Matches
    if (user.passwordResetToken !== req.body.passwordResetToken) {
      return res.status(403).json({ message: "Wrong Verification Token" });
    }

    let now = moment(new Date()); //todays date
    let end = moment(new Date(user.passwordResetTokenExpiryDate)); // another date
    let duration = moment.duration(now.diff(end));
    let hours = duration.asHours();

    const otpTimeIsExpired = hours > 1; //
    if (otpTimeIsExpired) {
      return res
        .status(403)
        .json({ message: "Verification Token no Longer Valid" });
    }

    //Changes Password after inserting token
    if (user.passwordResetToken === req.body.passwordResetToken) {
      const changePasswordAction = async () => {
        // Check to see if entered password is old password
        user.password = Crypto.AES.encrypt(
          req.body.password,
          config.PASS_SECRET_CRYPTOJS
        ).toString();
        user.passwordResetToken = "";

        user.save();
      };
      await changePasswordAction();
    }

    res.status(200).json({ message: "Password Changed" });
  } catch (error) {
    const errorMessage: object = {
      error: error,
      location: "Verify Changed Password Route",
      time: new Date(),
    };
    console.error(errorMessage);
    res.status(500).json(error);
  }
};

export default VerifyChangedPasswordController;
