import express, { Application, NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middleware/validatedRequest";
import { userValidation } from "./user.validation";
import { Role } from "@prisma/client";

const router = express.Router();

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {};
};

router.post(
  "/",
  auth(Role.ADMIN, Role.STUDENT),
  validateRequest(userValidation.createUserSchema),
  userController.createUser
);
router.post(
  "/create-student",
  validateRequest(userValidation.createUserSchema),
  userController.createStudent
);

export const userRoutes = router;
