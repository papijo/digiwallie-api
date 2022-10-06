import User from "../../models/User";
import { Request, Response } from "express";

const GetUserStatistics = async (req: Request, res: Response) => {
  try {
    const userStatsDate = await User.find({ loginCount: req.params.date }); //Date is in the form of
    const userCount = userStatsDate.length;
    res.status(200).json({ message: userCount });
  } catch (error) {
    const errorMessage: object = {
      error: error,
      location: "User Statistics Route",
      time: new Date(),
    };
    console.error(errorMessage);
    res.status(500).json(error);
  }
};

export default GetUserStatistics;
