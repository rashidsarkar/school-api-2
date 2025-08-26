import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import status from "http-status";
import { ZodError } from "zod";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(err);
  let statusCode: number = status.INTERNAL_SERVER_ERROR;
  let message = "Internal Server Error";
  let errorDetails: any = null;
  const stack = err.stack;

  // ✅ Prisma Error
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        console.log(err);
        statusCode = status.CONFLICT;
        message = "Duplicate field value error";
        break;
      case "P2025":
        statusCode = status.NOT_FOUND;
        message = "Resource not found";
        break;
      case "P2003":
        statusCode = status.BAD_REQUEST;
        message = "Foreign key constraint failed: related record not found";
        break;
      default:
        statusCode = status.BAD_REQUEST;
        message = `Prisma error: ${err.code}`;
    }
  }

  // ✅ Zod Validation Error
  else if (err instanceof ZodError) {
    statusCode = status.BAD_REQUEST;
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
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    ...(errorDetails && { error: errorDetails }),
    stack,
  });
};

export default globalErrorHandler;
