import express, { Application, NextFunction, Request, Response } from "express";
import { classController } from "./class.controller";
import validateRequest from "../../middleware/validatedRequest";
import { classValidation } from "./class.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(classValidation.createClassSchema),
  classController.createClass
);
router.post("/:id/enroll", classController.enrollStudentClass);
router.get("/:id/students", classController.getAllStudentOfClass);

export const classesRoutes = router;
