import express from "express";
import { userRoutes } from "../modules/user/user.route";
import { studentRoutes } from "../modules/student/student.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/students",
    route: studentRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
