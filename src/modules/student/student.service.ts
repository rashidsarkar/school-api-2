import { Prisma } from "@prisma/client";
import prisma from "../../shared/prisma";
import { equal } from "assert";
import { searchAbleField } from "./student.constant";

const getAllStudent = async (params: any, options: any) => {
  const { page, limit, sortOrder } = options;
  const { searchTerm, ...filterData } = params;
  const pageNum = Number(page) > 0 ? Number(page) : 1;
  const limitNum = Number(limit) > 0 ? Number(limit) : 10;
  const andConditions: Prisma.StudentWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: searchAbleField.map((field) => ({
        user: {
          [field]: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      })),
    });
  }
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        user: {
          [key]: {
            equals: filterData[key],
          },
        },
      })),
    });
  }
  const whereCondition: Prisma.StudentWhereInput = { AND: andConditions };
  const result = await prisma.student.findMany({
    where: whereCondition,
    skip: (pageNum - 1) * limitNum,
    take: limitNum,
    orderBy: {
      created_at: sortOrder || "desc",
    },

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

const getStudentById = async (id: string) => {
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
