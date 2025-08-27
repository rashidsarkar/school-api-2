"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validatedRequest_1 = __importDefault(require("../../middleware/validatedRequest"));
const user_validation_1 = require("./user.validation");
const client_1 = require("@prisma/client");
const auth_1 = require("../../middleware/auth");
const router = express_1.default.Router();
router.post("/", (0, validatedRequest_1.default)(user_validation_1.userValidation.createUserSchema), user_controller_1.userController.createUser);
router.post("/create-student", (0, auth_1.auth)(client_1.Role.ADMIN), (0, validatedRequest_1.default)(user_validation_1.userValidation.createUserSchema), user_controller_1.userController.createStudent);
exports.userRoutes = router;
