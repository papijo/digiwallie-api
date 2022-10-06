import User from "../../models/User";
import { Request, Response } from "express";

//Get verifies users controllers
const GetVerifiedUsersControllers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({ isVerified: true });
    res.status(200).json(users);
  } catch (error) {
    const errorMessage: object = {
      error: error,
      location: "Get Verified Users Route",
      time: new Date(),
    };
    console.error(errorMessage);
    res.status(500).json(error);
  }
};

export default GetVerifiedUsersControllers;
