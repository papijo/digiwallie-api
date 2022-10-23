import mongoose from "mongoose";
import config from "../src/utils/configuration/config";

const db = mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    const date = new Date();
    const dbConnectionSuccessObject: object = {
      type: "Database Initialization",
      message: "Risigner's Fashion Seekers Database Connection Successfull!!!!",
      date: date,
    };
    console.log(dbConnectionSuccessObject);
  })
  .catch((error) => {
    const date = new Date();
    const dbConnectionErrorObject: object = {
      type: "Error connecting to Risigner's Fashion Seekers Database.",
      error: error,
      date: date,
    };
    console.error(dbConnectionErrorObject);
  });

export default db;
