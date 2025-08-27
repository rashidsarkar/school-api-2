"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/user/user.route");
const student_route_1 = require("../modules/student/student.route");
const class_route_1 = require("../modules/classes/class.route");
const auth_routes_1 = require("../modules/auth/auth.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/user",
        route: user_route_1.userRoutes,
    },
    {
        path: "/students",
        route: student_route_1.studentRoutes,
    },
    {
        path: "/classes",
        route: class_route_1.classesRoutes,
    },
    {
        path: "/auth",
        route: auth_routes_1.authRouters,
    },
];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
