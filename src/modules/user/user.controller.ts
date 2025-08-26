import catchAsync from "../../shared/catchasync";
import { userService } from "./user.service";

const createUser = catchAsync(async (req, res) => {
  const result = await userService.createUser(req.body);
  res.status(200).json({
    success: true,
    message: "User created successfully",
    data: { ...result, password_hash: undefined },
  });
});

export const userController = { createUser };
