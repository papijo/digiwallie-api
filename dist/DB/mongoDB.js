"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../src/utils/configuration/config"));
const db = mongoose_1.default
    .connect(config_1.default.MONGODB_URI)
    .then(() => {
    const date = new Date();
    const dbConnectionSuccessObject = {
        type: "Database Initialization",
        message: "Risigner's Fashion Seekers Database Connection Successfull!!!!",
        date: date,
    };
    console.log(dbConnectionSuccessObject);
})
    .catch((error) => {
    const date = new Date();
    const dbConnectionErrorObject = {
        type: "Error connecting to Risigner's Fashion Seekers Database.",
        error: error,
        date: date,
    };
    console.error(dbConnectionErrorObject);
});
exports.default = db;
//# sourceMappingURL=mongoDB.js.map