import prisma from "../../shared/prisma";

const getAll = async () => {
  const res = await prisma.customer;
};
