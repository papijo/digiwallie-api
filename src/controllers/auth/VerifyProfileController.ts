import User from "../../models/User";
// import config from "../../utils/configuration/config";
import { Request, Response } from "express";
import moment from "moment";

//Verify Profile Controller
const VerifyProfileController = async (req: Request, res: Response) => {
  try {
    //Check for User
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    //If User is already verified
    if (user.isVerified === true) {
      res.status(403).json({
        message:
          "Your Account has already been verified, please Login to use the DigiWallie App.",
      });
    }
    //Check for verification Token
    if (
      user.verificationToken !== req.body.verificationToken ||
      !req.body.verificationToken
    ) {
      res.status(403).json({ message: "Wrong Verification Token" });
    }

    let now = moment(new Date()); //todays date
    let end = moment(new Date(user.verificationTokenDateTime)); // another date
    let duration = moment.duration(now.diff(end));
    let hours = duration.asHours();

    const otpTimeIsExpired = hours > 24; //
    if (otpTimeIsExpired) {
      res.status(403).json("Verification Token no Longer Valid");
    }

    if (user.verificationToken === req.body.verificationToken) {
      const changeVerified = async () => {
        user.isVerified = true;
        user.verificationToken = "";
        user.save();
      };
      changeVerified();
    }
    res.status(200).json(user);
    //Send Email
  } catch (error) {
    const errorMessage: object = {
      error: error,
      location: "Verify Profile Route",
      time: new Date(),
    };
    console.error(errorMessage);
    res.status(500).json(error);
  }
};

export default VerifyProfileController;
