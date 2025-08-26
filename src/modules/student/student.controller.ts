import status from "http-status";
import catchAsync from "../../shared/catchasync";
import { studentService } from "./student.service";
import { sendResponse } from "../../utils/sendResponse";

const getAllStudent = catchAsync(async (req, res) => {
  const result = await studentService.getAllStudent();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Students fetched successfully",
    data: result,
  });
});

const getStudentById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await studentService.getStudentById(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Student fetched by id successfully",
    data: result,
  });
});

export const studentController = { getAllStudent, getStudentById };
