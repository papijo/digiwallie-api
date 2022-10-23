import User from "../../models/User";
// import config from "../../utils/configuration/config";
import { Request, Response } from "express";

//Helper Functions
import generateOTP from "./../../utils/helper/generateOTP";

//Request New Verification OTP Controller
const RequestNewVerificationOTP = async (req: Request, res: Response) => {
  try {
    //Check to see if user has been verified
    const checkUser = await User.findOne({ email: req.body.email });

    //Check to see if User exists
    if (!checkUser) {
      return res
        .status(400)
        .json({ error: true, message: "User Does not Exists" });
    }

    //Check to see if User is verified
    if (checkUser.isVerified === true) {
      return res.status(403).json({
        message:
          "Your Account has already been verified, please Login to use the Risigner App.",
      });
    }

    //Generate OTP if User has not been verified
    let otp = generateOTP(6);
    const filter: object = { email: req.body.email };
    const update: object = {
      verificationToken: otp,
      verificationTokenDateTime: new Date(),
    };
    const user = await User.findOneAndUpdate(filter, update, { new: true });
    res.status(200).json(user);
    //Send Email
  } catch (error) {
    const errorMessage: object = {
      error: error,
      location: "Request New Verification Token Route",
      time: new Date(),
    };
    console.error(errorMessage);
    res.status(500).json(error);
  }
};

export default RequestNewVerificationOTP;
