import User from "../../models/User";
import { Request, Response } from "express";
import Account from "../../models/Account";
// import generateAccount from "./../../utils/helper/generateAccountNumber";
import { v4 as uuidv4 } from "uuid";

//Create Wallet Account

const CreateWalletAccount = async (req: Request, res: Response) => {
  try {
    //Check for User
    const user = await User.findOne({ email: req.body.email });

    //Check if User Exists
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    //Checks if User is Verified
    if (user.isVerified !== true) {
      return res.status(403).json({
        message:
          "Your Account has not been verified, please get Verified to use the DigiWallie App.",
      });
    }

    //Check Account Counts
    const accountCount = user.accounts.length;

    if (accountCount > 3) {
      res.status(403).json({
        message:
          "You cannot open another account as you have more than 3 Accounts",
      });
    }

    //Generate Account Details
    let newAccountNumber: string = uuidv4();
    const newAccount = new Account({
      accountNumber: newAccountNumber,
      owner: user._id,
      balance: 0,
    });

    const savedAccount = await newAccount.save();
    await user.accounts.push(newAccountNumber);
    user.save();

    res.status(200).json({ message: "New Account Created", savedAccount });
  } catch (error) {
    const errorMessage: object = {
      error: error,
      location: "Create Wallet Account Route",
      time: new Date(),
    };
    console.error(errorMessage);
    res.status(500).json(error);
  }
};

export default CreateWalletAccount;
