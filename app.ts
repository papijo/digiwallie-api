import express, { Express } from "express";
import config from "./src/utils/config";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

//CommonJs Module Styled Imports
const basicAuth = require("express-basic-auth");

//Create Express Application
const app: Express = express();

//Third-party Middleware

app.use(express.json());
app.use(cors());
app.use(morgan("common"));
app.use(
  helmet({ contentSecurityPolicy: false, crossOriginResourcePolicy: false })
);

/* 
Express Basic Auth is used here to protect all incoming API requests
to the server
*/
const users: object = { pass: config.API_AUTH };
const unauthorizedResponse: object = { message: "Not Authorised" };
app.use(basicAuth({ users, unauthorizedResponse }));

export default app;
