import express, { Application, NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
const router = express.Router();

router.post("/", userController.createStudent);

export const userRoutes = router;
