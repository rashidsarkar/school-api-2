import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { verifyToken } from "../utils/generateToken";
import config from "../config";

export const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return next(new AppError("Unauthorized", 401));
      }
      const verifiedUser = verifyToken(
        token as string,
        config.accessTokenSecret as string
      );

      if (roles.length && !roles.includes(verifiedUser.role)) {
        return next(new AppError("Forbidden", 403));
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
