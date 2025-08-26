import status from "http-status";
import catchAsync from "../../shared/catchasync";
import { sendResponse } from "../../utils/sendResponse";
import { classService } from "./class.service";

const createClass = catchAsync(async (req, res) => {
  const result = await classService.createClass(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Class created successfully",
    data: result,
  });
});
const enrollStudentClass = catchAsync(async (req, res) => {
  const { id: classID } = req.params;
  const { studentId } = req.query;

  const result = await classService.enrollStudentClass(
    classID,
    studentId as string
  );
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Student enrolled successfully",
    data: result,
  });
});

const getAllStudentOfClass = catchAsync(async (req, res) => {
  const { id: classId } = req.params;
  const result = await classService.getAllStudentOfClass(classId);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Students retrieved successfully from class",
    data: result,
  });
});

export const classController = {
  createClass,
  enrollStudentClass,
  getAllStudentOfClass,
};
