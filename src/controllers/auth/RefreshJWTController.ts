import jwt from "jsonwebtoken";
import config from "../../utils/configuration/config";
import { Request, Response } from "express";

//Helper Functions
import {
  generateAccessToken,
  generateRefreshAccessToken,
} from "../../utils/helper/generateJWT";

//Refresh JWT Controller
const RefreshJWTController = async (req: Request, res: Response) => {
  try {
    //Take refresh token from Request Headers
    const refreshAccessToken = req.headers.refreshtoken;

    //Send Error if no Token or Invalid Token from Request Headers
    if (!refreshAccessToken) {
      return res.status(401).json({ message: "You are not authenticated!!!!" });
    }

    jwt.verify(
      refreshAccessToken as string, //type assertion
      config.JWT_RFR_SECRET_KEY,
      (error, user) => {
        error && console.log(error);
        const newAccessToken = generateAccessToken(user);
        const newRefreshAccessToken = generateRefreshAccessToken(user);

        // refreshTokens.push(newRefreshAccessToken);

        res.status(200).json({
          accessToken: newAccessToken,
          refreshAccessToken: newRefreshAccessToken,
        });
      }
    );
  } catch (error) {
    const errorMessage: object = {
      error: error,
      location: "Refresh Token Route",
      time: new Date(),
    };
    console.error(errorMessage);
    res.status(500).json(error);
  }
};

export default RefreshJWTController;
