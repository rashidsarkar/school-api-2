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
exports.classService = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const AppError_1 = require("../../utils/AppError");
const createClass = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.class.create({
        data,
    });
    return result;
});
const enrollStudentClass = (classId, studentId) => __awaiter(void 0, void 0, void 0, function* () {
    if (classId) {
        const classExists = yield prisma_1.default.class.findUnique({
            where: { id: classId },
        });
        if (!classExists) {
            throw new AppError_1.AppError("Class not found", 404);
        }
    }
    if (studentId) {
        const studentExists = yield prisma_1.default.student.findUnique({
            where: { id: studentId },
        });
        if (!studentExists) {
            throw new AppError_1.AppError("Student not found", 404);
        }
    }
    const result = yield prisma_1.default.student.update({
        where: { id: studentId },
        data: {
            class_id: classId,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                },
            },
            class: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
    return result;
});
const getAllStudentOfClass = (classId) => __awaiter(void 0, void 0, void 0, function* () {
    if (classId) {
        const classExists = yield prisma_1.default.class.findUnique({
            where: { id: classId },
        });
        if (!classExists) {
            throw new AppError_1.AppError("Class not found", 404);
        }
    }
    const result = yield prisma_1.default.student.findMany({
        where: { class_id: classId },
    });
    return result;
});
exports.classService = {
    createClass,
    enrollStudentClass,
    getAllStudentOfClass,
};
