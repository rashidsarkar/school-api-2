"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customer_route_1 = require("../modules/Customer/customer.route");
const bikes_route_1 = require("../modules/bikes/bikes.route");
const service_route_1 = require("../modules/service/service.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/customers",
        route: customer_route_1.customerRoutes,
    },
    {
        path: "/bikes",
        route: bikes_route_1.bikesRoutes,
    },
    {
        path: "/services",
        route: service_route_1.serviceRoutes,
    },
];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
