"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("./student.controller");
const auth_1 = require("../../middleware/auth");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get("/", (0, auth_1.auth)(client_1.Role.ADMIN, client_1.Role.TEACHER), student_controller_1.studentController.getAllStudent);
router.get("/:id", student_controller_1.studentController.getStudentById);
exports.studentRoutes = router;
