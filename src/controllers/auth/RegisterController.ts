import User from "../../models/User";

import { Request, Response } from "express";

//Helper Functions
import generateOTP from "./../../utils/helper/generateOTP";

//CommonJs Imports
const Crypto = require("crypto");

//Configuration
import config from "../../utils/configuration/config";

//Register Controller
const RegisterController = async (req: Request, res: Response) => {
  try {
    const userEmailExist = await User.findOne({ email: req.body.email });

    if (userEmailExist) {
      console.log("User Already Exists");
      return res
        .status(400)
        .json({ error: true, message: "User Already Exists" });
    }

    let otp: string = generateOTP(6);

    const newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: Crypto.AES.encrypt(
        req.body.password,
        config.PASS_SECRET_CRYPTOJS
      ).toString(),
      isUser: true,
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

export default RegisterController;
