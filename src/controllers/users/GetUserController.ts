import User from "../../models/User";
import { Request, Response } from "express";

//Get User Controller
const GetUserController = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);

    //Check to see if user exists
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found or does not exist in our records" });
    }

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    const errorMessage: object = {
      error: error,
      location: "Get Specific User Route",
      time: new Date(),
    };
    console.error(errorMessage);
    res.status(500).json(error);
  }
};

export default GetUserController;
