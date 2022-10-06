import User from "../../models/User";
import { Request, Response } from "express";

//Get all Users Controllers
const GetAllUsersControllers = async (req: Request, res: Response) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();

    res.status(200).json(users);
  } catch (error) {
    const errorMessage: object = {
      error: error,
      location: "Get all Users Route",
      time: new Date(),
    };
    console.error(errorMessage);
    res.status(500).json(error);
  }
};

export default GetAllUsersControllers;
