import express, { Application, NextFunction, Request, Response } from "express";
import { authController } from "./auth.controller";
import validateRequest from "../../middleware/validatedRequest";
import { authValidation } from "./auth.validation";

const router = express.Router();

router.post(
  "/login",
  validateRequest(authValidation.loginValidationSchema),
  authController.loginUser
);
router.post(
  "/refresh-token",
  validateRequest(authValidation.loginValidationSchema),
  authController.refreshToken
);
export const authRouters = router;
