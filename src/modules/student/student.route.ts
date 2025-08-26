import express, { Application, NextFunction, Request, Response } from "express";
import { studentController } from "./student.controller";

const router = express.Router();

router.get("/", studentController.getAllStudent);
router.get("/:id", studentController.getStudentById);

export const studentRoutes = router;
