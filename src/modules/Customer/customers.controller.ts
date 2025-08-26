import status from "http-status";
import catchAsync from "../../shared/catchasync";
import { sendResponse } from "../../utils/sendResponse";
import { customerService } from "./customers.service";

const getAllCustomerFromDb = catchAsync(async (req, res) => {
  const result = await customerService.getAllCustomer();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Customers fetched successfully",
    data: result,
  });
});
const getSingleCustomerFromDb = catchAsync(async (req, res) => {
  const { idx } = req.params;
  const result = await customerService.getSingleCustomer(idx);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Customers fetched successfully",
    data: result,
  });
});
const updateCustomerFromDb = catchAsync(async (req, res) => {
  const { idx } = req.params;

  const result = await customerService.updateCustomer(idx, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Customer updated successfully",
    data: result,
  });
});
const deleteCustomerFromDb = catchAsync(async (req, res) => {
  const { idx } = req.params;

  const result = await customerService.deleteCustomer(idx);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Customer deleted successfully",
    data: null,
  });
});

const createCustomerOnDB = catchAsync(async (req, res) => {
  const result = await customerService.createCustomer(req.body);
  const { updatedAt, ...allDataWithoutUpdatedAt } = result;
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Customer created successfully",
    data: allDataWithoutUpdatedAt,
  });
});

export const customerController = {
  getAllCustomerFromDb,
  createCustomerOnDB,
  getSingleCustomerFromDb,
  updateCustomerFromDb,
  deleteCustomerFromDb,
};
