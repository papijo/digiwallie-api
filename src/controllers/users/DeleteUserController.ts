import User from "../../models/User";
import { Request, Response } from "express";

const DeleteUserController = async (req: Request, res: Response) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been Deleted!!!");
  } catch (error) {
    const errorMessage: object = {
      error: error,
      location: "Delete User Route",
      time: new Date(),
    };
    console.error(errorMessage);
    res.status(500).json(error);
  }
};

export default DeleteUserController;
