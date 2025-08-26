"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const customers_controller_1 = require("./customers.controller");
const validatedRequest_1 = __importDefault(require("../../middleware/validatedRequest"));
const customers_validation_1 = require("./customers.validation");
const router = express_1.default.Router();
router.get("/", customers_controller_1.customerController.getAllCustomerFromDb);
router.get("/:idx", customers_controller_1.customerController.getSingleCustomerFromDb);
router.put("/:idx", (0, validatedRequest_1.default)(customers_validation_1.customerValidation.updateCustomerSchema), customers_controller_1.customerController.updateCustomerFromDb);
router.delete("/:idx", customers_controller_1.customerController.deleteCustomerFromDb);
router.post("/", (0, validatedRequest_1.default)(customers_validation_1.customerValidation.createCustomerSchema), customers_controller_1.customerController.createCustomerOnDB);
exports.customerRoutes = router;
