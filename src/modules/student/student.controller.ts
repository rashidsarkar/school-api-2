import status from "http-status";
import catchAsync from "../../shared/catchasync";
import { studentService } from "./student.service";
import { sendResponse } from "../../utils/sendResponse";
import { pick } from "../../shared/pick";
import { studentFilterableFields } from "./student.constant";

const getAllStudent = catchAsync(async (req, res) => {
  const filter = pick(req.query, studentFilterableFields);
  const options = pick(req.query, ["page", "limit", "sortOrder"]);

  console.log(options, "sa");
  const result = await studentService.getAllStudent(filter, options);
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
