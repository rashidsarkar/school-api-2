"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const service_validation_1 = require("./service.validation");
const service_controller_1 = require("./service.controller");
const validatedRequest_1 = __importDefault(require("../../middleware/validatedRequest"));
const router = express_1.default.Router();
router.get("/status", service_controller_1.serviceController.serviceStatusData);
router.get("/", service_controller_1.serviceController.getAllServiceFromDB);
router.get("/:idx", service_controller_1.serviceController.getSingleServiceFromDB);
router.put("/:idx/complete", service_controller_1.serviceController.updateServiceStatusFromDB);
router.post("/", (0, validatedRequest_1.default)(service_validation_1.serviceValidation.createServiceRecordSchema), service_controller_1.serviceController.createServiceOnDB);
exports.serviceRoutes = router;
