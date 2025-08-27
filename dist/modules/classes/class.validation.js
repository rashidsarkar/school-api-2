"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classValidation = void 0;
const zod_1 = require("zod");
const createClassSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Class name is required",
        }),
        section: zod_1.z.string({
            required_error: "Section is required",
        }),
    }),
});
const updateClassSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        section: zod_1.z.string().optional(),
    }),
});
exports.classValidation = {
    createClassSchema,
    updateClassSchema,
};
