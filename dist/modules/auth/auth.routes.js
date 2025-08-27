"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouters = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const validatedRequest_1 = __importDefault(require("../../middleware/validatedRequest"));
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
router.post("/login", (0, validatedRequest_1.default)(auth_validation_1.authValidation.loginValidationSchema), auth_controller_1.authController.loginUser);
router.post("/refresh-token", (0, validatedRequest_1.default)(auth_validation_1.authValidation.loginValidationSchema), auth_controller_1.authController.refreshToken);
exports.authRouters = router;
