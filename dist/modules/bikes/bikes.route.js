"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bikesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const bike_controller_1 = require("./bike.controller");
const validatedRequest_1 = __importDefault(require("../../middleware/validatedRequest"));
const bike_validation_1 = require("./bike.validation");
const router = express_1.default.Router();
router.get("/", bike_controller_1.bikeController.getAllBikeFromDB);
router.get("/:idx", bike_controller_1.bikeController.getSingleBikeFromDB);
router.post("/", (0, validatedRequest_1.default)(bike_validation_1.bikeValidation.createBikeSchema), bike_controller_1.bikeController.createBikeOnDB);
exports.bikesRoutes = router;
