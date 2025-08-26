"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const zod_1 = require("zod");
const globalErrorHandler = (err, req, res, next) => {
    // console.log(err);
    let statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
    let message = "Internal Server Error";
    let errorDetails = null;
    const stack = err.stack;
    // ✅ Prisma Error
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
            case "P2002":
                console.log(err);
                statusCode = http_status_1.default.CONFLICT;
                message = "Duplicate field value error";
                break;
            case "P2025":
                statusCode = http_status_1.default.NOT_FOUND;
                message = "Resource not found";
                break;
            case "P2003":
                statusCode = http_status_1.default.BAD_REQUEST;
                message = "Foreign key constraint failed: related record not found";
                break;
            default:
                statusCode = http_status_1.default.BAD_REQUEST;
                message = `Prisma error: ${err.code}`;
        }
    }
    // ✅ Zod Validation Error
    else if (err instanceof zod_1.ZodError) {
        statusCode = http_status_1.default.BAD_REQUEST;
        message = "Validation error";
        errorDetails = err.errors.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
        }));
    }
    // ✅ Custom Error (with statusCode and message)
    else if (err.statusCode && err.message) {
        statusCode = err.statusCode;
        message = err.message;
        errorDetails = err.error || null;
    }
    // ✅ Final Response
    res.status(statusCode).json(Object.assign(Object.assign({ success: false, status: statusCode, message }, (errorDetails && { error: errorDetails })), { stack }));
};
exports.default = globalErrorHandler;
