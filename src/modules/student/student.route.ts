import express, { Application, NextFunction, Request, Response } from "express";
import { studentController } from "./student.controller";
import { auth } from "../../middleware/auth";
import { Role } from "@prisma/client";

const router = express.Router();

router.get(
  "/",
  auth(Role.ADMIN, Role.TEACHER),
  studentController.getAllStudent
);
router.get("/:id", studentController.getStudentById);

export const studentRoutes = router;
