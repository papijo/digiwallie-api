"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../models/User"));
const GetAllUsersControllers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.new;
    try {
        const users = query
            ? yield User_1.default.find().sort({ _id: -1 }).limit(5)
            : yield User_1.default.find();
        res.status(200).json(users);
    }
    catch (error) {
        const errorMessage = {
            error: error,
            location: "Get all Users Route",
            time: new Date(),
        };
        console.error(errorMessage);
        res.status(500).json(error);
    }
});
exports.default = GetAllUsersControllers;
//# sourceMappingURL=GetAllUsersController.js.map