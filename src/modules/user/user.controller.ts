import catchAsync from "../../shared/catchasync";
import { userService } from "./user.service";

const createStudent = catchAsync(async (req, res) => {
  const result = await userService.createStudent(req.body);
  res.status(200).json({
    success: true,
    message: "Student created successfully",
    data: result,
  });
});

export const userController = { createStudent };
