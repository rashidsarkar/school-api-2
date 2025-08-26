"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bikeValidation = void 0;
const zod_1 = require("zod");
const createBikeSchema = zod_1.z.object({
    body: zod_1.z.object({
        brand: zod_1.z.string({
            required_error: "Brand is required",
        }),
        model: zod_1.z.string({
            required_error: "Model is required",
        }),
        year: zod_1.z
            .number({
            required_error: "Year is required",
        })
            .int("Year must be an integer")
            .max(new Date().getFullYear(), "Year can't be in the future"),
        customerId: zod_1.z.string({
            required_error: "Customer ID is required",
        }),
    }),
});
const updateBikeSchema = zod_1.z.object({
    body: zod_1.z.object({
        brand: zod_1.z.string().optional(),
        model: zod_1.z.string().optional(),
        year: zod_1.z
            .number()
            .int("Year must be an integer")
            .max(new Date().getFullYear(), "Year can't be in the future")
            .optional(),
        customerId: zod_1.z.string().optional(),
    }),
});
exports.bikeValidation = {
    createBikeSchema,
    updateBikeSchema,
};
