import express, { Application, NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middleware/validatedRequest";
import { userValidation } from "./user.validation";
import { Role } from "@prisma/client";
import { verifyToken } from "../../utils/generateToken";
import config from "../../config";
import { AppError } from "../../utils/AppError";
import { auth } from "../../middleware/auth";

const router = express.Router();

router.post(
  "/",
  validateRequest(userValidation.createUserSchema),
  userController.createUser
);
router.post(
  "/create-student",
  auth(Role.ADMIN),
  validateRequest(userValidation.createUserSchema),
  userController.createStudent
);

export const userRoutes = router;
