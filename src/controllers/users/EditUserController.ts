import User from "../../models/User";
import { Request, Response } from "express";

const EditUserController = async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    const errorMessage: object = {
      error: error,
      location: "Edit User Route",
      time: new Date(),
    };
    console.error(errorMessage);
    res.status(500).json(error);
  }
};

export default EditUserController;
