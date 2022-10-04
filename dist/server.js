"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const http_1 = __importDefault(require("http"));
const config_1 = __importDefault(require("./src/utils/configuration/config"));
const server = http_1.default.createServer(app_1.default);
if (config_1.default.NODE_ENV === "production") {
    console.log = function () { };
    console.error = function () { };
}
server.listen(config_1.default.PORT, () => {
    const date = new Date();
    const serverConnectionObject = {
        type: "Server API Initialization",
        message: `Backend Server running on port ${config_1.default.PORT}`,
        date: date,
    };
    console.log(serverConnectionObject);
});
//# sourceMappingURL=server.js.map