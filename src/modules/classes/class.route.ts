import express, { Application, NextFunction, Request, Response } from "express";
import { classController } from "./class.controller";
import validateRequest from "../../middleware/validatedRequest";
import { classValidation } from "./class.validation";
import { auth } from "../../middleware/auth";
import { Role } from "@prisma/client";

const router = express.Router();

router.post(
  "/",
  auth(Role.ADMIN),
  validateRequest(classValidation.createClassSchema),
  classController.createClass
);
router.post(
  "/:id/enroll",
  auth(Role.ADMIN, Role.TEACHER),
  classController.enrollStudentClass
);
router.get("/:id/students", classController.getAllStudentOfClass);

export const classesRoutes = router;
