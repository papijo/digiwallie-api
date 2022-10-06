import User from "../../models/User";
import { Request, Response } from "express";

//Helper Functions
import generateOTP from "../../utils/helper/generateOTP";

//Configuration
// import config from "../../utils/configuration/config";

//Forgoten Password Controller
const ForgottenPasswordController = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("User Not Found");
    }
    if (user.isVerified !== true) {
      res
        .status(403)
        .json(
          "Your Account has not been verified, please Login to use the DigiWallie App."
        );
    }
    let otp = generateOTP(6);

    const passwordChange = async () => {
      user.passwordResetToken = otp;
      user.passwordResetTokenExpiryDate = new Date();
      user.save();
    };

    await passwordChange();
    res.status(200).json(user);
    //Send Email
  } catch (error) {
    const errorMessage: object = {
      error: error,
      location: "Forgotten Password Route",
      time: new Date(),
    };
    console.error(errorMessage);
    res.status(500).json(error);
  }
};

export default ForgottenPasswordController;
