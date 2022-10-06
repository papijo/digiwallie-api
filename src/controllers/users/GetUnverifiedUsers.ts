import User from "../../models/User";
import { Request, Response } from "express";

//Get Unverified Users Controller
const GetUnVerifiedUsersControllers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({ isVerified: false });
    res.status(200).json(users);
  } catch (error) {
    const errorMessage: object = {
      error: error,
      location: "Get all Unverified Users Route",
      time: new Date(),
    };
    console.error(errorMessage);
    res.status(500).json(error);
  }
};

export default GetUnVerifiedUsersControllers;
