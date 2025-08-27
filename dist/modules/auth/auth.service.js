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
exports.authService = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const AppError_1 = require("../../utils/AppError");
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken_1 = require("../../utils/generateToken");
const config_1 = __importDefault(require("../../config"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUnique({
        where: {
            email: payload.email,
        },
    });
    if (!userData) {
        throw new AppError_1.AppError("User not found", 404);
    }
    const isCorrectPassword = yield bcrypt_1.default.compare(payload.password, userData.password_hash);
    console.log(isCorrectPassword);
    if (!isCorrectPassword) {
        throw new AppError_1.AppError("Invalid password", 401);
    }
    const accessToken = (0, generateToken_1.generateToken)({
        email: userData.email,
        role: userData.role,
    }, config_1.default.accessTokenSecret, "15m");
    const refreshToken = (0, generateToken_1.generateToken)({
        email: userData.email,
        role: userData.role,
    }, config_1.default.refreshTokenSecret, "7d");
    return { accessToken, refreshToken };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let decodedData;
    try {
        decodedData = (0, generateToken_1.verifyToken)(token, config_1.default.refreshTokenSecret);
    }
    catch (error) {
        throw new AppError_1.AppError("You are not authorized", 401);
    }
    const userData = yield prisma_1.default.user.findUnique({
        where: {
            email: decodedData.email,
        },
    });
    if (!userData) {
        throw new AppError_1.AppError("User not found", 404);
    }
    const accessToken = (0, generateToken_1.generateToken)({
        email: userData.email,
        role: userData.role,
    }, process.env.ACCESS_TOKEN_SECRET, "50m");
    return { accessToken };
});
exports.authService = { loginUser, refreshToken };
