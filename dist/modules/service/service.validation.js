"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceValidation = void 0;
const zod_1 = require("zod");
// Enum for status values
const StatusEnum = zod_1.z.enum(["pending", "in_progress", "done"]);
// Create Schema
const createServiceRecordSchema = zod_1.z.object({
    body: zod_1.z.object({
        bikeId: zod_1.z.string({
            required_error: "Bike ID is required",
        }),
        serviceDate: zod_1.z
            .string({
            required_error: "Service date is required",
        })
            .refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid service date format",
        }),
        completionDate: zod_1.z
            .string({
            required_error: "Completion date is required",
        })
            .refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid completion date format",
        })
            .optional(),
        description: zod_1.z.string({
            required_error: "Description is required",
        }),
        status: StatusEnum,
    }),
});
// Update Schema — all fields optional
const updateServiceRecordSchema = zod_1.z.object({
    body: zod_1.z.object({
        bikeId: zod_1.z.string().optional(),
        serviceDate: zod_1.z
            .string()
            .refine((val) => !val || !isNaN(Date.parse(val)), {
            message: "Invalid service date format",
        })
            .optional(),
        completionDate: zod_1.z
            .string()
            .refine((val) => !val || !isNaN(Date.parse(val)), {
            message: "Invalid completion date format",
        })
            .optional(),
        description: zod_1.z.string().optional(),
        status: StatusEnum.optional(),
    }),
});
const updateServiceStatusSchema = zod_1.z.object({
    body: zod_1.z.object({
        completionDate: zod_1.z
            .string()
            .optional()
            .refine((val) => !val || !isNaN(Date.parse(val)), {
            message: "Invalid completion date format",
        }),
    }),
});
exports.serviceValidation = {
    createServiceRecordSchema,
    updateServiceRecordSchema,
    updateServiceStatusSchema,
};
