import User from "../../models/User";
import { Request, Response } from "express";
import * as Crypto from "crypto-js";

//Helper Functions
import generateOTP from "../../utils/helper/generateOTP";

//Configuration
import config from "../../utils/configuration/config";

//Register Controller
const AdminRegisterController = async (req: Request, res: Response) => {
  try {
    const userEmailExist = await User.findOne({ email: req.body.email });

    if (userEmailExist) {
      return res
        .status(400)
        .json({ error: true, message: "User Already Exists" });
    }

    if (!req.body.password) {
      return res
        .status(400)
        .json({ error: true, message: "Empty Password Field" });
    }

    let otp: string = generateOTP(6);

    const encryptedPassword: string = Crypto.AES.encrypt(
      req.body.password,
      config.PASS_SECRET_CRYPTOJS
    ).toString();

    const newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: encryptedPassword,
      isUser: true,
      isStaff: true,
      isAdmin: true,
      verificationToken: otp,
      verificationTokenDateTime: new Date(),
    });
    console.log(otp);

    const savedUser = await newUser.save();

    res.status(200).json(savedUser);
    //send email
    //Welcome Message

    //Verification Message
  } catch (error) {
    const errorMessage: object = {
      error: error,
      location: "Register Route",
      time: new Date(),
    };
    console.error(errorMessage);
    return res.status(500).json(error);
  }
};

export default AdminRegisterController;
