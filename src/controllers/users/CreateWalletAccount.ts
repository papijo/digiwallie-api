import User from "../../models/User";
import { Request, Response } from "express";
import Account from "../../models/Account";
// import { v4 as uuidv4 } from "uuid";

//Create Wallet Account
let newAccountNumber: string;

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

    if (accountCount == 3) {
      return res.status(403).json({
        message:
          "You cannot open another account as you have more than 3 Accounts",
      });
    }

    //Generate New Account Numbers
    const generateRandomAccountNumber = (length: number): string => {
      const chars = "1234567890";

      if (!length) {
        length = Math.floor(Math.random() * chars.length);
      }

      let str = "";
      for (let i = 0; i < length; i += 1) {
        str += chars[Math.floor(Math.random() * chars.length)];
      }
      return str;
    };

    //Recursive Account Generatiing Function
    const setAccountNumber = async (accountNumber: string) => {
      const account = await Account.findOne({ accountNumber });

      if (!account) {
        newAccountNumber = accountNumber;
        return newAccountNumber;
      } else {
        const accountNumber = generateRandomAccountNumber(10);
        setAccountNumber(accountNumber);
      }
    };

    //Calling Recursive Account Number Generating Function
    const accountNumber = generateRandomAccountNumber(10);
    setAccountNumber(accountNumber);
    console.log(accountNumber);

    const newAccount = new Account({
      accountNumber: accountNumber,
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
