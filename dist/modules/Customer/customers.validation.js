"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerValidation = void 0;
const zod_1 = require("zod");
const createCustomerSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
        }),
        email: zod_1.z
            .string({
            required_error: "Email is required",
        })
            .email("Invalid email address"),
        phone: zod_1.z.string({
            required_error: "Phone number is required",
        }),
    }),
});
const updateCustomerSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().email("Invalid email address").optional(),
        phone: zod_1.z.string().optional(),
    }),
});
exports.customerValidation = {
    createCustomerSchema,
    updateCustomerSchema,
};
