import jwt from "jsonwebtoken";
import config from "../configuration/config";

const generateAccessToken = (user: any) => {
  const signature: string = jwt.sign(
    {
      id: user._id,
      isUser: user.isUser,
      isStaff: user.isStaff,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
    },
    config.JWT_SECRET_KEY,
    { expiresIn: "24h" }
  );

  return signature;
};

const generateRefreshAccessToken = (user: any) => {
  const signature: string = jwt.sign(
    {
      id: user._id,
      isUser: user.isUser,
      isStaff: user.isStaff,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
    },
    config.JWT_RFR_SECRET_KEY,
    { expiresIn: "24h" }
  );

  return signature;
};

export { generateAccessToken, generateRefreshAccessToken };
