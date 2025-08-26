import express, { NextFunction, Request, Response } from "express";
import { customerController } from "./customers.controller";
import validateRequest from "../../middleware/validatedRequest";
import { customerValidation } from "./customers.validation";

const router = express.Router();

router.get("/", customerController.getAllCustomerFromDb);
router.get("/:idx", customerController.getSingleCustomerFromDb);
router.put(
  "/:idx",
  validateRequest(customerValidation.updateCustomerSchema),
  customerController.updateCustomerFromDb
);
router.delete("/:idx", customerController.deleteCustomerFromDb);
router.post(
  "/",
  validateRequest(customerValidation.createCustomerSchema),
  customerController.createCustomerOnDB
);
export const customerRoutes = router;
