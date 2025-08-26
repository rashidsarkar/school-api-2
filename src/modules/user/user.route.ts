import express, { Application, NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middleware/validatedRequest";
import { userValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(userValidation.createUserSchema),
  userController.createStudent
);

export const userRoutes = router;
