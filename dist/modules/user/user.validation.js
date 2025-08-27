"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const createUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
        }),
        email: zod_1.z
            .string({
            required_error: "Email is required",
        })
            .email("Invalid email address"),
        password_hash: zod_1.z.string({
            required_error: "Password is required",
        }),
        role: zod_1.z.enum(["ADMIN", "TEACHER", "STUDENT"], {
            required_error: "Role is required",
        }),
    }),
});
const updateUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().email("Invalid email address").optional(),
        password_hash: zod_1.z.string().optional(),
        role: zod_1.z.enum(["ADMIN", "TEACHER", "STUDENT"]).optional(),
    }),
});
exports.userValidation = {
    createUserSchema,
    updateUserSchema,
};
