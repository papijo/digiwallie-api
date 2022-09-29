import dotenv from "dotenv";
dotenv.config();

const PORT: string = process.env.PORT;
const MONGODB_URI: string = process.env.MONGODB_URI;
const PASS_SECRET_CRYPTOJS: string = process.env.PASS_SECRET_CRYPTOJS;
const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY;
const JWT_RFR_SECRET_KEY: string = process.env.JWT_RFR_SECRET_KEY;
const NODE_ENV = process.env.NODE_ENV;
const API_AUTH = process.env.API_AUTH;

export default {
  PORT,
  MONGODB_URI,
  PASS_SECRET_CRYPTOJS,
  JWT_SECRET_KEY,
  JWT_RFR_SECRET_KEY,
  NODE_ENV,
  API_AUTH,
};
