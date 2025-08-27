"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.classesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const class_controller_1 = require("./class.controller");
const validatedRequest_1 = __importDefault(require("../../middleware/validatedRequest"));
const class_validation_1 = require("./class.validation");
const auth_1 = require("../../middleware/auth");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post("/", (0, auth_1.auth)(client_1.Role.ADMIN), (0, validatedRequest_1.default)(class_validation_1.classValidation.createClassSchema), class_controller_1.classController.createClass);
router.post("/:id/enroll", (0, auth_1.auth)(client_1.Role.ADMIN, client_1.Role.TEACHER), class_controller_1.classController.enrollStudentClass);
router.get("/:id/students", class_controller_1.classController.getAllStudentOfClass);
exports.classesRoutes = router;
