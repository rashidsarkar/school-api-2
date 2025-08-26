import status from "http-status";
import catchAsync from "../../shared/catchasync";
import { sendResponse } from "../../utils/sendResponse";
import { userService } from "./user.service";

const createUser = catchAsync(async (req, res) => {
  const result = await userService.createUser(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "User created successfully",
    data: { ...result, password_hash: undefined },
  });
});
const createStudent = catchAsync(async (req, res) => {
  const result = await userService.createStudent(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Student created successfully",
    data: { ...result, password_hash: undefined },
  });
});

export const userController = { createUser, createStudent };
