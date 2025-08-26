import { Customer } from "../../generated/prisma";
import prisma from "../../shared/prisma";

const getAllCustomer = async () => {
  const res = await prisma.customer.findMany({
    select: {
      customerId: true,
      name: true,
      email: true,
      phone: true,
      createdAt: true,
    },
  });
  return res;
};
const getSingleCustomer = async (customId: string) => {
  const res = await prisma.customer.findUniqueOrThrow({
    where: {
      customerId: customId,
    },
    select: {
      customerId: true,
      name: true,
      email: true,
      phone: true,
      createdAt: true,
    },
  });
  return res;
};

const updateCustomer = async (customId: string, payload: Partial<Customer>) => {
  const res = await prisma.customer.update({
    where: { customerId: customId },
    data: payload,
    select: {
      customerId: true,
      name: true,
      email: true,
      phone: true,
      createdAt: true,
    },
  });
  return res;
};
const deleteCustomer = async (customId: string) => {
  const res = await prisma.customer.delete({ where: { customerId: customId } });
  return res;
};

const createCustomer = async (customerData: Customer) => {
  const result = await prisma.customer.create({
    data: customerData,
  });
  return result;
};
export const customerService = {
  getAllCustomer,
  createCustomer,
  getSingleCustomer,
  updateCustomer,
  deleteCustomer,
};
