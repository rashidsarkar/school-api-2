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
exports.userService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const bcrypt_1 = __importDefault(require("bcrypt"));
const AppError_1 = require("../../utils/AppError");
const createAdminAndTeacher = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(data.password_hash, 10);
    const userData = {
        name: data.name,
        email: data.email,
        password_hash: hashedPassword,
        role: data.role,
    };
    const result = yield prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield transactionClient.user.create({
            data: userData,
        });
        switch (data.role) {
            case client_1.Role.ADMIN:
                yield transactionClient.admin.create({ data: { userId: user.id } });
                break;
            case client_1.Role.TEACHER:
                yield transactionClient.teacher.create({ data: { userId: user.id } });
                break;
            default:
                throw new AppError_1.AppError("Invalid role", 400);
        }
        //   const createStudent = await transactionClient.student.create({
        //     data: {
        //       age: data.age,
        //       class_id: data.class_id,
        //       userId: user.id,
        //     },
        //   });
        //   return createStudent;
        // });
        return transactionClient.user.findUnique({
            where: { id: user.id },
            include: {
                Admin: true,
                Teacher: true,
            },
        });
    }));
    return result;
});
const createStudent = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(data.password_hash, 10);
    const studentData = {
        name: data.name,
        email: data.email,
        password_hash: hashedPassword,
        role: client_1.Role.STUDENT,
    };
    const result = yield prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield transactionClient.user.create({
            data: studentData,
        });
        const createStudent = yield transactionClient.student.create({
            data: {
                age: data.age,
                class_id: data.class_id,
                userId: user.id,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        isDeleted: true,
                    },
                },
            },
        });
        return createStudent;
    }));
    return result;
});
exports.userService = { createAdminAndTeacher, createStudent };
