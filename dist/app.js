"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./src/utils/configuration/config"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const basicAuth = require("express-basic-auth");
const app = (0, express_1.default)();
require("./db/mongoDB");
const AuthRoute_1 = __importDefault(require("./src/routes/AuthRoute"));
const UserRoute_1 = __importDefault(require("./src/routes/UserRoute"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("common"));
app.use((0, helmet_1.default)({ contentSecurityPolicy: false, crossOriginResourcePolicy: false }));
const users = { pass: config_1.default.API_AUTH };
const unauthorizedResponse = { message: "Not Authorised" };
app.use(basicAuth({ users, unauthorizedResponse }));
app.use("/digiwallie/api/v1/auth", AuthRoute_1.default);
app.use("/digiwallie/api/v1/users", UserRoute_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map