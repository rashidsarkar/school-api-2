import { Prisma } from "@prisma/client";
import prisma from "../../shared/prisma";

const getAllStudent = async (params: any) => {
  const { searchTerm } = params;
  const andConditions: Prisma.StudentWhereInput[] = [];

  // [
  //         {
  //           user: {
  //             name: {
  //               contains: searchTerm,
  //               mode: "insensitive",
  //             },
  //           },
  //         },
  //         {
  //           user: {
  //             email: {
  //               contains: searchTerm,
  //               mode: "insensitive",
  //             },
  //           },
  //         },
  //       ],

  if (searchTerm) {
    andConditions.push({
      OR: ["name", "email"].map((field) => ({
        user: {
          [field]: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      })),
    });
  }
  const whereCondition: Prisma.StudentWhereInput = { AND: andConditions };
  const result = await prisma.student.findMany({
    where: whereCondition,
    include: {
      user: {
        select: {
          name: true,
          email: true,
          role: true,
          isDeleted: true,
        },
      },
      class: true,
    },
  });

  return result;
};

const getStudentById = async (id) => {
  const result = await prisma.student.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          role: true,
          isDeleted: true,
        },
      },
      class: true,
    },
  });

  return result;
};

export const studentService = { getAllStudent, getStudentById };
